<#
.SYNOPSIS
  Build CC-Desk as a Windows NSIS installer (user-selectable install path).
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktopDir = (Resolve-Path (Join-Path $scriptDir '..\CC-Desk\desktop')).Path
$targetTriple = 'x86_64-pc-windows-msvc'
$releaseDir = Join-Path $desktopDir "src-tauri\target\$targetTriple\release"
$installerDir = Join-Path $scriptDir 'installer-output'
$appVersion = (Get-Content (Join-Path $desktopDir 'src-tauri\tauri.conf.json') -Raw | ConvertFrom-Json).version

function Write-Step { param([string]$Message) Write-Host "[installer-build] $Message" }

function Assert-Command { param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) { throw "Missing: $Name" }
}

function Import-VsDevEnvironment {
  $vswherePaths = @(
    'C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe',
    'C:\Program Files\Microsoft Visual Studio\2022\Professional\vswhere.exe',
    'C:\Program Files\Microsoft Visual Studio\2022\Community\vswhere.exe',
    'C:\Program Files\Microsoft Visual Studio\2022\BuildTools\vswhere.exe'
  )
  $vswhere = $null
  foreach ($p in $vswherePaths) { if (Test-Path $p) { $vswhere = $p; break } }
  if (-not $vswhere) { throw 'vswhere not found. Install VS 2022 Build Tools.' }
  $installationPath = & $vswhere -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath | Select-Object -First 1
  if (-not $installationPath) { throw 'Missing VC++ build tools.' }
  $vsDevCmd = Join-Path $installationPath 'Common7\Tools\VsDevCmd.bat'
  Write-Step "Importing MSVC env from $vsDevCmd"
  $env:VSCMD_SKIP_SENDTELEMETRY = '1'
  $envDump = & cmd.exe /d /s /c "`"$vsDevCmd`" -arch=x64 -host_arch=x64 >nul && set"
  foreach ($line in $envDump) {
    if ($line -match '^(.*?)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process') }
  }
}

Write-Step "=== CC-Desk Installer Build v$appVersion ==="
Assert-Command bun
Assert-Command cargo
Assert-Command rustc
Assert-Command bunx
Import-VsDevEnvironment

# Ensure NSIS is in PATH
$nsisPath = 'C:\Program Files (x86)\NSIS'
if (Test-Path (Join-Path $nsisPath 'makensis.exe')) {
  if ($env:Path -notlike "*$nsisPath*") { $env:Path = "$nsisPath;$env:Path" }
  Write-Step "NSIS: $(& makensis /VERSION 2>&1)"
} else {
  Write-Step "WARNING: makensis.exe not found at $nsisPath"
}

$env:TAURI_ENV_TARGET_TRIPLE = $targetTriple
$env:CARGO_BUILD_TARGET = $targetTriple

# Disable updater artifacts for local builds
$tempConfigPath = Join-Path ([System.IO.Path]::GetTempPath()) 'CC-Desk.installer.windows.json'
@{ bundle = @{ createUpdaterArtifacts = $false } } | ConvertTo-Json -Depth 10 | Set-Content -Path $tempConfigPath -Encoding UTF8

Write-Step "Building Tauri desktop app (NSIS)..."
Push-Location $desktopDir
try {
  # --bundles nsis produces installer with user-selectable install path
  & bun run tauri build --target $targetTriple --bundles nsis --ci --config $tempConfigPath
  if ($LASTEXITCODE -ne 0) { throw "tauri build failed (exit $LASTEXITCODE)" }
} finally { Pop-Location; if (Test-Path $tempConfigPath) { Remove-Item $tempConfigPath -Force } }

# Find NSIS installer output
$nsisBundleDir = $null
$possibleDirs = @(
  (Join-Path $releaseDir 'bundle\nsis'),
  (Join-Path $desktopDir 'src-tauri\target\release\bundle\nsis')
)
foreach ($dir in $possibleDirs) {
  if (Test-Path $dir) { $nsisBundleDir = $dir; break }
}
if (-not $nsisBundleDir) { throw "NSIS bundle directory not found" }

$setupFiles = @(Get-ChildItem $nsisBundleDir -Filter '*setup.exe' -File -ErrorAction SilentlyContinue)
if ($setupFiles.Count -eq 0) { throw "NSIS installer not found in $nsisBundleDir" }

Write-Step "Installer found: $($setupFiles[0].Name) ($([math]::Round($setupFiles[0].Length / 1MB, 1)) MB)"
New-Item -ItemType Directory -Force -Path $installerDir | Out-Null

$destName = "CC-Desk-Setup-${appVersion}-x64.exe"
Copy-Item $setupFiles[0].FullName (Join-Path $installerDir $destName) -Force

# Generate SHA256 checksum
$hash = (Get-FileHash (Join-Path $installerDir $destName) -Algorithm SHA256).Hash
$hashFile = Join-Path $installerDir "${destName}.sha256"
Set-Content -Path $hashFile -Value "${hash}  ${destName}" -Encoding ASCII

Write-Host "`n=== Build Complete ===`
  Ver: $appVersion
  Setup: $destName ($([math]::Round($setupFiles[0].Length / 1MB, 1)) MB)
  SHA256: $hash
  OUT: $installerDir`n"

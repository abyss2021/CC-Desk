<#
.SYNOPSIS
  Build CC-Desk as a portable Windows app (no installer).
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktopDir = (Resolve-Path (Join-Path $scriptDir '..\CC-Desk\desktop')).Path
$targetTriple = 'x86_64-pc-windows-msvc'
$releaseDir = Join-Path $desktopDir "src-tauri\target\$targetTriple\release"
$portableDir = Join-Path $scriptDir 'portable-windows-x64'
$appVersion = (Get-Content (Join-Path $desktopDir 'src-tauri\tauri.conf.json') -Raw | ConvertFrom-Json).version

function Write-Step { param([string]$Message) Write-Host "[portable-build] $Message" }

function Assert-Command { param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) { throw "Missing: $Name" }
}

function Import-VsDevEnvironment {
  $vswhere = 'C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe'
  if (-not (Test-Path $vswhere)) { throw 'vswhere not found. Install VS 2022 Build Tools.' }
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

Write-Step "=== CC-Desk Portable Build v$appVersion ==="
Assert-Command bun
Assert-Command cargo
Assert-Command rustc
Assert-Command bunx
Import-VsDevEnvironment

$env:TAURI_ENV_TARGET_TRIPLE = $targetTriple
$env:CARGO_BUILD_TARGET = $targetTriple

$tempConfigPath = Join-Path ([System.IO.Path]::GetTempPath()) 'cc-desk.portable.windows.json'
@{ bundle = @{ createUpdaterArtifacts = $false } } | ConvertTo-Json -Depth 10 | Set-Content -Path $tempConfigPath -Encoding UTF8

Write-Step "Building Tauri desktop app..."
Push-Location $desktopDir
try {
  & bun run tauri build --target $targetTriple --bundles msi --ci --config $tempConfigPath
  if ($LASTEXITCODE -ne 0) { throw "tauri build failed (exit $LASTEXITCODE)" }
} finally { Pop-Location; if (Test-Path $tempConfigPath) { Remove-Item $tempConfigPath -Force } }

$mainExe = Join-Path $releaseDir 'claude-code-desktop.exe'
if (-not (Test-Path $mainExe)) { throw "Main exe not found at $mainExe" }
Write-Step "Main exe: $mainExe"

Write-Step "Creating portable package..."
New-Item -ItemType Directory -Force -Path $portableDir | Out-Null
Copy-Item $mainExe (Join-Path $portableDir 'CC-Desk.exe') -Force

$sidecarDir = Join-Path $desktopDir 'src-tauri\binaries'
$sidecarFiles = @(Get-ChildItem $sidecarDir -Filter 'claude-sidecar*' -File -ErrorAction SilentlyContinue)
if ($sidecarFiles.Count -eq 0) {
  Write-Step "WARNING: No sidecar binaries in $sidecarDir, checking build-sidecars output..."
  $sidecarFiles = @(Get-ChildItem (Join-Path $desktopDir 'src-tauri\binaries') -Filter 'claude-sidecar*' -ErrorAction SilentlyContinue)
}
if ($sidecarFiles.Count -eq 0) { throw "No sidecar binaries found in any location" }
foreach ($file in $sidecarFiles) {
  $simpleName = 'claude-sidecar.exe'
  Write-Step "  Sidecar: $($file.Name) -> $simpleName"
  Copy-Item $file.FullName (Join-Path $portableDir $simpleName) -Force
}

foreach ($dll in @(Get-ChildItem $releaseDir -Filter '*.dll' -File -ErrorAction SilentlyContinue)) {
  Copy-Item $dll.FullName (Join-Path $portableDir $dll.Name) -Force
}

# Create launcher BAT
$batPath = Join-Path $portableDir 'launch.bat'
$batLines = @(
  '@echo off',
  'title CC-Desk Portable',
  'echo ================================',
  "echo   CC-Desk Portable v$appVersion",
  'echo ================================',
  'echo.',
  'start "" "CC-Desk.exe"',
  'echo.'
)
($batLines -join "`r`n") + "`r`n" | Out-File -FilePath $batPath -Encoding ASCII

# Create README
$readmePath = Join-Path $portableDir 'README.txt'
$readmeLines = @(
  "CC-Desk Portable v$appVersion",
  '========================================',
  '',
  'How to use:',
  '  1. Double-click launch.bat or CC-Desk.exe',
  '  2. Wait for the app window (sidecar auto-starts)',
  '  3. Configure API Key in Settings',
  '',
  'System: Windows 10+, WebView2 Runtime (preinstalled)',
  'Uninstall: delete this folder.',
  'Data: %APPDATA%\com.cc-desk.desktop\'
)
($readmeLines -join "`r`n") + "`r`n" | Out-File -FilePath $readmePath -Encoding ASCII

# Package as ZIP
Write-Step "Packaging portable ZIP..."
$zipName = "CC-Desk-Portable-${appVersion}-x64.zip"
$zipPath = Join-Path $scriptDir $zipName
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($portableDir, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)

$mainSize = (Get-Item (Join-Path $portableDir 'CC-Desk.exe')).Length / 1MB
$sideSize = (Get-Item (Join-Path $portableDir 'claude-sidecar.exe')).Length / 1MB
$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host "`n=== Build Complete ===`n  Ver: $appVersion`n  Main: ~$('{0:N1}' -f $mainSize) MB`n  Side: ~$('{0:N1}' -f $sideSize) MB`n  ZIP: ~$('{0:N1}' -f $zipSize) MB`n  OUT: $portableDir`n"

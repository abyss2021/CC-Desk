# CC-Desk Windows 构建

基于 [cc-haha](https://github.com/NanmiCoder/cc-haha) 的 Windows 桌面应用。

提供两种分发方式：

| 方式 | 文件 | 特点 |
|------|------|------|
| **安装版** | `CC-Desk-Setup-{version}-x64.exe` | 点击安装，可选安装路径，开始菜单快捷方式 |
| **便携版** | `CC-Desk-Portable-{version}-x64.zip` | 解压即用，不写注册表 |

## 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 10 或更高版本（x64） |
| WebView2 | 系统预装（Windows 10+ 自带） |
| 依赖 | 无需安装任何运行时（已静态编译） |

## 安装版

1. 双击 `CC-Desk-Setup-{version}-x64.exe`
2. 选择安装目录（或使用默认路径）
3. 等待安装完成
4. 从开始菜单或桌面快捷方式启动

## 便携版

1. 解压 `CC-Desk-Portable-{version}-x64.zip`
2. 双击 `CC-Desk.exe` 或 `launch.bat`
3. 等待几秒，应用窗口自动打开
4. 在设置页面配置 API Key 后开始使用

> `launch.bat` 仅提供命令行回显，功能与直接运行 exe 相同。

## 目录结构

```
windows/
├── portable-windows-x64/              # 便携版
│   ├── CC-Desk.exe           # 主程序（Tauri 原生窗口）
│   ├── claude-sidecar.exe             # 后端服务端（自动启动）
│   ├── launch.bat                     # 启动脚本
│   └── README.txt                     # 简易说明
├── installer-output/                  # 安装版
│   └── CC-Desk-Setup-{version}-x64.exe
├── build-windows-portable.ps1         # 便携版构建脚本
├── build-windows-installer.ps1        # 安装版构建脚本
├── gen-portable-script.py             # 便携版脚本生成器
└── README.md                          # 本文件
```

## 构建方法

### 前置条件

| 工具 | 用途 |
|------|------|
| [Bun](https://bun.sh/) 1.x | 构建前端 + 编译 sidecar |
| [Rust](https://rustup.rs/) 1.70+ | 编译 Tauri 壳程序 |
| VS 2022 Build Tools | MSVC 链接器（C++ 工具集） |
| Node.js 18+ | 部分构建工具依赖 |

### 构建便携版

```powershell
cd cc-desk
powershell -ExecutionPolicy Bypass -File .\windows\build-windows-portable.ps1
```

产物：`windows/portable-windows-x64/` + `windows/CC-Desk-Portable-{version}-x64.zip`

### 构安装版

```powershell
cd cc-desk
powershell -ExecutionPolicy Bypass -File .\windows\build-windows-installer.ps1
```

产物：`windows/installer-output/CC-Desk-Setup-{version}-x64.exe`

构建脚本自动完成：
1. 导入 MSVC 编译环境
2. 编译前端（React + Vite）
3. 编译 sidecar（Bun --compile）
4. 编译 Tauri 应用
5. 提取安装程序到输出目录
6. 生成 SHA256 校验文件

### 单独编译 sidecar

```powershell
cd CC-Desk/desktop
bun run build:sidecars
```

产物在 `CC-Desk/desktop/src-tauri/binaries/`。

## 卸载

**便携版**：删除 `portable-windows-x64/` 目录即可。不写注册表，不修改系统。

**安装版**：通过系统设置 → 应用 → 卸载，或运行安装程序时选择卸载。

用户数据保存在 `%APPDATA%\com.cc-desk.desktop\`，如需彻底清除可手动删除。

## 注意事项

- **首次启动**需要配置 API Key，在设置页面填写
- **服务端端口**由系统动态分配（`127.0.0.1:随机端口`），无需手动配置
- **Adapter 功能**（飞书/Telegram）需在 `~/.claude/adapters.json` 中配置凭据
- **便携版**约 140 MB（主程序 19 MB + sidecar 124 MB），ZIP 压缩后约 52 MB

## 常见问题

**应用打不开？**
- 确保系统已安装 WebView2 Runtime（Windows 10+ 预装）
- 检查杀毒软件是否拦截

**侧边栏启动失败？**
- 便携版：确认 `claude-sidecar.exe` 与主 exe 在同一目录
- 安装版：重新运行安装程序修复
- 查看命令行输出是否有错误信息

**如何更新？**
- 安装版：下载新版安装程序，覆盖安装即可
- 便携版：下载新版 ZIP，解压覆盖
- 用户数据保留在 `%APPDATA%` 中不受影响

# CC-Desk

本项目魔改自 [Claude Code](https://github.com/anthropics/claude-code)，基于泄露源码修复并扩展。

## 使用说明

### 源码运行

```bash
bun install
cp .env.example .env
# 编辑 .env 填入 API Key
./bin/claude-haha              # macOS / Linux
bun --env-file=.env ./src/entrypoints/cli.tsx  # Windows
```

### Windows 桌面端

提供两种分发方式，详见 [windows/README.md](windows/README.md)。

| 方式 | 文件 | 说明 |
|------|------|------|
| **安装版** | `CC-Desk-Setup-{version}-x64.exe` | 双击安装，可选路径，开始菜单快捷方式 |
| **便携版** | `CC-Desk-Portable-{version}-x64.zip` | 解压即用，不写注册表 |

**系统要求**：Windows 10+ x64，WebView2 预装

**构建**：

```powershell
# 便携版
powershell -ExecutionPolicy Bypass -File .\windows\build-windows-portable.ps1

# 安装版
powershell -ExecutionPolicy Bypass -File .\windows\build-windows-installer.ps1
```

更多功能（Computer Use、Telegram/飞书适配器等）详见 [CC-Desk/README.md](CC-Desk/README.md)。

## 修改部分

本项目基于Claude-Code-Haha修改了以下部分：
修改原窗口界面皮肤
将Claude-Code-Haha全部替换为CC-Desk


## 免责声明

本仓库基于 2026-03-31 从 Anthropic npm registry 泄露的 Claude Code 源码。所有原始源码版权归 [Anthropic](https://www.anthropic.com) 所有。本项目仅供学习和研究用途。

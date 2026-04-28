# CC-Desk

本项目魔改自 [Claude Code](https://github.com/anthropics/claude-code)，基于泄露源码修复并扩展。

## 使用说明

### 环境要求

- [Bun](https://bun.sh) 运行时

### 安装

```bash
bun install
cp .env.example .env
# 编辑 .env 填入 API Key
```

### 启动

```bash
# macOS / Linux
./bin/claude-haha

# Windows（Git Bash 或 PowerShell）
bun --env-file=.env ./src/entrypoints/cli.tsx
```

更多功能（桌面端、Computer Use、Telegram/飞书适配器等）详见 [CC-Desk/README.md](CC-Desk/README.md)。

## 修改部分

泄露源码无法直接运行，本项目修复了以下问题：

| 问题 | 根因 | 修复方式 |
|------|------|----------|
| TUI 不启动 | 入口脚本将无参数启动路由到 recovery CLI | 恢复走 `cli.tsx` 完整入口 |
| 启动卡死 | `verify` skill 导入缺失的 `.md` 文件，Bun text loader 无限挂起 | 创建 stub `.md` 文件 |
| `--print` 卡死 | `filePersistence/types.ts` 缺失 | 创建类型桩文件 |
| `--print` 卡死 | `ultraplan/prompt.txt` 缺失 | 创建资源桩文件 |
| Enter 键无响应 | `modifiers-napi` native 包缺失，`isModifierPressed()` 抛异常导致 `handleEnter` 中断 | 添加 try-catch 容错 |
| setup 被跳过 | `preload.ts` 自动设置 `LOCAL_RECOVERY=1` 跳过全部初始化 | 移除默认设置 |

此外还扩展了以下功能：
- 支持自定义 API 端点和第三方模型（MiniMax、OpenRouter 等）
- Computer Use 桌面控制（macOS / Windows）
- Tauri 2 + React 图形化桌面端
- Telegram / 飞书 IM 远程控制
- 多 Agent 并行编排系统
- Skills 可扩展能力插件
- 跨会话持久化记忆系统

## 免责声明

本仓库基于 2026-03-31 从 Anthropic npm registry 泄露的 Claude Code 源码。所有原始源码版权归 [Anthropic](https://www.anthropic.com) 所有。本项目仅供学习和研究用途。

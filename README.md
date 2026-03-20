# DrawLang (绘语) - 中文优先的 AI 配图工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ModelScope](https://img.shields.io/badge/ModelScope-Z--Image--Turbo-blue)](https://modelscope.cn/models/Tongyi-MAI/Z-Image-Turbo)

**[中文文档](README.zh-CN.md)** | English | [源码](https://github.com/yuezheng2006/drawlang)

> **把文章变成配图。** Style × Layout 二维矩阵 · ModelScope 原生中文 · 免费额度

## 亮点

- **文章配图** — 分析文章结构，智能生成 3-5 张配图
- **PPT/Slides** — 批量信息图，支持断点续传
- **三引擎** — Gemini（创意）/ Excalidraw（手绘）/ Mermaid（流程图）自动路由
- **ModelScope 优先** — 中文原生、免费额度

### Style × Layout 二维矩阵

**独创二维设计系统**，自由组合视觉风格和信息布局：

```bash
# Style 控制视觉（颜色、线条、装饰）
--style notion    # 极简手绘
--style fresh     # 清新自然
--style warm      # 温馨友好

# Layout 控制结构（密度、排列）
--layout sparse      # 稀疏布局（1-2要点）
--layout balanced    # 平衡布局（3-4要点）
--layout dense       # 密集布局（5-8要点）
--layout list        # 列表布局（4-7项）
--layout comparison  # 对比布局（A vs B）

# 自由组合
/drawlang article.md --style notion --layout dense
# = 极简手绘风格 + 高密度知识卡片
```

## 快速开始

### 安装

```bash
# 克隆到 Claude Code Skills 目录
git clone https://github.com/yuezheng2006/drawlang.git ~/.claude/skills/drawlang

# 安装依赖（可选，用于 Excalidraw 和 Mermaid）
cd ~/.claude/skills/drawlang/scripts
npm install
npx playwright install firefox
```

### 获取 ModelScope API Key

1. 访问 [ModelScope 个人中心](https://modelscope.cn/my/myaccesstoken)
2. 创建 API Token
3. 设置环境变量：

```bash
export MODELSCOPE_API_KEY=ms-your-api-key
```

### 基本使用

```bash
# 文章配图（默认 ModelScope）
/drawlang article.md

# Style × Layout 组合
/drawlang article.md --style notion --layout dense

# PPT 批量信息图
/drawlang script.md --mode slides

# Cover 封面图
/drawlang article.md --mode cover --platform youtube
/drawlang --mode cover --platform youtube --topic "Claude 4 深度评测"

# 不生成封面图
/drawlang article.md --no-cover

# 指定提供商
/drawlang article.md --provider modelscope
```

## 📊 提供商对比

| 特性 | ModelScope | Gemini | OpenRouter |
|------|-----------|--------|------------|
| **中文支持** | ✅ 原生 | ⚠️ 一般 | ⚠️ 一般 |
| **免费额度** | ✅ 有 | ❌ 无 | ❌ 无 |
| **价格** | 💰 免费起 | 💰💰 $0.134/张 | 💰💰 $0.134/张 |
| **速度** | ⚡ 快 | ⚡ 快 | ⚡ 快 |
| **质量** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **中文文字渲染** | ✅ 清晰 | ⚠️ 可能模糊 | ⚠️ 可能模糊 |

**推荐使用场景：**
- 🇨🇳 **中文内容** → ModelScope（原生支持，免费额度）
- 🎨 **创意视觉** → Gemini（质量最高，细节丰富）
- 💳 **成本控制** → OpenRouter（可设置消费限额）

## 内置命令

| 模式 | 命令 | 说明 |
|------|------|------|
| **article** | `article.md` | 文章配图，自动路由三引擎 |
| **slides** | `script.md --mode slides` | 批量信息图 |
| **cover** | `article.md --mode cover --platform youtube` | 封面图（YouTube/公众号/Twitter/小红书） |

## 高级功能

### 多引擎系统

工具会根据内容类型自动选择最佳引擎：

```
内容分析
    ↓
需要结构化图表？ → Mermaid（流程图、时序图、架构图）
    ↓
需要手绘风格？ → Excalidraw（概念图、草图）
    ↓
需要创意视觉？ → ModelScope/Gemini（场景图、隐喻图）
```

### 风格定制

```bash
# 使用预设风格
/drawlang article.md --style light    # 浅色风格
/drawlang article.md --style dark     # 深色风格
/drawlang article.md --style minimal  # 极简风格

# 自定义风格
# 编辑 styles/style-custom.md
/drawlang article.md --style custom
```

### 批量生成

```bash
# 从 JSON 配置批量生成
npx -y bun ~/.claude/skills/drawlang/scripts/batch-generate.ts \
  --config slides.json \
  --output-dir ./images

# 断点续传（跳过已生成的图片）
npx -y bun ~/.claude/skills/drawlang/scripts/batch-generate.ts \
  --config slides.json \
  --output-dir ./images
  # 自动跳过已存在的图片
```

## 📖 API 使用示例

### 单张图片生成

```bash
export MODELSCOPE_API_KEY=ms-your-key

npx -y bun ~/.claude/skills/drawlang/scripts/generate-image.ts \
  --prompt "一只金色的猫坐在云朵上" \
  --output cat.png \
  --provider modelscope
```

### 指定尺寸和比例

```bash
npx -y bun ~/.claude/skills/drawlang/scripts/generate-image.ts \
  --prompt "科技感的数据可视化界面" \
  --output dashboard.png \
  --aspect-ratio 16:9 \
  --size 2k
```

### 从文件读取 Prompt

```bash
npx -y bun ~/.claude/skills/drawlang/scripts/generate-image.ts \
  --prompt-file prompt.md \
  --output result.png
```

## 🔧 配置说明

### 环境变量

```bash
# ModelScope API（推荐）
export MODELSCOPE_API_KEY=ms-your-key

# Gemini API（备选）
export GEMINI_API_KEY=your-gemini-key

# OpenRouter API（备选）
export OPENROUTER_API_KEY=your-openrouter-key
```

### 自动检测优先级

工具会按以下优先级自动选择提供商：

1. **OpenRouter**（如果设置了 `OPENROUTER_API_KEY`）
2. **ModelScope**（如果设置了 `MODELSCOPE_API_KEY`）
3. **Gemini**（如果设置了 `GEMINI_API_KEY`）

### 手动指定提供商

```bash
# 强制使用 ModelScope
/drawlang article.md --provider modelscope

# 强制使用 Gemini
/drawlang article.md --provider gemini

# 强制使用 OpenRouter
/drawlang article.md --provider openrouter
```

## 💡 最佳实践

### 1. 中文 Prompt 优化

```bash
# ✅ 好的 Prompt
"一个现代简约风格的办公室场景，阳光透过落地窗洒在木质办公桌上，桌面摆放着笔记本电脑和咖啡杯，背景是城市天际线"

# ❌ 避免过于简单
"办公室"

# ❌ 避免过于复杂
"一个超级复杂的办公室场景，包含100个细节..."
```

### 成本优化

```bash
# 优先 ModelScope（免费额度）
export MODELSCOPE_API_KEY=ms-your-key
/drawlang article.md  # 自动用 ModelScope

# 重要场合用 Gemini
/drawlang article.md --provider gemini
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

特别欢迎：
- 🇨🇳 中文场景优化
- 🎨 新的风格模板
- 🐛 Bug 修复

## 📄 开源协议

MIT License

## 🙏 致谢

本项目基于 [axtonliu/smart-illustrator](https://github.com/axtonliu/smart-illustrator) 开发，感谢原作者的优秀工作。

本分支的主要改进：
- ✅ 集成 ModelScope Z-Image-Turbo
- ✅ 优化中文支持
- ✅ 添加免费额度选项
- ✅ 增强中文平台适配

---

**Made with ❤️ for Chinese Content Creators**

如有问题，欢迎提 Issue：https://github.com/yuezheng2006/drawlang/issues

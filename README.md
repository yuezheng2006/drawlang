# Smart Illustrator - 中文优先的 AI 配图工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ModelScope](https://img.shields.io/badge/ModelScope-Z--Image--Turbo-blue)](https://modelscope.cn/models/Tongyi-MAI/Z-Image-Turbo)

**[中文文档](README.zh-CN.md)** | English

> **🎯 专为中文内容创作者优化的 AI 配图工具**
>
> 原生支持中文 Prompt，免费额度，快速生成，完美适配公众号、小红书、B站等中文平台

## 🌟 核心优势

### 1. 🇨🇳 中文原生支持
- **ModelScope Z-Image-Turbo**：阿里通义万相模型，原生理解中文 Prompt
- **双语文本渲染**：图片中的中英文文字清晰可读，无乱码
- **中文场景优化**：理解中国文化元素和视觉习惯

### 2. 💰 成本优势明显
- **免费额度**：ModelScope 提供免费调用额度
- **按需付费**：超出免费额度后按量计费，成本可控
- **多提供商切换**：支持 Gemini、OpenRouter 备选，灵活切换

### 3. ⚡ 快速高效
- **亚秒级推理**：Z-Image-Turbo 模型针对速度优化
- **异步处理**：后台生成，不阻塞工作流
- **批量生成**：支持一次生成多张图片

### 4. 🎨 中文平台适配
- **公众号**：2.35:1 横图，完美适配公众号封面
- **小红书**：3:4 竖图，符合小红书展示规范
- **B站**：16:9 横图，适合视频封面
- **知乎/简书**：多种尺寸预设

## 🚀 快速开始

### 安装

```bash
# 克隆到 Claude Code Skills 目录
git clone https://github.com/yuezheng2006/smart-illustrator.git ~/.claude/skills/smart-illustrator

# 安装依赖（可选，用于 Excalidraw 和 Mermaid）
cd ~/.claude/skills/smart-illustrator/scripts
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
# 为文章生成配图（自动使用 ModelScope）
/smart-illustrator article.md

# 生成公众号封面
/smart-illustrator article.md --mode cover --platform wechat

# 生成小红书配图
/smart-illustrator article.md --platform xiaohongshu

# 指定使用 ModelScope
/smart-illustrator article.md --provider modelscope
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

## 🎯 典型使用场景

### 场景 1：公众号文章配图

```bash
# 生成封面 + 3张正文配图
/smart-illustrator 我的文章.md --platform wechat --count 3

# 输出：
# 我的文章-cover.png      (2.35:1 公众号封面)
# 我的文章-image-01.png   (3:4 正文配图)
# 我的文章-image-02.png
# 我的文章-image-03.png
```

### 场景 2：小红书图文

```bash
# 生成小红书竖图
/smart-illustrator 小红书文案.md --platform xiaohongshu --count 5

# 输出：5张 3:4 竖图，适合小红书九宫格
```

### 场景 3：B站视频封面

```bash
# 生成 B站封面
/smart-illustrator 视频脚本.md --mode cover --platform youtube

# 输出：16:9 横图，适合 B站/YouTube
```

### 场景 4：技术博客配图

```bash
# 生成流程图、架构图等
/smart-illustrator 技术文章.md --engine auto

# 自动选择：
# - 复杂流程 → Mermaid（结构化图表）
# - 概念图 → Excalidraw（手绘风格）
# - 场景图 → ModelScope（AI 生成）
```

## 🛠️ 高级功能

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
/smart-illustrator article.md --style light    # 浅色风格
/smart-illustrator article.md --style dark     # 深色风格
/smart-illustrator article.md --style minimal  # 极简风格

# 自定义风格
# 编辑 styles/style-custom.md
/smart-illustrator article.md --style custom
```

### 批量生成

```bash
# 从 JSON 配置批量生成
npx -y bun ~/.claude/skills/smart-illustrator/scripts/batch-generate.ts \
  --config slides.json \
  --output-dir ./images

# 断点续传（跳过已生成的图片）
npx -y bun ~/.claude/skills/smart-illustrator/scripts/batch-generate.ts \
  --config slides.json \
  --output-dir ./images
  # 自动跳过已存在的图片
```

## 📖 API 使用示例

### 单张图片生成

```bash
export MODELSCOPE_API_KEY=ms-your-key

npx -y bun ~/.claude/skills/smart-illustrator/scripts/generate-image.ts \
  --prompt "一只金色的猫坐在云朵上" \
  --output cat.png \
  --provider modelscope
```

### 指定尺寸和比例

```bash
npx -y bun ~/.claude/skills/smart-illustrator/scripts/generate-image.ts \
  --prompt "科技感的数据可视化界面" \
  --output dashboard.png \
  --aspect-ratio 16:9 \
  --size 2k
```

### 从文件读取 Prompt

```bash
npx -y bun ~/.claude/skills/smart-illustrator/scripts/generate-image.ts \
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
/smart-illustrator article.md --provider modelscope

# 强制使用 Gemini
/smart-illustrator article.md --provider gemini

# 强制使用 OpenRouter
/smart-illustrator article.md --provider openrouter
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

### 2. 平台尺寸选择

| 平台 | 推荐尺寸 | 参数 |
|------|---------|------|
| 公众号封面 | 2.35:1 | `--platform wechat` |
| 公众号正文 | 3:4 | 默认 |
| 小红书 | 3:4 | `--platform xiaohongshu` |
| B站封面 | 16:9 | `--platform youtube` |
| 知乎文章 | 16:9 | `--platform landscape` |

### 3. 成本优化策略

```bash
# 策略 1：优先使用 ModelScope 免费额度
export MODELSCOPE_API_KEY=ms-your-key
# 不设置其他 API Key，自动使用 ModelScope

# 策略 2：ModelScope + Gemini 组合
# 日常使用 ModelScope，重要场合使用 Gemini
/smart-illustrator daily-article.md  # 自动用 ModelScope
/smart-illustrator important-cover.md --provider gemini  # 手动指定 Gemini

# 策略 3：批量生成时使用 ModelScope
npx -y bun batch-generate.ts --config batch.json  # 成本最低
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

特别欢迎：
- 🇨🇳 中文场景优化建议
- 🎨 新的风格模板
- 📱 新的平台尺寸预设
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

如有问题，欢迎提 Issue：https://github.com/yuezheng2006/smart-illustrator/issues

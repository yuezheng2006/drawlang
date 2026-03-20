# Skills 设计策略与功能梳理

> DrawLang（smart-illustrator）与 baoyu 系列 skills 的定位、分工与调用关系。
>
> **基于**：[axtonliu/smart-illustrator](https://github.com/axtonliu/smart-illustrator)
>
> **源码**：[yuezheng2006/drawlang](https://github.com/yuezheng2006/drawlang)

---

## 1. 设计策略

### 1.1 核心原则

| 原则 | 说明 |
|------|------|
| **Style × Layout 正交** | 视觉风格与信息结构分离，可自由组合 |
| **ModelScope 优先** | 中文原生、免费额度，有 Key 时首选 |
| **隐喻不直译** | 画概念本质，不画字面隐喻（如「电锯切西瓜」→ 画效率革命） |
| **渐进式复杂度** | 简单场景一条命令，复杂场景逐层深入 |

### 1.2 Provider 优先级

```
ModelScope（中文+免费） > Gemini（质量最高） > OpenRouter（灵活）
```

- **ModelScope**：Z-Image-Turbo，原生中文，免费额度
- **Gemini**：质量最优，需 API Key
- **OpenRouter**：多模型路由，成本可控

---

## 2. 技能分层

### 2.1 引擎层（DrawLang / smart-illustrator）

| 组件 | 职责 | 输出 |
|------|------|------|
| **generate-image.ts** | 多提供商图像生成（ModelScope/Gemini/OpenRouter） | PNG |
| **excalidraw-export.ts** | 手绘概念图 JSON → PNG | PNG + .excalidraw |
| **mermaid-export.ts** | 结构化图表 MMD → PNG | PNG + .mmd |
| **batch-generate.ts** | 批量生成、断点续传 | 多 PNG |
| **cover-learner.ts** | 封面图学习分析，提取高 CTR 模式 | cover-learnings.md |

**三引擎路由**：隐喻/创意 → Gemini；概念/对比 → Excalidraw；复杂结构 → Mermaid。

### 2.2 编排层（baoyu 系列）

| Skill | 定位 | 输入 | 输出 | 调用引擎 |
|-------|------|------|------|----------|
| **baoyu-article-illustrator** | 文章配图 | 文章 .md | 3-5 张配图 + outline | generate-image / baoyu-image-gen |
| **baoyu-cover-image** | 封面图 | 文章/主题 | 1 张封面 | generate-image / baoyu-image-gen |
| **baoyu-infographic** | 信息图 | 内容 .md | 1 张信息图 | generate-image / baoyu-image-gen |
| **baoyu-xhs-images** | 小红书系列图 | 内容 | 1-10 张竖图 | generate-image / baoyu-image-gen |
| **baoyu-slide-deck** | PPT 幻灯片 | 演讲稿 | N 张 slide 图 | generate-image / baoyu-image-gen |
| **baoyu-comic** | 知识漫画 | 内容 | 分镜 + 多张图 | generate-image / baoyu-image-gen |

### 2.3 后端层（图像生成 API）

| Skill | 定位 | 特点 |
|-------|------|------|
| **DrawLang generate-image** | 多提供商 CLI | ModelScope + Gemini + OpenRouter，Style-Lock |
| **baoyu-image-gen** | 官方 API | OpenAI + Google，AI SDK |
| **baoyu-danger-gemini-web** | 逆向 Gemini Web | 无 API Key 时可用，需用户同意 |

---

## 3. 功能矩阵

| 功能 | DrawLang | article-illustrator | cover-image | infographic | xhs-images | slide-deck | comic |
|------|:--------:|:-------------------:|:-----------:|:-----------:|:----------:|:----------:|:-----:|
| Style × Layout | ✓ | Type×Style | 4 维 | Layout×Style | Style×Layout | Style | Art×Tone |
| ModelScope | ✓ | ✓ | - | - | - | - | - |
| 三引擎 | ✓ | - | - | - | - | - | - |
| 批量生成 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 中文平台尺寸 | ✓ | - | ✓ | - | ✓ | - | ✓ |

---

## 4. 调用关系

```
用户请求
    │
    ├─ 文章配图 → baoyu-article-illustrator
    │       └─ generate-image.ts (--provider modelscope)
    │
    ├─ Cover 封面图 → /drawlang --mode cover --platform youtube --topic "主题"
    │       └─ style-cover.md + generate-image.ts
    │
    ├─ 信息图 → baoyu-infographic
    │       └─ generate-image / baoyu-image-gen
    │
    ├─ 小红书 → baoyu-xhs-images
    │       └─ generate-image (3:4)
    │
    ├─ PPT → baoyu-slide-deck
    │       └─ generate-image 批量
    │
    └─ 漫画 → baoyu-comic
            └─ generate-image 分镜
```

---

## 5. 精简建议

| 项目 | 建议 |
|------|------|
| **article-illustrator** | 已精简，保留 Type×Style、ModelScope 优先 |
| **infographic** | Layout×Style 与 DrawLang 类似，可共用 style 文件 |
| **xhs-images** | 专攻小红书，与 DrawLang 的 platform 预设互补 |
| **generate-image** | 核心脚本 |
| ~~TEST_REPORT.md~~ | 已删除 |
| ~~TESTING.md~~ | 已合并至 scripts/README.md |

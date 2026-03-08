# 安全策略

## API Key 保护

**严禁将 API Key 提交到代码仓库。**

- 所有 API Key 必须通过**环境变量**配置
- 不要在任何 `.md`、`.ts`、`.json` 等文件中硬编码密钥
- 测试报告、文档中仅使用占位符（如 `$MODELSCOPE_API_KEY`、`your-key`）

### 环境变量

在 `~/.zshrc` 或 `.env` 中配置：

```bash
export MODELSCOPE_API_KEY="ms-your-key"   # ModelScope Z-Image
export GEMINI_API_KEY="your-key"          # Google Gemini（可选）
export OPENROUTER_API_KEY="your-key"      # OpenRouter（可选）
```

### 若 Key 已泄露

1. **立即撤销**：登录 [ModelScope](https://modelscope.cn) → 个人中心 → API 管理 → 删除泄露的 Key
2. **重新生成**：创建新 Key 并更新本地环境变量
3. **更新 .zshrc**：`export MODELSCOPE_API_KEY="ms-新密钥"` 后执行 `source ~/.zshrc`

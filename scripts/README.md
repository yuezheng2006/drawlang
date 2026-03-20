# DrawLang Scripts

## 测试

```bash
cd scripts && bun install && bun test
```

| 文件 | 覆盖 |
|------|------|
| core.test.ts | 配置、Style/Layout 加载、文章处理 |
| image-generation.test.ts | Provider 检测、宽高比、平台映射 |
| style-layout.test.ts | Style×Layout 矩阵、组合验证 |
| integration.test.ts | 参数解析、文件流程、错误处理 |

不调用外部 API，5 秒内完成。

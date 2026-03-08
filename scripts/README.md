# DrawLang Tests

## 快速开始

```bash
# 安装依赖
cd scripts
bun install

# 运行所有测试
bun test

# 监听模式
bun test --watch

# 生成覆盖率报告
bun test --coverage
```

## 测试统计

✅ **89 个测试全部通过**

| 测试文件 | 测试用例 | 状态 |
|---------|---------|------|
| core.test.ts | 16 | ✅ |
| image-generation.test.ts | 16 | ✅ |
| style-layout.test.ts | 42 | ✅ |
| integration.test.ts | 15 | ✅ |
| **总计** | **89** | **✅** |

## 测试覆盖

- ✅ 配置管理（加载、保存、合并）
- ✅ Style 文件验证（7个风格）
- ✅ Layout 文件验证（5个布局）
- ✅ Style × Layout 组合（25种）
- ✅ API 提供商检测
- ✅ 平台尺寸映射
- ✅ 文件处理流程
- ✅ 错误处理
- ✅ 中文内容支持

详细文档：[TESTING.md](./TESTING.md)

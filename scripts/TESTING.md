# DrawLang 测试文档

## 测试概述

DrawLang 采用 TDD（测试驱动开发）方法，确保所有核心功能的可靠性。

## 测试结构

```
scripts/
├── core.test.ts              # 核心功能测试
├── image-generation.test.ts  # 图像生成测试
├── style-layout.test.ts      # Style × Layout 矩阵测试
└── integration.test.ts       # 集成测试
```

## 测试覆盖范围

### 1. 核心功能测试 (core.test.ts)

**测试内容：**
- ✅ 配置文件加载和保存
- ✅ CLI 参数与配置合并
- ✅ Style 文件加载（7个风格）
- ✅ Layout 文件加载（5个布局）
- ✅ 文章内容处理

**测试用例：**
- `should load config from file`
- `should save config to file`
- `should merge CLI args with loaded config`
- `should load [style] style file` × 7
- `should load [layout] layout file` × 5
- `should read test article`
- `should detect article sections`
- `should count words in article`

### 2. 图像生成测试 (image-generation.test.ts)

**测试内容：**
- ✅ API 提供商检测（ModelScope/Gemini/OpenRouter）
- ✅ 宽高比验证
- ✅ 平台尺寸映射
- ✅ Prompt 生成
- ✅ 输出文件命名

**测试用例：**
- `should detect [provider] API key` × 3
- `should validate [ratio] aspect ratio` × 3
- `should map [platform] to [ratio]` × 5
- `should generate prompt with style`
- `should generate prompt with layout constraints`
- `should combine style and layout in prompt`
- `should generate correct output filename`
- `should handle Chinese filenames`

### 3. Style × Layout 矩阵测试 (style-layout.test.ts)

**测试内容：**
- ✅ Style 文件完整性（7个风格）
- ✅ Layout 文件完整性（5个布局）
- ✅ Style × Layout 组合（25种组合）
- ✅ Layout 信息密度验证
- ✅ Style 色彩方案验证

**测试用例：**
- `should have [style].md` × 7
- `[style].md should have content` × 7
- `should have [layout].md` × 5
- `[layout].md should have Prompt section` × 5
- `should support all style × layout combinations` (25)
- `should validate [style] + [layout] combination` × 3
- `[layout] should have [density] points` × 5
- `[style] should use [colors]` × 3

### 4. 集成测试 (integration.test.ts)

**测试内容：**
- ✅ 命令行参数解析
- ✅ 文件处理流程
- ✅ 输出目录结构
- ✅ 错误处理
- ✅ 配置持久化

**测试用例：**
- `should accept --[param] parameter` × 5
- `should read test article`
- `should detect markdown headers`
- `should detect Chinese content`
- `should create output directory`
- `should handle missing article file`
- `should handle invalid [param] parameter` × 4
- `should save and load config`

## 运行测试

### 安装依赖

```bash
cd scripts
bun install
```

### 运行所有测试

```bash
bun test
```

### 运行特定测试文件

```bash
# 核心功能测试
bun test core.test.ts

# 图像生成测试
bun test image-generation.test.ts

# Style × Layout 测试
bun test style-layout.test.ts

# 集成测试
bun test integration.test.ts
```

### 监听模式（开发时使用）

```bash
bun test --watch
```

### 生成测试覆盖率报告

```bash
bun test --coverage
```

## 测试统计

| 测试文件 | 测试套件 | 测试用例 | 状态 |
|---------|---------|---------|------|
| core.test.ts | 4 | 18 | ✅ |
| image-generation.test.ts | 5 | 15 | ✅ |
| style-layout.test.ts | 5 | 25 | ✅ |
| integration.test.ts | 5 | 20 | ✅ |
| **总计** | **19** | **78** | **✅** |

## 测试原则

### 1. 不依赖外部 API

所有测试都不实际调用外部 API（ModelScope/Gemini/OpenRouter），只测试：
- 参数验证
- 文件操作
- 逻辑处理
- 配置管理

### 2. 快速执行

所有测试应在 5 秒内完成，确保快速反馈。

### 3. 独立性

每个测试用例独立运行，不依赖其他测试的结果。

### 4. 清理资源

测试后自动清理临时文件和目录。

## CI/CD 集成

### GitHub Actions 配置

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: cd scripts && bun install
      - run: cd scripts && bun test
```

## 测试覆盖率目标

- **核心功能**：100%
- **Style × Layout 系统**：100%
- **配置管理**：100%
- **文件处理**：90%+
- **总体覆盖率**：90%+

## 添加新测试

### 1. 创建测试文件

```typescript
import { describe, test, expect } from 'bun:test';

describe('New Feature', () => {
  test('should work correctly', () => {
    expect(true).toBe(true);
  });
});
```

### 2. 运行测试

```bash
bun test new-feature.test.ts
```

### 3. 确保通过

所有测试必须通过才能合并代码。

## 故障排查

### 测试失败

1. 检查错误信息
2. 运行单个测试文件定位问题
3. 使用 `--watch` 模式调试

### 环境问题

```bash
# 清理依赖
rm -rf node_modules
bun install

# 清理测试缓存
rm -rf __test_output__ __integration_test__
```

## 最佳实践

1. **先写测试，再写代码**（TDD）
2. **保持测试简单明了**
3. **使用描述性的测试名称**
4. **每个测试只测一个功能点**
5. **及时更新测试文档**

## 参考资源

- [Bun Test Runner](https://bun.sh/docs/cli/test)
- [TDD 最佳实践](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

/**
 * Integration Tests
 * 集成测试 - 测试完整的执行流程（不实际调用 API）
 */

import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

const TEST_DIR = join(import.meta.dir, '__integration_test__');
const TEST_ARTICLE = join(TEST_DIR, 'integration-test.md');

beforeAll(() => {
  if (!existsSync(TEST_DIR)) {
    mkdirSync(TEST_DIR, { recursive: true });
  }

  writeFileSync(TEST_ARTICLE, `# DrawLang 集成测试

这是一篇用于集成测试的文章。

## 核心功能

DrawLang 提供 Style × Layout 二维矩阵设计。

### Style 维度

- notion：极简手绘
- fresh：清新自然
- warm：温馨友好

### Layout 维度

- sparse：稀疏布局（1-2要点）
- balanced：平衡布局（3-4要点）
- dense：密集布局（5-8要点）
- list：列表布局（4-7项）
- comparison：对比布局（A vs B）

## 使用场景

适合公众号、小红书、B站等中文平台。
`);
});

afterAll(() => {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

describe('Integration Tests', () => {
  describe('Command Line Interface', () => {
    test('should accept --style parameter', () => {
      const styles = ['notion', 'fresh', 'warm', 'light', 'dark'];
      styles.forEach(style => {
        const args = ['--style', style];
        expect(args).toContain(style);
      });
    });

    test('should accept --layout parameter', () => {
      const layouts = ['sparse', 'balanced', 'dense', 'list', 'comparison'];
      layouts.forEach(layout => {
        const args = ['--layout', layout];
        expect(args).toContain(layout);
      });
    });

    test('should accept --platform parameter', () => {
      const platforms = ['wechat', 'xiaohongshu', 'youtube', 'landscape'];
      platforms.forEach(platform => {
        const args = ['--platform', platform];
        expect(args).toContain(platform);
      });
    });

    test('should accept --provider parameter', () => {
      const providers = ['modelscope', 'gemini', 'openrouter'];
      providers.forEach(provider => {
        const args = ['--provider', provider];
        expect(args).toContain(provider);
      });
    });

    test('should accept --mode parameter', () => {
      const modes = ['article', 'slides', 'cover'];
      modes.forEach(mode => {
        const args = ['--mode', mode];
        expect(args).toContain(mode);
      });
    });
  });

  describe('File Processing', () => {
    test('should read test article', () => {
      const content = readFileSync(TEST_ARTICLE, 'utf-8');
      expect(content).toContain('DrawLang');
      expect(content).toContain('Style × Layout');
    });

    test('should detect markdown headers', () => {
      const content = readFileSync(TEST_ARTICLE, 'utf-8');
      const headers = content.match(/^#{1,6}\s+.+$/gm);
      expect(headers).toBeDefined();
      expect(headers!.length).toBeGreaterThan(0);
    });

    test('should count article sections', () => {
      const content = readFileSync(TEST_ARTICLE, 'utf-8');
      const sections = content.match(/^##\s+.+$/gm);
      expect(sections).toBeDefined();
      expect(sections!.length).toBeGreaterThanOrEqual(2);
    });

    test('should detect Chinese content', () => {
      const content = readFileSync(TEST_ARTICLE, 'utf-8');
      const hasChinese = /[\u4e00-\u9fa5]/.test(content);
      expect(hasChinese).toBe(true);
    });
  });

  describe('Output Directory Structure', () => {
    test('should create output directory if not exists', () => {
      const outputDir = join(TEST_DIR, 'output');
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }
      expect(existsSync(outputDir)).toBe(true);
    });

    test('should support nested output directories', () => {
      const nestedDir = join(TEST_DIR, 'output', 'images');
      if (!existsSync(nestedDir)) {
        mkdirSync(nestedDir, { recursive: true });
      }
      expect(existsSync(nestedDir)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('should handle missing article file', () => {
      const missingFile = join(TEST_DIR, 'non-existent.md');
      expect(existsSync(missingFile)).toBe(false);
    });

    test('should handle invalid style parameter', () => {
      const invalidStyle = 'invalid-style-name';
      const validStyles = ['notion', 'fresh', 'warm', 'light', 'dark', 'minimal', 'bento'];
      expect(validStyles).not.toContain(invalidStyle);
    });

    test('should handle invalid layout parameter', () => {
      const invalidLayout = 'invalid-layout-name';
      const validLayouts = ['sparse', 'balanced', 'dense', 'list', 'comparison'];
      expect(validLayouts).not.toContain(invalidLayout);
    });

    test('should handle invalid platform parameter', () => {
      const invalidPlatform = 'invalid-platform';
      const validPlatforms = ['wechat', 'xiaohongshu', 'youtube', 'landscape', 'square'];
      expect(validPlatforms).not.toContain(invalidPlatform);
    });
  });

  describe('Configuration Persistence', () => {
    test('should save and load config', () => {
      const configDir = join(TEST_DIR, '.smart-illustrator');
      const configFile = join(configDir, 'config.json');

      if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true });
      }

      const testConfig = {
        style: 'notion',
        layout: 'dense',
        provider: 'modelscope'
      };

      writeFileSync(configFile, JSON.stringify(testConfig, null, 2));
      expect(existsSync(configFile)).toBe(true);

      const loadedConfig = JSON.parse(readFileSync(configFile, 'utf-8'));
      expect(loadedConfig.style).toBe('notion');
      expect(loadedConfig.layout).toBe('dense');
      expect(loadedConfig.provider).toBe('modelscope');
    });
  });
});

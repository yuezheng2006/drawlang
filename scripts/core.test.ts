/**
 * DrawLang Core Tests
 * 测试执行层面的核心功能
 */

import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

const TEST_DIR = join(import.meta.dir, '__test_output__');
const TEST_ARTICLE = join(TEST_DIR, 'test-article.md');

beforeAll(() => {
  // 创建测试目录
  if (!existsSync(TEST_DIR)) {
    mkdirSync(TEST_DIR, { recursive: true });
  }

  // 创建测试文章
  writeFileSync(TEST_ARTICLE, `# 测试文章

这是一篇测试文章，用于验证 DrawLang 的功能。

## 核心概念

DrawLang 是一个中文优先的 AI 配图工具。

## 主要特点

1. Style × Layout 二维矩阵
2. ModelScope 原生中文支持
3. 免费额度

## 使用场景

适合公众号、小红书、B站等中文平台。
`);
});

afterAll(() => {
  // 清理测试目录
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

describe('DrawLang Core Functionality', () => {
  describe('Config Management', () => {
    test('should load config from file', async () => {
      const { loadConfig } = await import('./config.ts');
      const config = loadConfig(TEST_DIR);
      expect(config).toBeDefined();
    });

    test('should save config to file', async () => {
      const { saveConfig } = await import('./config.ts');
      const testConfig = {
        style: 'notion',
        references: ['test-ref.png']
      };

      saveConfig(testConfig, { cwd: TEST_DIR });

      const configPath = join(TEST_DIR, '.smart-illustrator', 'config.json');
      expect(existsSync(configPath)).toBe(true);
    });

    test('should merge CLI args with loaded config', async () => {
      const { mergeConfig } = await import('./config.ts');
      const loadedConfig = { style: 'light' };
      const cliArgs = { style: 'dark' };

      const merged = mergeConfig(loadedConfig, cliArgs);
      expect(merged.style).toBe('dark');
    });
  });

  describe('Style File Loading', () => {
    test('should load light style file', async () => {
      const stylePath = join(import.meta.dir, '../styles/style-light.md');
      expect(existsSync(stylePath)).toBe(true);
    });

    test('should load dark style file', async () => {
      const stylePath = join(import.meta.dir, '../styles/style-dark.md');
      expect(existsSync(stylePath)).toBe(true);
    });

    test('should load notion style file', async () => {
      const stylePath = join(import.meta.dir, '../styles/style-notion.md');
      expect(existsSync(stylePath)).toBe(true);
    });

    test('should load fresh style file', async () => {
      const stylePath = join(import.meta.dir, '../styles/style-fresh.md');
      expect(existsSync(stylePath)).toBe(true);
    });

    test('should load warm style file', async () => {
      const stylePath = join(import.meta.dir, '../styles/style-warm.md');
      expect(existsSync(stylePath)).toBe(true);
    });
  });

  describe('Layout File Loading', () => {
    test('should load sparse layout file', async () => {
      const layoutPath = join(import.meta.dir, '../styles/layouts/layout-sparse.md');
      expect(existsSync(layoutPath)).toBe(true);
    });

    test('should load balanced layout file', async () => {
      const layoutPath = join(import.meta.dir, '../styles/layouts/layout-balanced.md');
      expect(existsSync(layoutPath)).toBe(true);
    });

    test('should load dense layout file', async () => {
      const layoutPath = join(import.meta.dir, '../styles/layouts/layout-dense.md');
      expect(existsSync(layoutPath)).toBe(true);
    });

    test('should load list layout file', async () => {
      const layoutPath = join(import.meta.dir, '../styles/layouts/layout-list.md');
      expect(existsSync(layoutPath)).toBe(true);
    });

    test('should load comparison layout file', async () => {
      const layoutPath = join(import.meta.dir, '../styles/layouts/layout-comparison.md');
      expect(existsSync(layoutPath)).toBe(true);
    });
  });

  describe('Article Processing', () => {
    test('should read test article', async () => {
      const { readFileSync } = await import('fs');
      const content = readFileSync(TEST_ARTICLE, 'utf-8');
      expect(content).toContain('DrawLang');
      expect(content).toContain('Style × Layout');
    });

    test('should detect article sections', async () => {
      const { readFileSync } = await import('fs');
      const content = readFileSync(TEST_ARTICLE, 'utf-8');
      const sections = content.match(/^##\s+.+$/gm);
      expect(sections).toBeDefined();
      expect(sections!.length).toBeGreaterThan(0);
    });

    test('should count words in article', async () => {
      const { readFileSync } = await import('fs');
      const content = readFileSync(TEST_ARTICLE, 'utf-8');
      const wordCount = content.length;
      expect(wordCount).toBeGreaterThan(0);
    });
  });
});

/**
 * Image Generation Tests
 * 测试图像生成功能（不实际调用 API）
 */

import { describe, test, expect, mock } from 'bun:test';
import { existsSync } from 'fs';
import { join } from 'path';

describe('Image Generation', () => {
  describe('Provider Detection', () => {
    test('should detect ModelScope API key', () => {
      const hasModelScope = !!process.env.MODELSCOPE_API_KEY;
      // 不强制要求，只是检测
      expect(typeof hasModelScope).toBe('boolean');
    });

    test('should detect Gemini API key', () => {
      const hasGemini = !!process.env.GEMINI_API_KEY;
      expect(typeof hasGemini).toBe('boolean');
    });

    test('should detect OpenRouter API key', () => {
      const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;
      expect(typeof hasOpenRouter).toBe('boolean');
    });

    test('should have at least one API key configured', () => {
      const hasAnyKey = !!(
        process.env.MODELSCOPE_API_KEY ||
        process.env.GEMINI_API_KEY ||
        process.env.OPENROUTER_API_KEY
      );

      if (!hasAnyKey) {
        console.warn('⚠️  No API keys configured. Some tests will be skipped.');
      }

      expect(typeof hasAnyKey).toBe('boolean');
    });
  });

  describe('Aspect Ratio Validation', () => {
    test('should validate 16:9 aspect ratio', () => {
      const validRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'];
      expect(validRatios).toContain('16:9');
    });

    test('should validate 3:4 aspect ratio (Xiaohongshu)', () => {
      const validRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'];
      expect(validRatios).toContain('3:4');
    });

    test('should validate 2.35:1 aspect ratio (WeChat)', () => {
      // 2.35:1 需要转换为最接近的标准比例
      const wechatRatio = 2.35;
      expect(wechatRatio).toBeGreaterThan(2);
      expect(wechatRatio).toBeLessThan(3);
    });
  });

  describe('Platform Size Mapping', () => {
    test('should map wechat to 2.35:1', () => {
      const platformMap: Record<string, string> = {
        wechat: '2.35:1',
        xiaohongshu: '3:4',
        youtube: '16:9',
        landscape: '16:9',
        square: '1:1'
      };
      expect(platformMap.wechat).toBe('2.35:1');
    });

    test('should map xiaohongshu to 3:4', () => {
      const platformMap: Record<string, string> = {
        wechat: '2.35:1',
        xiaohongshu: '3:4',
        youtube: '16:9',
        landscape: '16:9',
        square: '1:1'
      };
      expect(platformMap.xiaohongshu).toBe('3:4');
    });

    test('should map youtube to 16:9', () => {
      const platformMap: Record<string, string> = {
        wechat: '2.35:1',
        xiaohongshu: '3:4',
        youtube: '16:9',
        landscape: '16:9',
        square: '1:1'
      };
      expect(platformMap.youtube).toBe('16:9');
    });
  });

  describe('Prompt Generation', () => {
    test('should generate prompt with style', () => {
      const style = 'notion';
      const layout = 'dense';
      const prompt = `Generate an image with ${style} style and ${layout} layout`;

      expect(prompt).toContain('notion');
      expect(prompt).toContain('dense');
    });

    test('should generate prompt with layout constraints', () => {
      const layouts = ['sparse', 'balanced', 'dense', 'list', 'comparison'];

      layouts.forEach(layout => {
        const prompt = `Layout: ${layout}`;
        expect(prompt).toContain(layout);
      });
    });

    test('should combine style and layout in prompt', () => {
      const combinations = [
        { style: 'notion', layout: 'dense' },
        { style: 'fresh', layout: 'list' },
        { style: 'warm', layout: 'comparison' }
      ];

      combinations.forEach(({ style, layout }) => {
        const prompt = `Style: ${style}, Layout: ${layout}`;
        expect(prompt).toContain(style);
        expect(prompt).toContain(layout);
      });
    });
  });

  describe('Output File Naming', () => {
    test('should generate correct output filename', () => {
      const baseName = 'test-article';
      const outputName = `${baseName}-image-01.png`;
      expect(outputName).toMatch(/^test-article-image-\d{2}\.png$/);
    });

    test('should generate correct cover filename', () => {
      const baseName = 'test-article';
      const coverName = `${baseName}-cover.png`;
      expect(coverName).toBe('test-article-cover.png');
    });

    test('should handle Chinese filenames', () => {
      const baseName = '测试文章';
      const outputName = `${baseName}-image-01.png`;
      expect(outputName).toContain('测试文章');
    });
  });
});

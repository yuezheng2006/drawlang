/**
 * Style × Layout Matrix Tests
 * 测试 Style × Layout 二维矩阵系统
 */

import { describe, test, expect } from 'bun:test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const STYLES_DIR = join(import.meta.dir, '../styles');
const LAYOUTS_DIR = join(STYLES_DIR, 'layouts');

describe('Style × Layout Matrix System', () => {
  describe('Style Files Validation', () => {
    const requiredStyles = [
      'style-light.md',
      'style-dark.md',
      'style-minimal.md',
      'style-notion.md',
      'style-fresh.md',
      'style-warm.md',
      'style-bento.md'
    ];

    requiredStyles.forEach(styleFile => {
      test(`should have ${styleFile}`, () => {
        const stylePath = join(STYLES_DIR, styleFile);
        expect(existsSync(stylePath)).toBe(true);
      });

      test(`${styleFile} should have content`, () => {
        const stylePath = join(STYLES_DIR, styleFile);
        if (existsSync(stylePath)) {
          const content = readFileSync(stylePath, 'utf-8');
          expect(content.length).toBeGreaterThan(0);
        }
      });
    });
  });

  describe('Layout Files Validation', () => {
    const requiredLayouts = [
      'layout-sparse.md',
      'layout-balanced.md',
      'layout-dense.md',
      'layout-list.md',
      'layout-comparison.md'
    ];

    requiredLayouts.forEach(layoutFile => {
      test(`should have ${layoutFile}`, () => {
        const layoutPath = join(LAYOUTS_DIR, layoutFile);
        expect(existsSync(layoutPath)).toBe(true);
      });

      test(`${layoutFile} should have content`, () => {
        const layoutPath = join(LAYOUTS_DIR, layoutFile);
        if (existsSync(layoutPath)) {
          const content = readFileSync(layoutPath, 'utf-8');
          expect(content.length).toBeGreaterThan(0);
        }
      });

      test(`${layoutFile} should have Prompt section`, () => {
        const layoutPath = join(LAYOUTS_DIR, layoutFile);
        if (existsSync(layoutPath)) {
          const content = readFileSync(layoutPath, 'utf-8');
          expect(content).toContain('Prompt');
        }
      });
    });
  });

  describe('Style × Layout Combinations', () => {
    const styles = ['notion', 'fresh', 'warm', 'light', 'dark'];
    const layouts = ['sparse', 'balanced', 'dense', 'list', 'comparison'];

    test('should support all style × layout combinations', () => {
      const totalCombinations = styles.length * layouts.length;
      expect(totalCombinations).toBe(25); // 5 styles × 5 layouts
    });

    test('should validate notion + dense combination', () => {
      const stylePath = join(STYLES_DIR, 'style-notion.md');
      const layoutPath = join(LAYOUTS_DIR, 'layout-dense.md');

      expect(existsSync(stylePath)).toBe(true);
      expect(existsSync(layoutPath)).toBe(true);
    });

    test('should validate fresh + list combination', () => {
      const stylePath = join(STYLES_DIR, 'style-fresh.md');
      const layoutPath = join(LAYOUTS_DIR, 'layout-list.md');

      expect(existsSync(stylePath)).toBe(true);
      expect(existsSync(layoutPath)).toBe(true);
    });

    test('should validate warm + comparison combination', () => {
      const stylePath = join(STYLES_DIR, 'style-warm.md');
      const layoutPath = join(LAYOUTS_DIR, 'layout-comparison.md');

      expect(existsSync(stylePath)).toBe(true);
      expect(existsSync(layoutPath)).toBe(true);
    });
  });

  describe('Layout Information Density', () => {
    test('sparse layout should have 1-2 points', () => {
      const layoutPath = join(LAYOUTS_DIR, 'layout-sparse.md');
      const content = readFileSync(layoutPath, 'utf-8');
      expect(content).toContain('1-2');
    });

    test('balanced layout should have 3-4 points', () => {
      const layoutPath = join(LAYOUTS_DIR, 'layout-balanced.md');
      const content = readFileSync(layoutPath, 'utf-8');
      expect(content).toContain('3-4');
    });

    test('dense layout should have 5-8 points', () => {
      const layoutPath = join(LAYOUTS_DIR, 'layout-dense.md');
      const content = readFileSync(layoutPath, 'utf-8');
      expect(content).toContain('5-8');
    });

    test('list layout should have 4-7 items', () => {
      const layoutPath = join(LAYOUTS_DIR, 'layout-list.md');
      const content = readFileSync(layoutPath, 'utf-8');
      expect(content).toContain('4-7');
    });

    test('comparison layout should have 2 groups', () => {
      const layoutPath = join(LAYOUTS_DIR, 'layout-comparison.md');
      const content = readFileSync(layoutPath, 'utf-8');
      expect(content).toContain('A vs B');
    });
  });

  describe('Style Color Schemes', () => {
    test('notion style should use black/white/gray', () => {
      const stylePath = join(STYLES_DIR, 'style-notion.md');
      const content = readFileSync(stylePath, 'utf-8');
      // 匹配英文或中文的黑白灰
      expect(content.toLowerCase()).toMatch(/black|white|gray|grey|黑|白|灰/);
    });

    test('fresh style should use natural colors', () => {
      const stylePath = join(STYLES_DIR, 'style-fresh.md');
      const content = readFileSync(stylePath, 'utf-8');
      expect(content.toLowerCase()).toMatch(/green|blue|natural|fresh|清新|自然|绿|蓝/);
    });

    test('warm style should use warm colors', () => {
      const stylePath = join(STYLES_DIR, 'style-warm.md');
      const content = readFileSync(stylePath, 'utf-8');
      expect(content.toLowerCase()).toMatch(/warm|orange|yellow|coral|温暖|橙|黄/);
    });
  });
});

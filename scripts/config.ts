/**
 * Configuration management for Smart Illustrator
 * Handles loading and saving style configurations
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname, resolve, isAbsolute } from 'path';
import { homedir } from 'os';

export interface Config {
  style?: string;
  references?: string[];
  watermark?: string;
}

const PROJECT_CONFIG_DIR = '.smart-illustrator';
const PROJECT_CONFIG_FILE = 'config.json';
const USER_CONFIG_DIR = join(homedir(), '.smart-illustrator');
const USER_CONFIG_FILE = join(USER_CONFIG_DIR, 'config.json');

/**
 * Load configuration from files
 * Priority: project-level > user-level > defaults
 */
export function loadConfig(cwd: string = process.cwd()): Config {
  const projectConfigPath = join(cwd, PROJECT_CONFIG_DIR, PROJECT_CONFIG_FILE);
  const userConfigPath = USER_CONFIG_FILE;

  let config: Config = {};

  // Load user-level config first
  if (existsSync(userConfigPath)) {
    try {
      const userConfig = JSON.parse(readFileSync(userConfigPath, 'utf-8'));
      config = { ...config, ...userConfig };
      console.log(`✓ Loaded user config: ${userConfigPath}`);
    } catch (error) {
      console.warn(`⚠ Failed to load user config: ${error}`);
    }
  }

  // Load project-level config (overrides user-level)
  if (existsSync(projectConfigPath)) {
    try {
      const projectConfig = JSON.parse(readFileSync(projectConfigPath, 'utf-8'));
      config = { ...config, ...projectConfig };
      console.log(`✓ Loaded project config: ${projectConfigPath}`);
    } catch (error) {
      console.warn(`⚠ Failed to load project config: ${error}`);
    }
  }

  // Resolve reference paths relative to project root (for project config) or user home (for user config)
  if (config.references && config.references.length > 0) {
    const baseDir = existsSync(projectConfigPath)
      ? cwd  // Project config: resolve relative to project root
      : USER_CONFIG_DIR;  // User config: resolve relative to user config dir

    config.references = config.references.map(ref => {
      // Handle ~ (home directory) expansion
      if (ref.startsWith('~/')) {
        return join(homedir(), ref.slice(2));
      }
      if (isAbsolute(ref)) {
        return ref;
      }
      return resolve(baseDir, ref);
    });
  }

  return config;
}

/**
 * Save configuration to file
 */
export function saveConfig(
  config: Config,
  options: { global?: boolean; cwd?: string } = {}
): void {
  const { global = false, cwd = process.cwd() } = options;

  let configPath: string;
  let configDir: string;

  if (global) {
    configPath = USER_CONFIG_FILE;
    configDir = USER_CONFIG_DIR;
  } else {
    configDir = join(cwd, PROJECT_CONFIG_DIR);
    configPath = join(configDir, PROJECT_CONFIG_FILE);
  }

  // Create directory if not exists
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
  }

  // Convert absolute reference paths to relative (for project-level config)
  const configToSave = { ...config };
  if (!global && configToSave.references && configToSave.references.length > 0) {
    configToSave.references = configToSave.references.map(ref => {
      if (isAbsolute(ref)) {
        // Try to make it relative to project root (cwd)
        const rel = relative(cwd, ref);
        // Only use relative path if it doesn't go outside the project
        if (!rel.startsWith('..') && !isAbsolute(rel)) {
          return rel;
        }
      }
      return ref;
    });
  }

  writeFileSync(configPath, JSON.stringify(configToSave, null, 2), 'utf-8');
  console.log(`✓ Saved ${global ? 'user' : 'project'} config: ${configPath}`);
}

/**
 * Merge command-line arguments with loaded config
 * CLI arguments take precedence
 */
export function mergeConfig(
  loadedConfig: Config,
  cliArgs: Partial<Config>
): Config {
  const merged: Config = { ...loadedConfig };

  // CLI args override config file
  if (cliArgs.style !== undefined) {
    merged.style = cliArgs.style;
  }

  if (cliArgs.references !== undefined && cliArgs.references.length > 0) {
    merged.references = cliArgs.references;
  }

  if (cliArgs.watermark !== undefined) {
    merged.watermark = cliArgs.watermark;
  }

  return merged;
}

// Helper: path.relative for cross-platform
function relative(from: string, to: string): string {
  // Simple implementation - for production use path.relative from 'path'
  const fromParts = from.split(/[/\\]/);
  const toParts = to.split(/[/\\]/);

  let i = 0;
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
    i++;
  }

  const upCount = fromParts.length - i;
  const remainingPath = toParts.slice(i).join('/');

  if (upCount === 0) {
    return remainingPath || '.';
  }

  return '../'.repeat(upCount) + remainingPath;
}

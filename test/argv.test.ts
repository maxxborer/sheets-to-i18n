import { describe, expect, it } from 'vitest';
import { parseArgs } from '../src/core/argv';

describe('parseArgs', () => {
  it('по умолчанию команда update', () => {
    const result = parseArgs(['node', 'cli']);

    expect(result.command).toBe('update');
  });

  it('парсит флаги и алиасы', () => {
    const argv = [
      'node',
      'cli',
      'update',
      '--config',
      './cfg.json',
      '--sheet',
      'Sheet1',
      '--range',
      'A:Z',
      '--out-dir',
      'public/locales',
      '--format',
      'ts',
    ];

    const result = parseArgs(argv);

    expect(result).toEqual({
      command: 'update',
      configPath: './cfg.json',
      sheetTitle: 'Sheet1',
      range: 'A:Z',
      outDir: 'public/locales',
      format: 'ts',
    });
  });

  it('игнорирует неизвестный формат', () => {
    const result = parseArgs(['node', 'cli', 'update', '--format', 'yaml']);

    expect(result.format).toBeUndefined();
  });
});

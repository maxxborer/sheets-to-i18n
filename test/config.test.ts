import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
// динамически импортируем core/config внутри тестов после установки env
import { setEnvDefaults } from './utils/env';

describe('config', () => {
  const envBackup = { ...process.env };
  let cwdBackup: string;
  let tmp: string;

  beforeEach(() => {
    process.env = { ...envBackup };
    cwdBackup = process.cwd();
    tmp = mkdtempSync(join(tmpdir(), 's2i-cfg-'));
    process.chdir(tmp);
    setEnvDefaults();
  });

  afterEach(() => {
    process.chdir(cwdBackup);
    rmSync(tmp, { recursive: true, force: true });
  });

  it('loadConfigFromEnv читает LOCALES переменные', async () => {
    const { loadConfigFromEnv } = await import('../src/core/config');
    const cfg = loadConfigFromEnv();

    expect(cfg.source.spreadsheetId).toBe('sheet-id');
    expect(cfg.output.directory).toBe('public/locales');
    expect(cfg.output.format).toBe('json');
  });

  it('loadUserConfig читает файл конфига', async () => {
    const path = join(tmp, 'sheets-to-i18n.config.json');

    writeFileSync(path, JSON.stringify({ source: { spreadsheetId: 'f' }, output: { directory: 'd', format: 'ts' } }));
    const { loadUserConfig } = await import('../src/core/config');
    const partial = loadUserConfig();

    expect(partial.output?.format).toBe('ts');
  });

  it('loadConfig объединяет env и файл + учитывает S2I_CONFIG', async () => {
    const custom = join(tmp, 'custom.json');

    writeFileSync(
      custom,
      JSON.stringify({
        source: { spreadsheetId: 'env-id' },
        output: { directory: 'dir', format: 'js' },
      }),
    );

    vi.stubEnv('S2I_CONFIG', custom);
    vi.resetModules();
    const { loadConfig } = await import('../src/core/config');
    const cfg = loadConfig();

    expect(cfg.source.spreadsheetId).toBe('env-id');
    expect(cfg.output).toEqual({ directory: 'dir', format: 'js', fileName: 'translation' });
  });

  it('loadConfig учитывает SHEETS_TO_I18N_FILE_NAME', async () => {
    process.env.GOOGLE_SHEETS_LOCALES_FILE_ID = 'env-id';
    process.env.GOOGLE_SHEETS_LOCALES_CLIENT_EMAIL = 'test@test.com';
    process.env.GOOGLE_SHEETS_LOCALES_PRIVATE_KEY = 'key';
    process.env.SHEETS_TO_I18N_FILE_NAME = 'messages';

    vi.resetModules();
    const { loadConfig } = await import('../src/core/config');
    const cfg = loadConfig();

    expect(cfg.output.fileName).toBe('messages');
  });
});

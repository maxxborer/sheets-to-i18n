import { describe, expect, it, vi } from 'vitest';
import { setEnvDefaults } from './utils/env';

const hoisted = vi.hoisted(() => ({
  writeSpy: vi.fn(),
}));

vi.mock('../src/core/config', () => ({
  loadConfig: () => ({
    source: { spreadsheetId: 'id', sheetTitle: 'Sheet1', range: undefined },
    output: { directory: '/tmp', format: 'json' },
  }),
}));

vi.mock('../src/core/googleSheets', () => ({
  getAccessToken: vi.fn().mockResolvedValue('t'),
  fetchSheetValues: vi.fn().mockResolvedValue([
    ['key', 'en'],
    ['a.b', 'x'],
  ]),
}));

vi.mock('../src/core/output', () => ({ writeTranslations: hoisted.writeSpy }));

describe('runUpdate', () => {
  it('валидирует env и вызывает пайплайн', async () => {
    setEnvDefaults();
    const { runUpdate } = await import('../src/index');

    await runUpdate(['node', 'cli', 'update']);
    expect(hoisted.writeSpy).toHaveBeenCalledOnce();
  });
});

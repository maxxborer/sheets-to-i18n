import { describe, expect, it, vi } from 'vitest';
import { fetchSheetValues, getAccessToken } from '../src/core/googleSheets';

vi.mock('google-auth-library', () => ({
  JWT: class {
    constructor(_: unknown) { }
    async getAccessToken() {
      return null as unknown as string; // заставим getAccessToken бросить в нашей обертке
    }
  },
}));

describe('googleSheets', () => {
  it('getAccessToken бросает при пустом токене', async () => {
    await expect(getAccessToken({ clientEmail: 'a@b', privateKey: 'k' })).rejects.toBeInstanceOf(Error);
  });

  it('fetchSheetValues бросает на ошибочном ответе', async () => {
    const fetchSpy = vi
      .spyOn(global, 'fetch' as never)
      .mockResolvedValue({ ok: false, status: 401, text: async () => 'err' } as never);

    await expect(fetchSheetValues({ spreadsheetId: 'id', range: 'A:Z' }, 't')).rejects.toThrow(
      'Google Sheets API error 401',
    );

    fetchSpy.mockRestore();
  });

  it('fetchSheetValues возвращает пустой массив при отсутствии values', async () => {
    const fetchSpy = vi
      .spyOn(global, 'fetch' as never)
      .mockResolvedValue({ ok: true, json: async () => ({}) } as never);
    const res = await fetchSheetValues({ spreadsheetId: 'id', range: 'A:Z' }, 't');

    expect(res).toEqual([]);
    fetchSpy.mockRestore();
  });
});

import { describe, expect, it, vi } from 'vitest';
import { error, info } from '../src/utils/logger';

describe('logger', () => {
  it('info проксирует в console.info', async () => {
    const { BASE_LOGGER_PREFIX } = await import('../src/utils/logger');
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});

    info('hello', 1, 2);
    expect(spy).toHaveBeenCalledWith(BASE_LOGGER_PREFIX, 'hello', 1, 2);
    spy.mockRestore();
  });

  it('error проксирует в console.error', async () => {
    const { BASE_LOGGER_PREFIX } = await import('../src/utils/logger');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    error('oops', new Error('e'));
    expect(spy).toHaveBeenCalledWith(BASE_LOGGER_PREFIX, 'oops', new Error('e'));
    spy.mockRestore();
  });
});

import { describe, expect, it, vi } from 'vitest';

const hoisted = vi.hoisted(() => ({ runSpy: vi.fn().mockResolvedValue(undefined) }));

vi.mock('../src/index', () => ({ runUpdate: hoisted.runSpy }));

describe('cli', () => {
  it('вызывает runUpdate при команде update', async () => {
    const original = process.argv;

    process.argv = ['node', 'cli', 'update'];
    await import('../src/cli');
    expect(hoisted.runSpy).toHaveBeenCalledOnce();
    process.argv = original;
  });
});

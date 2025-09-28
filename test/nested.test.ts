import { describe, expect, it } from 'vitest';
import { assignNestedValue } from '../src/utils/nested';

describe('assignNestedValue', () => {
  it('создает структуру и устанавливает значение по ключу с точками', () => {
    const target: Record<string, unknown> = {};

    assignNestedValue(target as never, 'a.b.c', 'x');
    expect(target).toEqual({ a: { b: { c: 'x' } } });
  });
});

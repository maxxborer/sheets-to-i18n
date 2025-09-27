import type { TranslationTree } from '../types';

export function assignNestedValue(target: { [key: string]: TranslationTree }, keyPath: string, value: string): void {
  const keys = keyPath.split('.');
  let cursor: { [key: string]: TranslationTree } = target;

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index] as string;
    const isLast = index === keys.length - 1;
    const next = cursor[key];

    if (isLast) {
      cursor[key] = value;

      return;
    }

    if (typeof next !== 'object' || next === null || typeof next === 'string') {
      cursor[key] = {};
    }
    cursor = cursor[key] as { [key: string]: TranslationTree };
  }
}

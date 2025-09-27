export const BASE_LOGGER_PREFIX = '[sheets-to-i18n]';

export function info(message: string, ...args: unknown[]): void {
  console.info(BASE_LOGGER_PREFIX, message, ...args);
}

export function error(message: string, ...args: unknown[]): void {
  console.error(BASE_LOGGER_PREFIX, message, ...args);
}

export const COMMANDS = {
  UPDATE: 'update',
} as const;

export const CONFIG_TOKENS = {
  CONFIG: 'CONFIG',
  SHEET: 'SHEET',
  RANGE: 'RANGE',
  OUT_DIR: 'OUT_DIR',
  FORMAT: 'FORMAT',
} as const;

export const CONFIG_TOKENS_LONG = {
  [CONFIG_TOKENS.CONFIG]: '--config',
  [CONFIG_TOKENS.SHEET]: '--sheet',
  [CONFIG_TOKENS.RANGE]: '--range',
  [CONFIG_TOKENS.OUT_DIR]: '--out-dir',
  [CONFIG_TOKENS.FORMAT]: '--format',
} as const;

export const CONFIG_TOKENS_SHORT = {
  [CONFIG_TOKENS.CONFIG]: '-c',
  [CONFIG_TOKENS.SHEET]: '-s',
  [CONFIG_TOKENS.RANGE]: '-r',
  [CONFIG_TOKENS.OUT_DIR]: '-o',
  [CONFIG_TOKENS.FORMAT]: '-f',
} as const;

export const FORMAT_OPTIONS = {
  JSON: 'json', // { ... }
  CJS: 'cjs', // module.exports = { ... }
  JS: 'js', // export default { ... }
  TS: 'ts', // export default { ... } with ts
} as const;

export const DEFAULT_OUTPUT_DIRECTORY = 'public/locales';
export const DEFAULT_FILE_NAME = 'translation';
export const DEFAULT_GOOGLE_JWT_SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

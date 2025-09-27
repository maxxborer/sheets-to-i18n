import { COMMANDS, CONFIG_TOKENS_LONG, CONFIG_TOKENS_SHORT, FORMAT_OPTIONS } from './constants';

export type TranslationTree = string | { [key: string]: TranslationTree };

export interface TranslationsByLocale {
  [locale: string]: TranslationTree;
}

export type Command = (typeof COMMANDS)[keyof typeof COMMANDS];

export type ConfigTokenLong = (typeof CONFIG_TOKENS_LONG)[keyof typeof CONFIG_TOKENS_LONG];
export type ConfigTokenShort = (typeof CONFIG_TOKENS_SHORT)[keyof typeof CONFIG_TOKENS_SHORT];
export type ConfigToken = ConfigTokenLong | ConfigTokenShort;

export type FormatOption = (typeof FORMAT_OPTIONS)[keyof typeof FORMAT_OPTIONS];

export interface CliArgs {
  command: Command;
  sheetTitle?: string;
  range?: string;
  outDir?: string;
  format?: FormatOption;
  configPath?: string;
}

export interface SheetsToI18nConfig {
  source: {
    spreadsheetId: string;
    sheetTitle?: string;
    range?: string;
  };
  output: {
    directory: string;
    format: FormatOption;
    fileName?: string;
  };
}

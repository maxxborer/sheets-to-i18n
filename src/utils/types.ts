import { COMMANDS, CONFIG_TOKENS_LONG, CONFIG_TOKENS_SHORT, FORMAT_OPTIONS } from '../constants';
import { Command, ConfigToken, ConfigTokenLong, ConfigTokenShort, FormatOption } from '../types';

export const isCommand = (command: string): command is Command => Object.values(COMMANDS).includes(command as Command);

export const isConfigTokenLong = (token: string): token is ConfigTokenLong =>
  Object.values(CONFIG_TOKENS_LONG).includes(token as ConfigTokenLong);
export const isConfigTokenShort = (token: string): token is ConfigTokenShort =>
  Object.values(CONFIG_TOKENS_SHORT).includes(token as ConfigTokenShort);
export const isConfigToken = (token: string): token is ConfigToken =>
  isConfigTokenLong(token) || isConfigTokenShort(token);

export const validateFormat = (format: string): format is FormatOption =>
  Object.values(FORMAT_OPTIONS).includes(format as FormatOption);

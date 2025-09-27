import { COMMANDS, CONFIG_TOKENS_LONG, CONFIG_TOKENS_SHORT } from '../constants';
import { CliArgs } from '../types';
import { isCommand, isConfigToken, validateFormat } from '../utils/types';

// eslint-disable-next-line sonarjs/cognitive-complexity
export function parseArgs(argv: string[]): CliArgs {
  const [, , command, ...rest] = argv;

  if (!command) {
    return { command: COMMANDS.UPDATE } as CliArgs;
  }

  if (!isCommand(command)) {
    return { command: COMMANDS.UPDATE } as CliArgs;
  }

  const result: CliArgs = { command };

  for (let index = 0; index < rest.length; index++) {
    const token = rest[index];
    const next = rest[index + 1];

    if (!token || !isConfigToken(token)) {
      continue;
    }

    if (CONFIG_TOKENS_LONG.CONFIG === token || CONFIG_TOKENS_SHORT.CONFIG === token) {
      result.configPath = next;
      index++;
      continue;
    }

    if (CONFIG_TOKENS_LONG.SHEET === token || CONFIG_TOKENS_SHORT.SHEET === token) {
      result.sheetTitle = next;
      index++;
      continue;
    }

    if (CONFIG_TOKENS_LONG.RANGE === token || CONFIG_TOKENS_SHORT.RANGE === token) {
      result.range = next;
      index++;
      continue;
    }

    if (CONFIG_TOKENS_LONG.OUT_DIR === token || CONFIG_TOKENS_SHORT.OUT_DIR === token) {
      result.outDir = next;
      index++;
      continue;
    }

    if (CONFIG_TOKENS_LONG.FORMAT === token || CONFIG_TOKENS_SHORT.FORMAT === token) {
      if (next && validateFormat(next)) {
        result.format = next;
        index++;
      }
      continue;
    }
  }

  return result;
}

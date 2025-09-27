#!/usr/bin/env node
import 'dotenv/config';
import { COMMANDS } from './constants';
import { error } from './utils/logger';
import { isCommand } from './utils/types';
import { runUpdate } from './index';

async function main(): Promise<void> {
  const command = process.argv[2] ?? COMMANDS.UPDATE;

  if (!isCommand(command)) {
    error('Unknown command:', command);
    process.exitCode = 1;

    return;
  }

  try {
    await runUpdate(process.argv);
  } catch (err) {
    error('Update failed:', err);
    process.exitCode = 1;
  }
}

void main();

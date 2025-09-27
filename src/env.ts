import { z } from 'zod';

export const EnvSchema = z.object({
  GOOGLE_SHEETS_LOCALES_FILE_ID: z.string().min(1, 'GOOGLE_SHEETS_LOCALES_FILE_ID обязателен'),
  GOOGLE_SHEETS_LOCALES_CLIENT_EMAIL: z.string().min(1, 'GOOGLE_SHEETS_LOCALES_CLIENT_EMAIL обязателен'),
  GOOGLE_SHEETS_LOCALES_PRIVATE_KEY: z.string().min(1, 'GOOGLE_SHEETS_LOCALES_PRIVATE_KEY обязателен'),
  SHEETS_TO_I18N_CONFIG: z.string().optional(),
  S2I_CONFIG: z.string().optional(),
  SHEETS_TO_I18N_FILE_NAME: z.string().optional(),
  S2I_FILE_NAME: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;
export const ENV: Env = EnvSchema.parse(process.env);

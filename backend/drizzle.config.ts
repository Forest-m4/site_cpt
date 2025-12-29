import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/lib/infrastructure/db/schema.ts',
  out: './src/lib/infrastructure/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

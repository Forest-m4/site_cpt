import { Pool } from 'pg';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const db = drizzle(pool) as PostgresJsDatabase;

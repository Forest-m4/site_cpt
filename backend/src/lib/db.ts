import { Pool } from 'pg';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db: PostgresJsDatabase = drizzle(pool);

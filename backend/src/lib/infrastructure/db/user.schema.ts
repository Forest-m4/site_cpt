import { pgTable, serial, varchar, text, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('user_role', ['reader', 'author']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  role: roleEnum('role').notNull(),
});

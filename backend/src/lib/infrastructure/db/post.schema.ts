import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});

import {
  pgTable,
  serial,
  integer,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { posts } from './post.schema';

export const likes = pgTable(
  'likes',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex('likes_user_post_unique').on(table.userId, table.postId),
  ],
);

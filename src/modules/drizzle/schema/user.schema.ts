import { relations } from 'drizzle-orm';
import { serial, pgTable, varchar, integer } from 'drizzle-orm/pg-core';
import { roles } from './role.schema';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name', { length: 50 }).notNull(),
  last_name: varchar('last_name', { length: 50 }).notNull(),
  username: varchar('username', { length: 50 }),
  email: varchar('email', { length: 50 }).notNull(),
  password: varchar('password', { length: 100 }).notNull(),
  role_id: integer('role_id').references(() => users.id),
});

export const userRelation = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
}));

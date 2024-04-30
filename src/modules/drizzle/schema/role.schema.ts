import { serial, pgTable, varchar } from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50, enum: ['user', 'admin'] }),
});

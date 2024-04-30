import { serial, pgTable, varchar } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});

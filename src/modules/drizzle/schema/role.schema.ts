import { serial, pgTable, varchar } from 'drizzle-orm/pg-core';
import { ROLES } from '../interfaces/role.interfaces';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50, enum: [ROLES.ADMIN, ROLES.USER] }),
});

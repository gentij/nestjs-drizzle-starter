import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../schema';
import { ROLES } from '../interfaces/role.interfaces';

export const seedRoles = async (drizzle: PostgresJsDatabase<typeof schema>) => {
  const { roles } = schema;
  const data: (typeof roles.$inferSelect)[] = [
    {
      id: 0,
      name: ROLES.ADMIN,
    },
    {
      id: 1,
      name: ROLES.USER,
    },
  ];

  await drizzle.insert(schema.roles).values(data);
};

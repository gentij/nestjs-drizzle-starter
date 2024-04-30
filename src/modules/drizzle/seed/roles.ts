import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../schema';

export const seedRoles = async (drizzle: PostgresJsDatabase<typeof schema>) => {
  const { roles } = schema;
  const data: (typeof roles.$inferSelect)[] = [
    {
      id: 0,
      name: 'admin',
    },
    {
      id: 1,
      name: 'user',
    },
  ];

  await drizzle.insert(schema.roles).values(data);
};

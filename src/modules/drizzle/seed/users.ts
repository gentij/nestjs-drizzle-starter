import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../schema';

export const seedUsers = async (drizzle: PostgresJsDatabase<typeof schema>) => {
  const { users } = schema;
  const data: (typeof users.$inferSelect)[] = [
    {
      id: 0,
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@user.com',
      username: 'admin',
      role_id: 0,
      password: 'pec',
    },
  ];

  await drizzle.insert(schema.users).values(data);
  console.log('USERS SEEDED');
};

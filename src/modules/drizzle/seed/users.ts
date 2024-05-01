import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../schema';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@app/core/constants/auth.constants';

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
      password: await bcrypt.hash('Admin1234!', SALT_ROUNDS),
    },
  ];

  await drizzle.insert(schema.users).values(data);
  console.log('USERS SEEDED');
};

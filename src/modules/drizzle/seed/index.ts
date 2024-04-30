import postgres from 'postgres';
import { drizzle as drizzlePgJs } from 'drizzle-orm/postgres-js';
import * as dotenv from 'dotenv';
dotenv.config();

import * as schema from '../schema';
import { seedRoles } from './roles';
import { seedUsers } from './users';

(async () => {
  const client = postgres(process.env.DATABASE_URL);

  const _drizzle = drizzlePgJs(client, { schema: schema });

  await seedRoles(_drizzle);
  await seedUsers(_drizzle);
  process.exit(1);
})();

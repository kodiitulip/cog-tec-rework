import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

config({ path: '.env.local' });

const client = postgres(process.env.ADMIN_DATABASE_URL!, { prepare: false });
export const db = drizzle({ client, schema });

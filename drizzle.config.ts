import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({ path: '.env.local' });

const drizzleConfig: Config = {
  schema: './db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.ADMIN_DATABASE_URL!,
  },
};

export default drizzleConfig;

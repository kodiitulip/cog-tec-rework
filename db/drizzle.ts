import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { createClient } from '@/lib/supabase/server';
import { DrizzleConfig } from 'drizzle-orm';
import { createDrizzle, decode } from './jwt';

config({ path: '.env.local' });

const conf = {
  schema,
  casing: 'snake_case',
} satisfies DrizzleConfig<typeof schema>;

// ByPass RLS
export const admin = drizzle({ client: postgres(process.env.ADMIN_DATABASE_URL!, { prepare: false }), ...conf });

// RLS Protected
export const client = drizzle({ client: postgres(process.env.DATABASE_URL!, { prepare: false }), ...conf });

export const createDrizzleSupabaseClient = async () => {
  const {
    data: { session },
  } = await (await createClient()).auth.getSession();
  return createDrizzle(decode(session?.access_token ?? ''), { admin, client });
};

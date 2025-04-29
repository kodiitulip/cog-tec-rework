import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { createClient } from '@/lib/supabase/server';
import { createDrizzle } from './db-client';
import { decode } from './jwt';
import { DrizzleConfig } from 'drizzle-orm';

const config = {
  casing: 'snake_case',
  schema,
} satisfies DrizzleConfig<typeof schema>;

// ByPass RLS
const admin = drizzle({
  client: postgres(process.env.ADMIN_DATABASE_URL!, { prepare: false }),
  ...config,
});
// Protected by RLS
const client = drizzle({
  client: postgres(process.env.DATABASE_URL!, { prepare: false }),
  ...config,
});

// export const db = drizzle({ client, schema });

export async function createDrizzleSupabaseClient() {
  const {
    data: { session },
  } = await (await createClient()).auth.getSession();
  return createDrizzle(decode(session?.access_token ?? ''), { admin, client });
}

import { userRoles } from '@/db/schema';
import { admin, client } from '@/db/drizzle';
import { createClient } from './supabase/server';
import { eq } from 'drizzle-orm';

export const getIsAdmin = async () => {
  const { auth } = await createClient();

  const { data, error } = await auth.getUser();
  if (error) return false;

  const {
    user: { id: userId },
  } = data;
  if (!userId) return false;

  const b = await client.query.userRoles.findFirst({
    where: eq(userRoles.userId, userId),
  });

  if (!b) return false;

  const user = await admin.query.userRoles.findFirst({
    where: eq(userRoles.userId, userId),
  });

  if (!user) return false;

  return b.role === 'ADMIN';
};

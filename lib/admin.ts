import { userRoles } from '@/db/schema';
import { admin } from '@/db/drizzle';
import { createClient } from './supabase/server';
import { and, eq } from 'drizzle-orm';

// const ALLOWED_IDS = ['0dd14f2b-fa28-47ee-8801-857ddd216f28', 'c0d89e4c-f233-4ab0-a71c-a543f45b1ae1'];

export const getIsAdmin = async () => {
  const { auth } = await createClient();

  const { data, error } = await auth.getUser();
  if (error) return false;

  const {
    user: { id: userId },
  } = data;
  if (!userId) return false;

  const a = admin.query.userRoles.findFirst({
    where: and(eq(userRoles.userId, userId), eq(userRoles.roleId, 1)),
  });
  return a !== null;
};

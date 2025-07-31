import { createClient } from './supabase/server';

const ALLOWED_IDS = ['0dd14f2b-fa28-47ee-8801-857ddd216f28'];

export const getIsAdmin = async () => {
  const { auth } = await createClient();

  const { data, error } = await auth.getUser();
  if (error) return false;

  const {
    user: { id: userId },
  } = data;
  if (!userId) return false;

  return ALLOWED_IDS.indexOf(userId) !== -1;
};

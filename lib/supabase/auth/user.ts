'use server';

import { createClient } from '../server';

export const getCurrentUserName = async () => {
  const { auth } = await createClient();
  const {
    data: { user },
  } = await auth.getUser();
  if (user) return user.user_metadata['user_name'] as string;
  return 'user';
};

export const getCurrentUserAvatarUrl = async () => {
  const { auth } = await createClient();
  const {
    data: { user },
  } = await auth.getUser();
  if (user) return user.user_metadata['avatar_url'] as string;
  return '/kenney/shape-characters/PNG/Default/blue_body_circle.png';
};

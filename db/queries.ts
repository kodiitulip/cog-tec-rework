import { cache } from 'react';
import { db } from '@/db/drizzle';

export const getCourses = cache(async () => {
  const data = await db.query.coursesTable.findMany({
    orderBy: ({ id }, { asc }) => [asc(id)],
  });
  return data;
});

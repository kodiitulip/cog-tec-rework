import { NextResponse } from 'next/server';
import { admin } from '@/db/drizzle';
import { userProgress } from '@/db/schema';
import { getIsAdmin } from '@/lib/admin';
import { and, inArray, SQL } from 'drizzle-orm';

type Fields = 'userId' | 'userName' | 'activeCourseId' | 'activeLessonId';
type Operators = 'asc' | 'desc';

export const GET = async (request: Request) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(request.url);

  const [fi, op]: string[] = JSON.parse(searchParams.get('sort') || '["userId", "ASC"]');
  const sort: [Fields, Operators] = [fi as Fields, op.toLowerCase() as Operators];
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const filters: SQL[] = [];

  for (const col in filter) {
    if (filter[col] instanceof Array) filters.push(inArray(userProgress[col as Fields], filter[col]));
  }

  const data = await admin.query.userProgress.findMany({
    orderBy: (fields, operators) => {
      const operator = operators[sort[1]];
      const field = fields[sort[0]];
      return [operator(field)];
    },
    where: and(...filters),
    columns: {
      userName: true,
      userImageSrc: true,
      hearts: true,
      points: true,
      rankHidden: true,
    },
  });
  return NextResponse.json(data);
};

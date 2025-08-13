import { NextResponse } from 'next/server';
import { admin } from '@/db/drizzle';
import { getIsAdmin } from '@/lib/admin';

type Fields = 'userId' | 'userName' | 'activeCourseId' | 'activeLessonId';
type Operators = 'asc' | 'desc';

export const GET = async (request: Request) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(request.url);

  const [fi, op]: string[] = JSON.parse(searchParams.get('sort') || '["userId", "ASC"]');
  const sort: [Fields, Operators] = [fi as Fields, op.toLowerCase() as Operators];

  const data = await admin.query.userProgress.findMany({
    orderBy: (fields, operators) => {
      const operator = operators[sort[1]];
      const field = fields[sort[0]];
      return [operator(field)];
    },
  });
  return NextResponse.json(data);
};

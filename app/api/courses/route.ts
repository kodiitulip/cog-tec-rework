import { NextResponse } from 'next/server';
import { admin } from '@/db/drizzle';
import { getIsAdmin } from '@/lib/admin';
import { courses } from '@/db/schema';
import { and, inArray, SQL } from 'drizzle-orm';

type Fields = 'id' | 'title' | 'imageSrc';
type Operators = 'asc' | 'desc';

export const GET = async (request: Request) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(request.url);

  const [fi, op]: string[] = JSON.parse(searchParams.get('sort') || '["id", "ASC"]');
  const sort: [Fields, Operators] = [fi as Fields, op.toLowerCase() as Operators];
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const filters: SQL[] = [];

  for (const col in filter) {
    if (filter[col] instanceof Array) filters.push(inArray(courses[col as Fields], filter[col]));
  }

  const data = await admin.query.courses.findMany({
    orderBy: (fields, operators) => {
      const operator = operators[sort[1]];
      const field = fields[sort[0]];
      return [operator(field)];
    },
    where: and(...filters),
  });
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();

  const data = await admin
    .insert(courses)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};

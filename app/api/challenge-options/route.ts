import { NextResponse } from 'next/server';
import { admin } from '@/db/drizzle';
import { getIsAdmin } from '@/lib/admin';
import { challengeOptions } from '@/db/schema';

type Fields = 'id' | 'challengeId' | 'text' | 'correct' | 'imageSrc';
type Operators = 'asc' | 'desc';

export const GET = async (request: Request) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(request.url);

  const range: number[] = JSON.parse(searchParams.get('range') || '[0,9]');
  const [fi, op]: string[] = JSON.parse(searchParams.get('sort') || '["id", "ASC"]');
  const sort: [Fields, Operators] = [fi as Fields, op.toLowerCase() as Operators];

  const data = await admin.query.challengeOptions.findMany({
    offset: range[0],
    limit: range[1] - range[0] + 1,
    orderBy: (fields, operators) => {
      const operator = operators[sort[1]];
      const field = fields[sort[0]];
      return [operator(field)];
    },
  });
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();

  const data = await admin
    .insert(challengeOptions)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};

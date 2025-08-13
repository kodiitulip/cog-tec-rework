import { NextResponse } from 'next/server';
import { admin } from '@/db/drizzle';
import { getIsAdmin } from '@/lib/admin';
import { units } from '@/db/schema';

type Fields = 'id' | 'title' | 'description' | 'courseId' | 'order' | 'imageSrc';
type Operators = 'asc' | 'desc';

export const GET = async (request: Request) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(request.url);

  const [fi, op]: string[] = JSON.parse(searchParams.get('sort') || '["id", "ASC"]');
  const sort: [Fields, Operators] = [fi as Fields, op.toLowerCase() as Operators];

  const data = await admin.query.units.findMany({
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
    .insert(units)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};

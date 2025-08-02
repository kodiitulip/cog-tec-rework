import { NextResponse } from 'next/server';
import { client } from '@/db/drizzle';
import { getIsAdmin } from '@/lib/admin';
import { challengeOptions } from '@/db/schema';

export const GET = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const data = await client.query.challengeOptions.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();

  const data = await client
    .insert(challengeOptions)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};

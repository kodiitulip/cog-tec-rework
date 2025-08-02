import { client } from '@/db/drizzle';
import { challengeOptions } from '@/db/schema';
import { getIsAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: Promise<{ id: number }> }) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { id } = await params;

  const data = await client.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (req: Request, { params }: { params: Promise<{ id: number }> }) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { id } = await params;

  const body = await req.json();

  const data = await client
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request, { params }: { params: Promise<{ id: number }> }) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { id } = await params;

  const data = await client.delete(challengeOptions).where(eq(challengeOptions.id, id)).returning();

  return NextResponse.json(data[0]);
};

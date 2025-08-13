import { admin } from '@/db/drizzle';
import { userRoles } from '@/db/schema';
import { getIsAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async (_req: Request, { params }: { params: Promise<{ id: number }> }) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { id } = await params;

  const data = await admin.query.userRoles.findFirst({
    where: eq(userRoles.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (req: Request, { params }: { params: Promise<{ id: number }> }) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { id } = await params;

  const body = await req.json();

  const data = await admin
    .update(userRoles)
    .set({
      ...body,
    })
    .where(eq(userRoles.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request, { params }: { params: Promise<{ id: number }> }) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) return new NextResponse('Unauthorized', { status: 401 });

  const { id } = await params;

  const data = await admin.delete(userRoles).where(eq(userRoles.id, id)).returning();

  return NextResponse.json(data[0]);
};

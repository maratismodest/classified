import { getUserById } from '@/prisma/services/users';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const res = await getUserById(Number(params.id));
  return NextResponse.json(res);
}

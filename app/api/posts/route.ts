import getBooleanUndefinded from '@/utils/getBooleanOrUndefined';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import cleanObject from '@/utils/cleanObject';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: NextResponse) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const size = Number(searchParams.get('size'));
  const page = Number(searchParams.get('page'));
  const userId = Number(searchParams.get('userId'));
  const categoryId = Number(searchParams.get('categoryId'));
  const _published = searchParams.get('published');
  const published = _published ? Boolean(_published) : null;
  const search = searchParams.get('search');
  const _furnished = searchParams.get('furnished');
  const furnished = _furnished && getBooleanUndefinded(_furnished);
  const _rooms = searchParams.get('rooms');
  const rooms =
    _rooms && Array.isArray(JSON.parse(_rooms)) ? (JSON.parse(_rooms) as number[]) : null;

  const min = Number(searchParams.get('min'));
  const max = Number(searchParams.get('max'));

  const options = cleanObject({
    size,
    page,
    categoryId,
    userId,
    published,
    search,
    furnished,
    rooms,
    min,
    max,
  });
  const response = await fetchPosts(options);
  return NextResponse.json(response);
}

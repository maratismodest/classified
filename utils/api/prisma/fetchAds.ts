'use server';
import prisma from '@/lib/prisma';
import { Post } from '@prisma/client';

export interface GetPostsParams {
  size: number;
  page: number;
  userId: number;
  categoryId: number;
  published: boolean;
  search: string;
  furnished: boolean;
  rooms: number[];
  min: number;
  max: number;
}

export default async function fetchPosts(params: Partial<GetPostsParams>): Promise<Post[]> {
  const { size = 20, page = 0, categoryId, userId, published, furnished, rooms, min, max } = params;

  const posts = await prisma.post.findMany({
    skip: size * page,
    take: params.size,
    where: {
      categoryId,
      userId,
      published,
      furnished,
      description: {
        search: params.search && params.search + ':*',
      },
      rooms: rooms && {
        in: rooms,
      },
      price: {
        gte: min,
        lte: max,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

// const result =
//   await prisma.$queryRaw`SELECT * FROM "Post" WHERE to_tsvector('russian', "Post"."title") @@ to_tsquery('russian', ${params.search + ':*'});`;
// console.log('result', result);
//
// return result;

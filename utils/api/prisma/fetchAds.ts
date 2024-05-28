'use server';
import prisma from '@/lib/prisma';
import { Post } from '@prisma/client';

export interface GetPostsParams {
  size: number;
  page: number;
  userId: string;
  categoryId: number;
  published: boolean;
  search?: string;
}

export default async function fetchPosts(params: Partial<GetPostsParams>): Promise<Post[]> {
  const { size = 20, page = 0, categoryId, userId, published } = params;

  const posts = await prisma.post.findMany({
    skip: size * page,
    take: params.size,
    where: {
      categoryId,
      userId,
      published,
      description: {
        search: params.search && params.search + ':*',
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

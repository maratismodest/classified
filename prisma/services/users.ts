import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export function getAllUsers(): Promise<User[]> {
  return prisma.user
    .findMany
    // { include: { bans: true } }
    ();
}

export function loginUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export function getUserById(id: number) {
  try {
    return prisma.user.findUnique({
      where: {
        id,
      },
      // include: {
      //   bans: true,
      // },
    });
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}

// export function getArticleBySlug(slug: string) {
//   try {
//     return prisma.article.findUnique({ where: { slug } });
//   } catch (e) {
//     console.error(JSON.stringify(e));
//   }
// }

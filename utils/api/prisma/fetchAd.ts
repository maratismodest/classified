'use server';
import prisma from '@/lib/prisma';

export default async function fetchAd(id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: {id},
      include: {
        user: true,
      },
    });
    return post;
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}

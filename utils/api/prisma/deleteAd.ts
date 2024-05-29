'use server';
import prisma from '@/lib/prisma';
import { getNameFromUrl } from '@/modules/PostModule/ImagesModule/ImagesModulePreview';
import deleteImageByFilename from '@/utils/api/backend/deleteImageByFilename';

export default async function deleteAd(postId: number) {
  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  const _images = post.images.split('||');
  console.log('_images', _images);

  _images.map(async image => {
    const filename = getNameFromUrl(image);
    if (filename) {
      const numFruit = await deleteImageByFilename(filename);
      return numFruit;
    }
  });

  return post;
}

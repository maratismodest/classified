import updatePostPrisma from '@/utils/api/prisma/updatePost';
import { routes } from '@/utils/constants';
import { Post } from '@prisma/client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const success = {
  edit: 'Объявление отредактировано!',
  archive: 'Объявление в архиве!',
};

const errors = {
  noCase: 'Нет таких значений',
};

enum ItemModalText {
  edit = 'Редактировать объявление?',
  archive = 'Объявление не актуально?',
}

const handleArchive = async (post: Post) => {
  try {
    const unpublished = await updatePostPrisma({ ...post, published: false });
    console.log('unpublished', unpublished);
    const refetchButton = document.getElementById('refetch-posts');
    if (refetchButton) {
      console.log('refetchButton', refetchButton);
      refetchButton.click();
    }
    alert(success.archive);
  } catch (e) {
    console.error('archive', e);
  }
};

const handleEdit = async (post: Post, router: AppRouterInstance) => {
  try {
    router.push(routes.edit + '/' + post.id);
  } catch (e) {
    console.error('edit', e);
  }
};

export { success, errors, ItemModalText, handleArchive, handleEdit };

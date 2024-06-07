import { defaultSearchValues } from '@/modules/PostModule/yup';
import Main from '@/pages-lib/main';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import { getMaxPrice } from '@/utils/price/getMaxPrice';
import { getMinPrice } from '@/utils/price/getMinPrice';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const revalidate = 300;

export default async function Home() {
  const { t } = useTranslation('common');
  const initialPosts = await fetchPosts({ published: true, size: 1000 });

  if (initialPosts.length === 0) {
    return <h1>{t('No posts')}</h1>;
  }

  const _min = getMinPrice(initialPosts);
  const _max = getMaxPrice(initialPosts);

  const defaultValues = {
    ...defaultSearchValues,
    min: _min,
    max: _max,
    minPrice: _min,
    maxPrice: _max,
  };

  return <Main initialPosts={initialPosts} defaultValues={defaultValues} />;
}

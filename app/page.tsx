import Main from '@/pages-lib/main';
import { getAllCategories } from '@/prisma/services/categories';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import mapCategories from '@/utils/mapCategories';
import React from 'react';

export const revalidate = 300;

export default async function Home() {
  const initialPosts = await fetchPosts({ published: true });
  const sortedPosts = initialPosts.sort((a, b) => a.price - b.price);
  const categories = await getAllCategories();
  if (sortedPosts.length === 0) {
    return <h1>No posts</h1>;
  }
  return (
    <>
      <Main
        minPrice={sortedPosts[0].price}
        maxPrice={sortedPosts[sortedPosts.length - 1].price}
        categories={categories.map(x => ({ value: x.id.toString(), label: x.label }))}
      />
    </>
  );
}

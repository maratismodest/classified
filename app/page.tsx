import Main from '@/pages-lib/main';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import React from 'react';

export const revalidate = 300;

export default async function Home() {
  const initialPosts = await fetchPosts({ published: true });
  const sortedPosts = initialPosts.sort((a, b) => a.price - b.price);
  return (
    <>
      <Main minPrice={sortedPosts[0].price} maxPrice={sortedPosts[sortedPosts.length - 1].price} />
    </>
  );
}

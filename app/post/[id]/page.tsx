import PostPage from '@/pages-lib/post/PostPage';
import Price from '@/components/Price';
import ShareButton from '@/pages-lib/post/ShareButton';
import { getAllCategories } from '@/prisma/services/categories';
import buttonStyles from '@/styles/buttonStyles';
import fetchAd from '@/utils/api/prisma/fetchAd';
import fetchAds from '@/utils/api/prisma/fetchAds';
import { routes } from '@/utils/constants';
import mapCategories from '@/utils/mapCategories';
import clsx from 'clsx';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

const DynamicLeafletMap = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
});

interface AdPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const posts = await fetchAds({ size: 1000, published: true });

  return posts.map(({ id }) => ({ id: String(id) }));
}

export const revalidate = 3600;

export default async function Post({ params: { id } }: AdPageProps) {
  const post = await fetchAd(Number(id));
  const _categories = await getAllCategories();
  const categories = mapCategories(_categories);

  if (!post || categories.length === 0) {
    return notFound();
  }
  if (!post) {
    return (
      <div>
        <h1>Нет объявления!</h1>
        <Link href={routes.main}>На главную</Link>
      </div>
    );
  }

  const {
    price,
    description,
    rooms,
    userId,
    meters,
    longitude,
    latitude,
    createdAt,
    furnished,
    address,
    categoryId,
  } = post;

  const properties = [
    // {
    //   label: 'адрес',
    //   value: address,
    // },
    {
      label: 'количество комнат',
      value: rooms,
    },
    {
      label: 'площадь (кв.м)',
      value: meters,
    },
    {
      label: 'мебелирована',
      value: furnished ? 'да' : 'нет',
    },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <PostPage post={post} />
      <h1>{rooms}-комнатная квартира</h1>
      <p>Категория: {categories.find(x => x.value === categoryId)?.label}</p>
      <Price price={price} />
      <p>Адрес: {address}</p>
      <hr />
      <p className="break-words">{description}</p>

      <ul className="grid grid-cols-1 divide-y rounded border">
        {properties.map(({ value, label }) => (
          <li key={label} className="grid grid-cols-2 divide-x">
            <h5 className="p-1">{label}</h5>
            <p className="truncate p-1 text-right">{value}</p>
          </li>
        ))}
      </ul>
      <time className="mt-5">Опубликовано: {dayjs(createdAt).format('DD.MM.YYYY')}</time>

      <p>Позвонить автору</p>
      <a href="tel:123-456-7890" target="_blank" className={clsx(buttonStyles())}>
        123-456-7890
      </a>

      <Link href={routes.users + '/' + userId} className={clsx(buttonStyles(), 'mt-4 !block')}>
        Все объявления автора
      </Link>
      {/*<ShareButton post={post} />*/}
      <div className="bg-white-700 mx-auto my-5 h-[240px] w-full">
        <DynamicLeafletMap posts={[post]} center={[Number(latitude), Number(longitude)]} />
      </div>
    </div>
  );
}

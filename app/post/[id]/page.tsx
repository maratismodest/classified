import PostPage from "@/components/PostPage";
import Price from "@/components/Price";
import {getAllCategories} from "@/prisma/services/categories";
import buttonStyles from "@/styles/buttonStyles";
import fetchAd from "@/utils/api/prisma/fetchAd";
import fetchAds from "@/utils/api/prisma/fetchAds";
import {routes} from "@/utils/constants";
import mapCategories from "@/utils/mapCategories";
import clsx from "clsx";
import Link from "next/link";
import {notFound} from "next/navigation";
import React from 'react';

interface AdPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const posts = await fetchAds({size: 1000, published: true});

  return posts.map(({id}) => ({id: String(id)}));
}

export const revalidate = 3600;

export default async function Post({params: {id}}: AdPageProps) {
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
    )
  }

  const {price, description, rooms} = post

  const properties = [
    {
      label: 'количество комнат',
      value: rooms,
    }
  ]
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <PostPage post={post}/>
      <h1>{description}</h1>
      <Price price={price}/>
      <hr/>
      <p className="break-words">{description}</p>

      <ul className='grid grid-cols-1 border divide-y'>
        {properties.map(({value, label}) =>
          <li key={label} className='grid grid-cols-2 divide-x'>
            <h5 className='p-1'>{label}</h5>
            <p className='p-1 text-right'>{value}</p>
          </li>)}
      </ul>
      {/*<time className="mt-5">Опубликовано: {dayjs(createdAt).format('DD.MM.YYYY')}</time>*/}

      <p>Позвонить автору</p>
      <a
        href="tel:123-456-7890"
        target="_blank"
        className={clsx(
          buttonStyles())}
      >
        123-456-7890
      </a>


      {/*<Link href={routes.users + '/' + userId} className={clsx(buttonStyles(), 'mt-4 !block')}>*/}
      {/*  Все объявления автора*/}
      {/*</Link>*/}
      {/*<ShareButton post={post}/>*/}
    </div>

  );
};

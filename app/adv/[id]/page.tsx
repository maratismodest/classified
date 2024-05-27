import PostPage from "@/components/PostPage";
import Price from "@/components/Price";
import apartments from "@/state";
import buttonStyles from "@/styles/buttonStyles";
import clsx from "clsx";
import Link from "next/link";
import React from 'react';

interface AdPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const _apartments = apartments

  return _apartments.map(({id}) => ({id: id.toString()}));
}

const AdvPage = ({params: {id}}: AdPageProps) => {
  const apartment = apartments.find(x => x.id.toString() === id)
  if (!apartment) {
    return (
      <div>
        <h1>Нет объявления!</h1>
        <Link href={'/'}>На главную</Link>
      </div>
    )
  }

  const {title, price, description, properties} = apartment
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <PostPage post={apartment}/>
      <h1>{title}</h1>
      <Price price={price}/>
      <hr/>
      <p className="break-words">{description}</p>

      <ul className='grid grid-cols-1 border divide-y'>
        {Object.entries(properties).map(([key,value]) =>
        <li key={key} className='grid grid-cols-2 divide-x'>
          <h5 className='p-1'>{key}</h5>
          <p className='p-1 text-right'>{typeof value === 'boolean' ? value === true ? 'да' : 'нет'  : value}</p>
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

export default AdvPage;

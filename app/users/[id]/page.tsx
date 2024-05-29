import Posts from '@/components/Posts';
import { getUserById } from '@/prisma/services/users';
import buttonStyles from '@/styles/buttonStyles';
import { GetIdPath } from '@/types';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import fetchUsers from '@/utils/api/prisma/fetchUsers';
import { emailLink } from '@/utils/constants';
import { getPersonJsonLd } from '@/utils/jsonLd';
import clsx from 'clsx';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const users = await fetchUsers();

  return users.map(user => ({
    id: user.id.toString(),
  }));
}

export async function generateMetadata({ params: { id } }: GetIdPath): Promise<Metadata | null> {
  const userId = Number(id);
  const user = await getUserById(userId);
  if (!user) {
    return null;
  }
  return {
    title: `Пользователь ${user.email}`,
    description: `Пользователь ${user.name}`,
    // robots: {
    //   index: false,
    //   follow: true,
    // },
  };
}

export const revalidate = 86400;

export default async function PublicProfile<NextPage>({ params: { id } }: GetIdPath) {
  const userId = Number(id);
  const user = await getUserById(userId);
  if (!user) {
    return notFound();
  }
  const posts = await fetchPosts({ userId });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonJsonLd(user)) }}
      />
      <h1>Профиль пользователя</h1>
      <p>
        Количество объявлений: <span>{posts.length}</span>
      </p>
      <Posts posts={posts} className="mt-10" />
      <a href={emailLink + user.email} className={clsx(buttonStyles(), 'mt-8 block')}>
        Написать пользователю
      </a>
    </>
  );
}

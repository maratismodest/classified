'use client';

import Item from '@/components/Item';
import favouritesAtom from '@/state';
import { routes } from '@/utils/constants';
import { useAtomValue } from 'jotai';
import Link from 'next/link';

export default function Favourites<NextPage>() {
  const favourites = useAtomValue(favouritesAtom);

  return (
    <section className="text-center">
      <h1>Избранное</h1>
      <div className="mt-4">
        {favourites.length > 0 ? (
          <ul className="items">
            {favourites.map(post => (
              <li key={post.id}>
                <Link href={routes.post + '/' + post.id}>
                  <Item post={post} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h2>Нет добавленных в избранное</h2>
        )}
      </div>
    </section>
  );
}

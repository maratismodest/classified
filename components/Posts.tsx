import { routes } from '@/utils/constants';
import { Post } from '@prisma/client';
import Link from 'next/link';
import React, { HTMLProps } from 'react';
import clsx from 'clsx';

import Item from '@/components/Item';

interface PostsInterface extends HTMLProps<HTMLUListElement> {
  posts: Post[];
  edit?: boolean;
  refetch?: any;
}

export default function Posts({ posts, edit = false, className = '' }: PostsInterface) {
  return (
    <ul className={clsx('items', className)} data-testid="posts">
      {posts.map((post: Post) => (
        <li key={post.id}>
          <Link href={routes.post + '/' + post.id}>
            <Item post={post} edit={edit} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

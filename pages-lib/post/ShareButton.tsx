'use client';
import Button from '@/components/ui/Button';
import type { Post } from '@prisma/client';
import React from 'react';

interface ShareButtonProps {
  post: Post;
}

const onClick = async (id: number) => {
  await navigator.share({
    title: process.env.NEXT_PUBLIC_APP_NAME,
    text: 'Поделиться ссылкой:',
    url: process.env.NEXT_PUBLIC_APP_URL + '/post/' + id,
  });
};

const ShareButton = ({ post }: ShareButtonProps) => {
  const { id } = post;

  if (!navigator.canShare) {
    return null;
  }

  return (
    <Button className="mt-4" onClick={() => onClick(id)}>
      Поделиться
    </Button>
  );
};

export default ShareButton;

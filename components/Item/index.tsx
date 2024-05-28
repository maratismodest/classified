'use client';
import RedHeart from '@/assets/svg/heart-red.svg';
import TransparentHeart from '@/assets/svg/heart.svg';
import ItemButtons from '@/components/Item/item-buttons';
import Price from '@/components/Price';
import Popup from '@/components/ui/Popup';
import useApp from '@/hooks/useApp';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import favouritesAtom from '@/state';
import postTelegram from '@/utils/api/telegram/postTelegram';
import { NO_IMAGE, routes } from '@/utils/constants';
import { Post, User } from '@prisma/client';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { errors, ItemModalText, success } from './utils';

type ItemProps = {
  post: Post;
  edit?: boolean;
};

export default function Item({ post, edit = false }: ItemProps) {
  const { categories } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [modalText, setModalText] = useState<ItemModalText | undefined>();
  const { toast, setToast } = useToast();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const { user } = useAuth();
  const { id,preview, price, categoryId, description, images } = post;

  const liked = useMemo(() => !!favourites.find(x => x.id === id), [favourites, id]);

  const hideModal = useCallback(() => setIsOpen(false), []);

  const showModal = (text: ItemModalText) => {
    setModalText(text);
    setIsOpen(true);
  };

  const handleFunction = async () => {
    try {
      if (modalText === ItemModalText.edit) {
        router.push(routes.edit + '/' + id);
        return;
      }
      if (modalText === ItemModalText.telegram) {
        await postTelegram(post, user as User, categories);
        alert(success.telegram);
        router.push(routes.profile);
        return;
      }
      if (modalText === ItemModalText.delete) {
        // await deleteAd(id);

        // const _updatedPost = await updatePostPrisma({ ...post, published: false });
        // console.log('_updatedPost', _updatedPost);
        setToast(true);
        // revalidatePath('/profile');
        const refetchButton = document.getElementById('refetch-posts');
        if (refetchButton) {
          console.log('refetchButton', refetchButton);
          refetchButton.click();
        }
        alert(success.archive);
        return;
      }
    } catch (e) {
      console.log(e);
      alert(errors.wentWrong);
    } finally {
      setIsOpen(false);
    }
  };

  const handleFavourite = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const currentList = liked ? favourites.filter(x => x.id !== id) : [...favourites, post];
      setFavourites(currentList as any);
    },
    [id, favourites, liked, post, setFavourites]
  );

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  const buttons = useMemo(
    () => [
      { text: 'Да', onClick: handleFunction },
      { text: 'Нет', onClick: hideModal },
    ],
    [handleFunction]
  );

  return (
    <>
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={modalText ?? 'InnoAds'}
        buttons={buttons}
      />
      <Link
        href={`${routes.post}/${id}`}
        className="relative flex flex-col overflow-hidden rounded-2xl shadow"
        data-testid={`item-${id}`}
        data-category={categoryId}
      >
        <div className="relative block aspect-square transition-all hover:scale-105">
          <Image
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 200px"
            alt=''
            src={preview}
            placeholder="blur"
            blurDataURL={NO_IMAGE}
          />
        </div>

        <div className="relative mx-3 my-1 overflow-hidden whitespace-nowrap font-bold lg:mx-4 lg:my-2">
          <Price price={price} />
          <h2 className="mt-auto truncate font-normal">{description}</h2>
          <button
            className="absolute right-0 top-0 z-10 cursor-pointer"
            onClick={handleFavourite}
            aria-label="Добавить в избранное"
          >
            {liked ? <RedHeart /> : <TransparentHeart />}
          </button>
        </div>
        {user && edit && <ItemButtons showModal={showModal} />}
      </Link>
    </>
  );
}

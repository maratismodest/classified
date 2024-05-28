'use client';
import { getCurrencySymbol } from '@/components/Price/utils';
import SelectHeadlessUi from '@/components/SelectHeadlessUi';
import Spinner from '@/components/ui/Spinner';
import useApp from '@/hooks/useApp';
import useAuth from '@/hooks/useAuth';
import ImagesModuleInput from '@/modules/PostModule/ImagesModule/ImagesModuleInput';
import ImagesModulePreview from '@/modules/PostModule/ImagesModule/ImagesModulePreview';
import imageHandler from '@/modules/PostModule/ImagesModule/utils';
import { stateAtom } from '@/state';
import buttonStyles from '@/styles/buttonStyles';
import inputStyles from '@/styles/inputStyles';
import { CreatePostDTO } from '@/types';
import postAd from '@/utils/api/prisma/postPost';
import { Field, Label } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { LatLng } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { defaultValues, IFormInput, schema } from '../yup';

const DynamicLeafletMap = dynamic(() => import('@/components/AddMap'), {
  ssr: false,
});

export default function CreatePostModule() {
  const isTelegram = useAtomValue(stateAtom);
  const { categories } = useApp();
  const { user, loading: userLoading } = useAuth();

  const [clickedPosition, setClickedPosition] = useState<LatLng | null>(null);

  const methods = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control,
    watch,
  } = methods;

  console.log('errors', errors);

  const [loading, setLoading] = useState(false);
  const latitude = watch('latitude');
  const longitude = watch('longitude');
  const images = useWatch({ name: 'images', control }) as string[];

  useEffect(() => {
    if (clickedPosition) {
      setValue('latitude', String(clickedPosition.lat));
      setValue('longitude', String(clickedPosition.lng));
    }
  }, [clickedPosition]);

  console.log('');

  if (userLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div>
        <h1>Вы не авторизованы!</h1>
        <p>Попробуйте перезайти на сайте или перезапустить бота</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      setLoading(true);
      const createPostDto: CreatePostDTO = {
        categoryId: data.categoryId,
        price: data.price,
        description: data.description,
        preview: images[0],
        images: images.join('||'),
        userId: user.id,
        published: Boolean(data.post),
        rooms: data.rooms,
        latitude: data.latitude,
        longitude: data.longitude,
        furnished: data.furnished,
        meters: data.meters,
      };

      const post = await postAd(createPostDto);
      console.log('post', post);
      // reset();
      alert('Объявление создано!');
      // await onSubmitOptional();
    } catch (e) {
      console.log(e);
      alert('Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="form gap-2">
        <h1>Новое объявление{isTelegram === 1 ? '.' : '!'}</h1>
        <div className="bg-white-700 mx-auto my-5 h-[400px] w-full">
          <DynamicLeafletMap
            clickedPosition={clickedPosition}
            setClickedPosition={setClickedPosition}
          />
          <input hidden {...register('longitude')} />
          <input hidden {...register('latitude')} />
          <span className="text-red">
            {!longitude && errors.longitude?.message && !latitude && errors.latitude?.message}
          </span>
        </div>

        <div>
          <label htmlFor="categoryId">Выберите категорию</label>
          <SelectHeadlessUi options={categories} name="categoryId" />
          <span className="text-red">{errors.categoryId?.message}</span>
        </div>
        <div>
          <label>Цена ({getCurrencySymbol()})</label>
          <input
            type="number"
            {...register('price')}
            className={clsx(inputStyles(), 'block w-full')}
          />
          <span className="text-red">{errors.price?.message}</span>
        </div>

        <div>
          <label htmlFor="description">Описание</label>
          <textarea
            rows={5}
            cols={5}
            {...register('description')}
            name="description"
            className="w-full"
          />
          <span className="text-red">{errors.description?.message}</span>
        </div>

        <div>
          <label htmlFor="rooms">Количество комнат</label>
          <input
            id="rooms"
            type="number"
            {...register('rooms')}
            className={clsx(inputStyles(), 'block w-full')}
          />
          <span className="text-red">{errors.rooms?.message}</span>
        </div>

        <div>
          <label htmlFor="meters">Площадь</label>
          <input
            id="meters"
            type="number"
            {...register('meters')}
            className={clsx(inputStyles(), 'block w-full')}
          />
          <span className="text-red">{errors.meters?.message}</span>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <label htmlFor="furnished">Мебелированная</label>
            <input id="furnished" type="checkbox" {...register('furnished')} />
          </div>
          <span className="text-red">{errors.furnished?.message}</span>
        </div>

        <ImagesModuleInput
          images={images}
          imageHandler={files => imageHandler(files, images, methods, setLoading)}
          methods={methods}
        />
        <ImagesModulePreview images={images} setImages={images => setValue('images', images)} />

        <div>
          <input type="checkbox" {...register('agreement')} name="agreement" id="agreement" />
          <label htmlFor="agreement">
            &nbsp;<span>Соглашаюсь с</span>&nbsp;
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/blog/rules`}
              className="!underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              правилами и условиями
            </a>
          </label>
          <span className="block text-red">{errors.agreement?.message}</span>
        </div>

        <div className="sr-only">
          <input type="checkbox" {...register('post')} name="post" id="post" />
          <label htmlFor="post"> Автоматически подать на сайт</label>
        </div>

        <button
          className={clsx(buttonStyles({ size: 'medium' }), 'mt-6 w-full')}
          type="submit"
          disabled={loading || categories.length === 0}
        >
          Опубликовать
        </button>
      </form>
    </FormProvider>
  );
}

'use client';
import Posts from '@/components/Posts';
import RangeSliderUi from '@/components/RangeSlider/RangeSlider';
import Spinner from '@/components/ui/Spinner';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useApp from '@/hooks/useApp';
import { ISearchFormInput, searchSchema } from '@/modules/PostModule/yup';
import { furnishedOptions } from '@/pages-lib/main/utils';
import buttonStyles from '@/styles/buttonStyles';
import { GetPostsParams } from '@/utils/api/client/fetchApiPosts';
import cleanObject from '@/utils/cleanObject';
import getBooleanUndefinded from '@/utils/getBooleanOrUndefined';
import scrollToTop from '@/utils/scrollToTop';
import {
  Checkbox,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Fieldset,
  Label,
  Select,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Post } from '@prisma/client';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const DynamicLeafletMap = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
});

interface Props {
  initialPosts: Post[];
  defaultValues: any;
}

const Main = ({ initialPosts, defaultValues }: Props) => {
  const { categories } = useApp();
  const [page, setPage] = useState(1);

  console.log('defaultValues', defaultValues);

  const methods = useForm<ISearchFormInput>({
    resolver: yupResolver(searchSchema),
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
    getValues,
  } = methods;

  const _published = getValues('published');
  const _categoryId = getValues('categoryId');
  const _furnished = getValues('furnished');
  const _rooms = watch('rooms');
  const _min = getValues('min');
  const _max = getValues('max');
  const _minPrice = watch('minPrice');
  const _maxPrice = watch('maxPrice');

  const _options: Partial<GetPostsParams> = cleanObject({
    published: _published,
    categoryId: _categoryId,
    furnished: _furnished,
    rooms: _rooms.length > 0 ? _rooms : undefined,
    min: _minPrice,
    max: _maxPrice,
  });

  const {
    posts = initialPosts,
    postsLoading,
    postsRefetch,
    postsError,
  } = usePostsQuery(_options, false);

  if (!posts) {
    return <Spinner />;
  }

  if (postsError) {
    return <div>Error: {postsError.message}</div>;
  }

  const onSubmit: SubmitHandler<ISearchFormInput> = async (data: ISearchFormInput) => {
    console.log('data', data);
    // @ts-ignore
    postsRefetch(_options);
  };

  return (
    <>
      <h1 className="text-lg">Результат фильтра: {posts?.length}</h1>
      <Disclosure defaultOpen>
        <DisclosureButton className="rounded border border-borderColor">
          показать/скрыть фильтры
        </DisclosureButton>
        <DisclosurePanel className="text-gray-500 pt-1">
          <FormProvider {...methods}>
            <Fieldset>
              <form
                className="grid grid-cols-1 items-start gap-2 rounded border border-borderColor px-4 py-2 md:grid-cols-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Field>
                      <label htmlFor={field.name}>категория</label>
                      <Select
                        id={field.name}
                        className={clsx(
                          'block w-fit cursor-pointer appearance-none rounded-lg border bg-white/5 px-3 py-1 text-sm/6',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                          // Make the text of each option black on Windows
                          '*:text-black',
                          'border-borderColor'
                        )}
                        onChange={e => {
                          setValue(
                            'categoryId',
                            e.target.value !== 'undefined' ? Number(e.target.value) : undefined
                          );
                        }}
                      >
                        {[{ value: 'undefined', label: 'все' }, ...categories].map(x => (
                          <option key={x.label} value={x.value}>
                            {x.label}
                          </option>
                        ))}
                      </Select>
                      <span className="text-red">{errors.furnished?.message}</span>
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name="furnished"
                  render={({ field }) => (
                    <Field>
                      <label htmlFor={field.name}>мебель</label>
                      <Select
                        id={field.name}
                        className={clsx(
                          'block w-fit appearance-none rounded-lg border bg-white/5 px-3 py-1 text-sm/6',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                          // Make the text of each option black on Windows
                          '*:text-black',
                          'border-borderColor'
                        )}
                        onChange={e => setValue('furnished', getBooleanUndefinded(e.target.value))}
                      >
                        {furnishedOptions.map(x => (
                          <option key={x.label} value={x.value}>
                            {x.label}
                          </option>
                        ))}
                      </Select>
                      <span className="text-red">{errors.furnished?.message}</span>
                    </Field>
                  )}
                />

                <div>
                  <label>кол-во комнат:</label>
                  <div className="flex gap-4">
                    {[1, 2, 3].map(number => (
                      <Field key={number.toString()} className="flex items-center gap-2">
                        <Label>{number}</Label>
                        <Checkbox
                          checked={Boolean(_rooms.includes(number))}
                          className="group block size-5 rounded border border-borderColor bg-white data-[checked]:bg-blue"
                          onChange={() =>
                            setValue(
                              'rooms',
                              _rooms && _rooms.includes(number)
                                ? _rooms.filter(x => x !== number)
                                : _rooms?.concat([number])
                            )
                          }
                        >
                          <svg
                            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Checkbox>
                      </Field>
                    ))}
                  </div>
                  <span className="text-red">{errors.rooms?.message}</span>
                </div>

                <Field>
                  <RangeSliderUi
                    min={_min}
                    max={_max}
                    minValue={_minPrice}
                    maxValue={_maxPrice}
                    setMinValue={val => {
                      setValue('minPrice', val);
                    }}
                    setMaxValue={val => {
                      setValue('maxPrice', val);
                    }}
                  />
                </Field>

                <div className="relative flex h-full items-center justify-end">
                  <button type="submit" className={clsx(buttonStyles({ size: 'medium' }), 'h-fit')}>
                    поиск
                  </button>
                </div>
              </form>
            </Fieldset>
          </FormProvider>
        </DisclosurePanel>
      </Disclosure>
      <TabGroup>
        <TabList className="flex gap-4 p-2">
          <Tab className="px-2 outline-none data-[selected]:border-b data-[selected]:border-b-blue data-[selected]:font-semibold data-[selected]:text-blue">
            Карта
          </Tab>
          <Tab className="px-2 outline-none data-[selected]:border-b data-[selected]:border-b-blue data-[selected]:font-semibold data-[selected]:text-blue">
            Список
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="bg-white-700 mx-auto h-[480px] w-full md:h-[640px]">
              <DynamicLeafletMap posts={posts} />
            </div>
          </TabPanel>
          <TabPanel className="!px-0">
            <Posts posts={posts.slice((page - 1) * 20, page * 20)} />
            {posts && posts.length && (
              <ul className="mt-4 flex items-center gap-1">
                {Array.from({ length: Math.ceil(posts.length / 20) }).map((x, index) => (
                  <li key={index} className="rounded border px-2">
                    <button
                      onClick={() => {
                        setPage(index + 1);
                        scrollToTop();
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};
export default Main;

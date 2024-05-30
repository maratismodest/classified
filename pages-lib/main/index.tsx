'use client';
import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import { defaultSearchValues, ISearchFormInput, searchSchema } from '@/modules/PostModule/yup';
import { furnishedOptions } from '@/pages-lib/main/utils';
import buttonStyles from '@/styles/buttonStyles';
import cleanObject from '@/utils/cleanObject';
import getBooleanUndefinded from '@/utils/getBooleanOrUndefined';
import scrollToTop from '@/utils/scrollToTop';
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
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
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const DynamicLeafletMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

interface Props {
  minPrice: number;
  maxPrice: number;
  categories: { value: string; label: string }[];
}

const Main = ({ minPrice, maxPrice, categories }: Props) => {
  const [page, setPage] = useState(1);

  const methods = useForm<ISearchFormInput>({
    resolver: yupResolver(searchSchema),
    defaultValues: { ...defaultSearchValues, min: minPrice, max: maxPrice },
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

  const _rooms = watch('rooms');
  const _min = watch('min');
  const _max = watch('max');
  const _furnished = watch('furnished');
  const _categoryId = watch('categoryId');

  const options = useMemo(
    () =>
      cleanObject({
        published: true,
        furnished: _furnished,
        rooms: _rooms.length > 0 ? _rooms : undefined,
        min: _min,
        max: _max,
        categoryId: _categoryId,
      }),
    [_furnished, _rooms, _min, _max, _categoryId]
  );

  const { posts, postsLoading, postsRefetch, postsError } = usePostsQuery(options);

  if (!posts) {
    return <Spinner />;
  }

  if (postsError) {
    return <div>Error: {postsError.message}</div>;
  }

  const onSubmit: SubmitHandler<ISearchFormInput> = async (data: ISearchFormInput) => {
    console.log('data', data);
    await postsRefetch(options);
  };

  return (
    <>
      <h1 className="text-lg">Результат фильтра: {posts?.length}</h1>
      <Disclosure defaultOpen>
        <DisclosureButton className="rounded border">показать/скрыть фильтры</DisclosureButton>
        <DisclosurePanel className="text-gray-500">
          <FormProvider {...methods}>
            <Fieldset>
              <form
                className="grid grid-cols-1 items-start gap-2 border px-4 py-2 md:grid-cols-5"
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
                          'block w-fit appearance-none rounded-lg border bg-white/5 px-3 py-1 text-sm/6',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                          // Make the text of each option black on Windows
                          '*:text-black'
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
                          '*:text-black'
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
                          className="group block size-5 rounded border bg-white data-[checked]:bg-blue"
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
                  <div className="flex justify-between">
                    <span>{_min > 0 ? _min : minPrice}</span>
                    <label htmlFor="price">цена</label>
                    <span>{_max > 0 ? _max : maxPrice}</span>
                  </div>
                  <RangeSlider
                    id="price"
                    aria-label={['min', 'max']}
                    min={minPrice}
                    max={maxPrice}
                    step={1000}
                    defaultValue={[_min, _max]}
                    onChangeEnd={val => {
                      setValue('min', val[0]);
                      setValue('max', val[1]);
                    }}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                </Field>

                <div className="relative flex justify-end">
                  <button type="submit" className={clsx(buttonStyles({ size: 'medium' }))}>
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

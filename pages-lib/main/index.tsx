'use client';
import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import { defaultSearchValues, ISearchFormInput, searchSchema } from '@/modules/PostModule/yup';
import buttonStyles from '@/styles/buttonStyles';
import cleanObject from '@/utils/cleanObject';
import getBooleanUndefinded from '@/utils/getBooleanOrUndefined';
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { min } from '@floating-ui/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const furnishedOptions = [
  {
    value: 'undefined',
    label: 'все',
  },
  {
    value: 'true',
    label: 'да',
  },
  {
    value: 'false',
    label: 'нет',
  },
] as const;

const DynamicLeafletMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const Main = ({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) => {
  const methods = useForm<ISearchFormInput>({
    resolver: yupResolver(searchSchema),
    defaultValues: defaultSearchValues,
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

  const options = useMemo(
    () =>
      cleanObject({
        published: true,
        furnished: getBooleanUndefinded(_furnished),
        rooms: _rooms.length > 0 ? _rooms : undefined,
        min: _min,
        max: _max,
      }),
    [_furnished, _rooms, _min, _max]
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
      <h1>Результат фильтра: {posts?.length}</h1>
      <FormProvider {...methods}>
        <form className="border p-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="furnished">мебель</label>
              <select
                id="furnished"
                {...register('furnished')}
                className="w-fit rounded border p-1"
              >
                {furnishedOptions.map(x => (
                  <option key={x.label} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </select>
              <span className="text-red">{errors.furnished?.message}</span>
            </div>
            <div>
              <label>кол-во комнат:</label>
              <ul className="flex gap-4 ">
                {[1, 2, 3].map(number => (
                  <li key={number} className="flex items-center gap-1">
                    <label htmlFor={number.toString()}>{number}</label>
                    <input
                      type="checkbox"
                      id={number.toString()}
                      onChange={() =>
                        setValue(
                          'rooms',
                          _rooms && _rooms.includes(number)
                            ? _rooms.filter(x => x !== number)
                            : _rooms?.concat([number])
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
              <span className="text-red">{errors.rooms?.message}</span>
            </div>

            <div>
              <RangeSlider
                aria-label={['min', 'max']}
                min={minPrice}
                max={maxPrice}
                step={1000}
                defaultValue={[minPrice, maxPrice]}
                onChangeEnd={val => {
                  setValue('min', val[0]);
                  setValue('max', val[1]);
                }}
                id="price"
                // onChange={(val) => console.log('val', val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <div className="flex justify-between">
                <span>{_min > 0 ? _min : minPrice}</span>
                <label htmlFor="price">цена</label>
                <span>{_max > 0 ? _max : maxPrice}</span>
              </div>
            </div>
          </div>
          <div className="relative flex justify-end">
            <button type="submit" className={clsx(buttonStyles())}>
              поиск
            </button>
          </div>
        </form>
      </FormProvider>

      <Tabs>
        <TabList>
          <Tab>Карта</Tab>
          <Tab>Список</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="!x-0 !p-0">
            <div className="bg-white-700 mx-auto my-5 h-[480px] w-full md:h-[640px]">
              <DynamicLeafletMap posts={posts} />
            </div>
          </TabPanel>
          <TabPanel className="!px-0">
            <Posts posts={posts} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default Main;

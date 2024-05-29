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
import { Checkbox, Select } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

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

  console.log('_furnished', _furnished);

  const options = useMemo(
    () =>
      cleanObject({
        published: true,
        furnished: _furnished,
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
          <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-4">
            <div className="grid grid-cols-1">
              <label htmlFor="furnished">мебель</label>
              <Controller
                control={control}
                name="furnished"
                render={() => (
                  <Select
                    className={clsx(
                      'block w-fit appearance-none rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6',
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
                )}
              />

              <span className="text-red">{errors.furnished?.message}</span>
            </div>
            <div>
              <label>кол-во комнат:</label>
              <ul className="flex gap-4">
                {[1, 2, 3].map(number => (
                  <li key={number} className="flex items-center gap-1">
                    <label htmlFor={number.toString()}>{number}</label>
                    <Checkbox
                      checked={Boolean(_rooms.includes(number))}
                      id={number.toString()}
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
                  </li>
                ))}
              </ul>
              <span className="text-red">{errors.rooms?.message}</span>
            </div>

            <div>
              <div className="flex justify-between">
                <span>{_min > 0 ? _min : minPrice}</span>
                <label htmlFor="price">цена</label>
                <span>{_max > 0 ? _max : maxPrice}</span>
              </div>
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
            </div>
            <div className="relative flex justify-end">
              <button type="submit" className={clsx(buttonStyles({ size: 'medium' }))}>
                поиск
              </button>
            </div>
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

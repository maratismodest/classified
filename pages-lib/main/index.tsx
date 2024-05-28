'use client'
import Posts from "@/components/Posts";
import {Checkbox, Stack, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {Post} from "@prisma/client";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from 'react';

const DynamicLeafletMap = dynamic(() => import('@/components/Map'), {
  ssr: false
});

const Main = ({posts}: { posts: Post[] }) => {
  const [{rooms}, setState] = useState<{
    rooms: number[]
  }>({
    rooms: []
  })
  const [filtered, setFiltered] = useState<Post[]>([])

  useEffect(() => {
    setFiltered(prevState => rooms.length ? [...posts].filter(x => rooms.includes(x.rooms)) : posts)
  }, [rooms]);
  // console.log('rooms', rooms)
  return (
    <>
      <h1>Результат фильтра: {filtered.length}</h1>
      <div className='flex items-center gap-8 flex-wrap'>
        <div>
          Кол-во комнат:
        </div>
        <Stack spacing={[8, 16]} direction={['row']}>
          <Checkbox
            id="1"
            size="lg"
            onChange={(event) => {
              setState(prev =>
                prev.rooms.find(x => x === 1) ?
                  {...prev, rooms: prev.rooms.filter(x => x !== 1)} :
                  {...prev, rooms: prev.rooms.concat([1])})
            }}
          >1</Checkbox>

          <Checkbox
            id="2"
            size="lg"
            onChange={(event) => {
              setState(prev =>
                prev.rooms.find(x => x === 2) ?
                  {...prev, rooms: prev.rooms.filter(x => x !== 2)} :
                  {...prev, rooms: prev.rooms.concat([2])})
            }}>2</Checkbox>
          <Checkbox
            id="3"
            size="lg"
            onChange={(event) => {
              setState(prev =>
                prev.rooms.find(x => x === 3) ?
                  {...prev, rooms: prev.rooms.filter(x => x !== 3)} :
                  {...prev, rooms: prev.rooms.concat([3])})
            }}>{3}</Checkbox>

        </Stack>
      </div>
      <Tabs>
        <TabList>
          <Tab>Карта</Tab>
          <Tab>Список</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="!p-0 !x-0">
            <div className="bg-white-700 mx-auto my-5 w-full h-[480px] md:h-[640px]">
              <DynamicLeafletMap posts={filtered}/>
            </div>
          </TabPanel>
          <TabPanel className='!px-0'>
            <Posts posts={filtered} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Main;

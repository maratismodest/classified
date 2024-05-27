'use client'
import AdvCard from "@/components/AdvCard";
import initialApartments from "@/state";
import {Apartment} from "@/types";
import {Tab, TabList, TabPanel, TabPanels, Tabs, Checkbox, Stack} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import React, {useEffect, useMemo, useState} from "react";

const DynamicLeafletMap = dynamic(() => import('@/components/Map'), {
  ssr: false
});

export default function Home() {
  const [{rooms}, setState] = useState<{
    rooms: number[]
  }>({
    rooms: []
  })
  const apartments = useMemo(() => initialApartments, [])
  const [filtered, setFiltered] = useState<Apartment[]>([])

  useEffect(() => {
    setFiltered(prevState => rooms.length ? [...apartments].filter(x => rooms.includes(x.properties.rooms)) : apartments)
  }, [rooms]);
  console.log('rooms', rooms)
  return (
    <>
      <h1 >Результат фильтра: {filtered.length}</h1>
      <div className='flex items-center gap-8 flex-wrap'>
        <div>
          Кол-во комнат:
        </div>
        <Stack spacing={[8, 16]} direction={[ 'row']}>
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
              <DynamicLeafletMap ads={filtered}/>
            </div>
          </TabPanel>
          <TabPanel className='!px-0'>
            {filtered.map(x =>
              <Link key={x.id} href={`/adv/${x.id}`}>
                <AdvCard apartment={x}/>
              </Link>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

    </>
  )
}

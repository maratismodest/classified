'use client'
import AdvCard from "@/components/AdvCard";
import initialApartments from "@/state";
import {Apartment} from "@/types";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
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
    setFiltered(prevState => rooms.length ? [...initialApartments].filter(x => rooms.includes(x.properties.rooms)) : initialApartments)
  }, [rooms]);
  console.log('rooms', rooms)
  return (
    <>
      <h1>Главная</h1>
      <p>Результат фильтра: {filtered.length}</p>
      <div>
        <div  className='flex items-center gap-2'>
          Количество комнат
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <input
                id="1"
                type="checkbox"
                onChange={(event) => {
                  setState(prev =>
                    prev.rooms.find(x => x === 1) ?
                      {...prev, rooms: prev.rooms.filter(x => x !== 1)} :
                      {...prev, rooms: prev.rooms.concat([1])})
                }}
              />
              <label htmlFor="1">1-комнатные</label>

            </div>
            <div className='flex items-center gap-1'>
              <input
                id="2"
                type="checkbox"
                onChange={(event) => {
                  setState(prev =>
                    prev.rooms.find(x => x === 2) ?
                      {...prev, rooms: prev.rooms.filter(x => x !== 2)} :
                      {...prev, rooms: prev.rooms.concat([2])})
                }}/>
              <label htmlFor="2">2-комнатные</label>

            </div>


            <div className='flex items-center gap-1'>
              <input
                id="3"
                type="checkbox"
                onChange={(event) => {
                  setState(prev =>
                    prev.rooms.find(x => x === 3) ?
                      {...prev, rooms: prev.rooms.filter(x => x !== 3)} :
                      {...prev, rooms: prev.rooms.concat([3])})
                }}/>
              <label htmlFor="3">3-комнатные</label>

            </div>

          </div>
        </div>
      </div>
      <Tabs>
      <TabList>
          <Tab>Карта</Tab>
          <Tab>Список</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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

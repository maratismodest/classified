'use client'

import React, {useState} from "react";
import Map from "@/components/Map";

import dynamic from 'next/dynamic';

const DynamicLeafletMap = dynamic(() => import('@/components/Map'), {
  ssr: false
});


export default function Home() {
  // const [[latitude,longitude], setCoordinates] = useState<number[]>([])
  // // unstable_after(() => console.info("rendered"))
  // const getLocationBtn = () => {
  //   if (window as any){
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(displayGeoData, displayError);
  //     }
  //     else {
  //       alert("Geo Location is not available")
  //     }
  //   }
  // }
  //
  // const displayGeoData = (position: any) => {
  //   console.log('position', position)
  //   const {latitude, longitude} = position.coords
  //   setCoordinates([latitude, longitude])
  // }
  //
  // const displayError = (error:any) => {
  //   console.error(error)
  // }
  return (
    <div className='p-4'>
      <h1>Apartments in Sofia</h1>
      {/*<div>{latitude} {longitude}</div>*/}
      {/*<button onClick={getLocationBtn}>Get Location</button>*/}
      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        {/*<Map*/}
        {/*  // posix={[42.6936554, 23.3119826]}*/}
        {/*/>*/}
        <DynamicLeafletMap />
      </div>
    </div>
  )
}

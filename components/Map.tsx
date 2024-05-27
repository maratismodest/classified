"use client"

import {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {LatLngExpression, LatLngTuple} from 'leaflet';
import Image from 'next/image'

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type Coordinates = LatLngExpression | LatLngTuple

interface MapProps {
  // posix: LatLngExpression | LatLngTuple,
  zoom?: number,
}

const defaults = {
  zoom: 15,
}

interface Apartment {
  id: number,
  coordinates: Coordinates,
  title: string;
  price: number;
  image: string;
}

const apartments: Apartment[] = [
  {
    id: 1,
    coordinates: [42.6936554, 23.3119826],
    title: 'Однушка',
    price: 100000,
    image: '/images/1.jpg'
  },
  {
    id: 2,
    coordinates: [42.6900000, 23.3100000],
    title: 'Двушка',
    price: 200000,
    image: '/images/2.jpg'
  }
]

const Map = (Map: MapProps) => {
  // const [mounted, setMounted] = useState(false)
  const [apartment, setApartment] = useState<Apartment | undefined>()
  const {zoom = defaults.zoom,
    // posix
  } = Map
  const handleMarkerClick = (data: any) => {
    console.log('Marker clicked!', data);
    const {latlng} = data
    const {lat, lng} = latlng
    // @ts-ignore
    const item = apartments.find(({coordinates}) => coordinates[0] == Number(lat))
    if (item) {
      setApartment(item)
    }
  };
  // useEffect(() => {
  //   if (window) {
  //     setMounted(true)
  //   }
  //
  // }, [window]);

  // if (!mounted) {
  //   return  null
  // }
  return (
    <>
      <MapContainer
        center={[42.6936554, 23.3119826]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{height: "100%", width: "100%"}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          apartments.map(apartment =>
            <Marker
              key={apartment.id}
              position={apartment.coordinates}
              draggable={false}
              eventHandlers={{click: handleMarkerClick}}
            >
              <Popup>
                <div className='flex gap-2'>
                  <div className='aspect-square w-24 h-24 relative'>
                    <Image src={apartment.image} fill alt='' style={{objectFit: 'cover'}}/>
                  </div>
                  <div className='flex flex-col h-fit truncate'>
                    <h1 className='text-lg'>{apartment.title}</h1>
                    <p className='!m-0 p-0'>Цена: <span className='font-bold'>{apartment.price}</span></p>
                  </div>
                </div>
              </Popup>
            </Marker>)
        }
      </MapContainer>
      {apartment && <div className='h-32 flex gap-4 border rounded p-4 mt-4'>
          <div className='aspect-square w-24 h-24 relative'>
              <Image src={apartment.image} fill alt='' style={{objectFit: 'cover'}}/>
          </div>
          <div>
              <h1>{apartment.title}</h1>
              <p>Цена: {apartment.price}</p>
              <p>Более развернутая информация будет в карточке</p>
          </div>
      </div>}
    </>

  )
}

export default Map

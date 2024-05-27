"use client"

import {Apartment} from "@/types";
import Image from 'next/image'

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Link from "next/link";
import {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import "leaflet-defaulticon-compatibility";


interface MapProps {
  // posix: LatLngExpression | LatLngTuple,
  zoom?: number,
  ads: Apartment[]
}

const defaults = {
  zoom: 15,
}

const Map = (Map: MapProps) => {
  const [apartment, setApartment] = useState<Apartment | undefined>()
  const {
    zoom = defaults.zoom,
    // posix
    ads
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

  return (
    <>
      <MapContainer
        center={[ 42.6977,  23.3219 ]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{height: "100%", width: "100%"}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          ads.map(apartment =>
            <Marker
              key={apartment.id}
              position={apartment.coordinates}
              draggable={false}
              eventHandlers={{
                click: (event) => event.target.openPopup(),
              }}
            >
              <Popup>
                <Link href={`/adv/${apartment.id}`} className='flex gap-2'>
                  <div className='aspect-square w-24 h-24 relative'>
                    <Image src={apartment.image} fill alt='' style={{objectFit: 'cover'}}/>
                  </div>
                  <div className='flex flex-col h-fit truncate'>
                    <h1 className='text-lg text-black'>{apartment.title}</h1>
                    <p className='!m-0 text-black'>Цена: <span className='font-bold'>{apartment.price}</span></p>
                  </div>
                </Link>
              </Popup>
            </Marker>)
        }
      </MapContainer>
    </>

  )
}

export default Map

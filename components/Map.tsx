"use client"

import {Post} from "@prisma/client";
import { LatLngExpression, LatLngTuple } from 'leaflet';
import Image from 'next/image'

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Link from "next/link";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet-defaulticon-compatibility";


interface MapProps {
  // posix: LatLngExpression | LatLngTuple,
  zoom?: number,
  posts: Post[],
  center?:LatLngExpression | LatLngTuple
}

const defaults = {
  zoom: 15,
}

const Map = (Map: MapProps) => {
  const {
    zoom = defaults.zoom,
    // posix
    posts,
    center
  } = Map

  return (
    <>
      <MapContainer
        center={center ?? [42.6977, 23.3219]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{height: "100%", width: "100%"}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          posts.map(post =>
            <Marker
              key={post.id}
              position={[Number(post.latitude), Number(post.longitude)]}
              draggable={false}
              eventHandlers={{
                click: (event) => event.target.openPopup(),
              }}
            >
              <Popup>
                <Link href={`/adv/${post.id}`} className='flex gap-2'>
                  <div className='aspect-square w-24 h-24 relative'>
                    <Image src={post.preview} fill alt='' style={{objectFit: 'cover'}}/>
                  </div>
                  <div className='flex flex-col h-fit truncate'>
                    <h1 className='text-lg text-black'>{post.rooms}</h1>
                    <p className='!m-0 text-black'>Цена: <span className='font-bold'>{post.price}</span></p>
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

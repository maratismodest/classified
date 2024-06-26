'use client';

import { routes } from '@/utils/constants';
import { Post } from '@prisma/client';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import Image from 'next/image';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import Link from 'next/link';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';

interface MapProps {
  zoom?: number;
  posts: Post[];
  center?: LatLngExpression | LatLngTuple;
}

const defaults = {
  zoom: 15,
};

const Map = (Map: MapProps) => {
  const {
    zoom = defaults.zoom,
    // posix
    posts,
    center,
  } = Map;

  useEffect(() => {
    return () => {
      console.log('unmount');
    };
  }, []);

  return (
    <>
      <MapContainer
        key={process.env.NODE_ENV === 'development' ? new Date().getTime() : 'map-search'}
        center={center ?? [42.6977, 23.3219]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts.map(post => (
          <Marker
            key={post.id}
            position={[Number(post.latitude), Number(post.longitude)]}
            draggable={false}
            eventHandlers={{
              click: event => event.target.openPopup(),
            }}
          >
            <Popup>
              <Link href={`${routes.post}/${post.id}`} className="flex gap-2">
                <div className="relative aspect-square h-16 w-16">
                  <Image src={post.preview} fill alt="" style={{ objectFit: 'cover' }} />
                </div>
                <ul className="flex h-fit flex-col truncate !text-sm">
                  <li>{post.rooms}-x квартира</li>
                  <li>Площадь: {post.meters}</li>
                  <li>Цена:{post.price}</li>
                </ul>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;

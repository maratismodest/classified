import getAddressFromCoordinates from '@/utils/api/openstreetmap/getAddressByLocation';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const defaults = {
  zoom: 15,
};

interface Props {
  setValue: (key: any, value: any) => void;
  longitude: number;
  latitude: number;
  address: string;
}

const ClickableMap = ({ setValue, latitude, longitude, address }: Props) => {
  const MapClickHandler = () => {
    useMapEvents({
      click: e => {
        setValue('latitude', e.latlng.lat);
        setValue('longitude', e.latlng.lng);
        getAddressFromCoordinates(e.latlng.lat, e.latlng.lng).then(address => {
          console.log('address', address);
          setValue('address', address);
        });
      },
    });

    return null;
  };

  return (
    <MapContainer
      center={[42.6977, 23.3219]}
      zoom={defaults.zoom}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {latitude && longitude && (
        <Marker
          position={[latitude, longitude]}
          draggable={false}
          eventHandlers={{
            click: event => event.target.openPopup(),
          }}
        >
          <Popup>
            <p>Clicked Position:</p>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Address: {address}</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default ClickableMap;

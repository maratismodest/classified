import getAddressFromCoordinates from '@/utils/api/openstreetmap/getAddressByLocation';
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const defaults = {
  zoom: 15,
};

const ClickableMap = ({ clickedPosition, setClickedPosition }: any) => {
  console.log('clickedPosition', clickedPosition);
  useEffect(() => {
    if (clickedPosition) {
      getAddressFromCoordinates(clickedPosition.lat, clickedPosition.lng);
    }
  }, [clickedPosition]);
  const MapClickHandler = () => {
    useMapEvents({
      click: e => {
        setClickedPosition(e.latlng);
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
      {clickedPosition && (
        <Marker
          position={[Number(clickedPosition.lat), Number(clickedPosition.lng)]}
          draggable={false}
          eventHandlers={{
            click: event => event.target.openPopup(),
          }}
        >
          <Popup>
            <p>Clicked Position:</p>
            <p>Latitude: {clickedPosition.lat}</p>
            <p>Longitude: {clickedPosition.lng}</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default ClickableMap;

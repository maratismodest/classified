import buttonStyles from '@/styles/buttonStyles';
import React, { useState } from 'react';

const GetMyLocation = () => {
  const [[latitude, longitude], setCoordinates] = useState<number[]>([]);

  const getLocationBtn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayGeoData, displayError);
    } else {
      alert('Geo Location is not available');
    }
  };

  const displayGeoData = (position: any) => {
    console.log('position', position);
    const { latitude, longitude } = position.coords;
    setCoordinates([latitude, longitude]);
  };

  const displayError = (error: any) => {
    console.error(error);
  };
  return (
    <div>
      <div>
        {latitude} {longitude}
      </div>
      <button className={buttonStyles()} onClick={getLocationBtn}>
        Get Location
      </button>
    </div>
  );
};

export default GetMyLocation;

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const mapStyles = {
    // height: "400px",
    width: "100%" // Set width to 100%
  };

  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAEdDpwPUi7QQQKPgi2h0ilb9HC7oGtgnw"
    >
      <GoogleMap
        mapContainerClassName='custom-map-container'
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        {/* Child components, such as markers, polylines, etc., can be added here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

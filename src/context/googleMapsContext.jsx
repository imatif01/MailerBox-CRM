import React, { createContext, useContext, useMemo } from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsContext = createContext(null);

export const GoogleMapsProvider = ({ children }) => {
  const apiKey = 'AIzaSyARhFVFYkqqbvJ1moa2_73JMEa8Z5LeVaM';
  const libraries = ['places', 'geometry'];

  const value = useMemo(() => ({ apiKey, libraries }), [apiKey, libraries]);

  return (
    <GoogleMapsContext.Provider value={value}>
      <LoadScript loadingElement={<div style={{ display: 'none' }} />} googleMapsApiKey={apiKey} libraries={libraries}>
        {children}
      </LoadScript>
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);

import React, { useCallback } from 'react';
import { createContext, useEffect, useState } from "react";

type AppContextState = {
  geolocation: { hasGeo: boolean; currentPos: GeolocationPosition; getPos: () => void; } | null,
}

export const AppContext = createContext<AppContextState>({
  geolocation: null,
});

const useCatchGeolocation = () => {
  const [ hasGeo, setHasGeo ] = useState(false);
  const [ currentPos, setCurrentPos ] = useState<GeolocationPosition>(new GeolocationPosition())
 
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Ask user to enable geolocation
      navigator.geolocation.getCurrentPosition(position => {
        setHasGeo(true);
        setCurrentPos(position);
      }, (err) => console.error(err));
    }
  }, []);

  const getPos = useCallback(() => {
    if (hasGeo) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentPos(position);
      }, (err) => console.error(err));
    }
  }, [ hasGeo ]);

  return { hasGeo, currentPos, getPos }
}

export const AppContextProvider = ({ children }: { children: React.ReactChild }) => {
  const geolocation = useCatchGeolocation();
  return <AppContext.Provider value={{ geolocation }}>{children}</AppContext.Provider>;
};

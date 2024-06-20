import { LatLng } from "leaflet";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";

export const useMapMouseOver = () => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    mouseover: (e) => {
      setPosition(e.latlng);
    },
    mouseout: () => {
      setPosition(null);
    },
    mousemove: (e) => {
      if (position !== null) {
        setPosition(e.latlng);
      }
    },
  });

  return [position];
};

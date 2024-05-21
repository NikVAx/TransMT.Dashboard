import { ReactNode } from "react";
import { useMap } from "react-leaflet";
import type { Map } from "leaflet";

interface IMapConsumer {
  children: (map: Map) => ReactNode;
}

export const MapConsumer = ({ children }: IMapConsumer) => {
  const map = useMap();

  return children(map);
};

import { useState } from "react";
import { Polyline, useMapEvents } from "react-leaflet";
import { IPolylineOnChange } from "./polylineEditor.types";
import { ILatLng } from "@/shared/types";

export const PolylineEditor = ({ onChange }: IPolylineOnChange) => {
  const [positions, setPositions] = useState<ILatLng[]>([]);

  useMapEvents({
    click: (e) => {
      const changed = [...positions, { lat: e.latlng.lat, lng: e.latlng.lng }];
      setPositions(changed);
      onChange({
        latlngs: changed,
      });
    },
  });

  return positions.length === 0 ? null : (
    <Polyline positions={positions} pathOptions={{ weight: 14 }} />
  );
};

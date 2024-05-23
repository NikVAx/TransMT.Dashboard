import { IGeoZoneProps } from "@/shared/types";
import { latLng } from "leaflet";
import { Polygon, Popup } from "react-leaflet";
import { MapCardGeoZone } from "../mapCardGeoZone";

export const MapGeoZone = ({ geoZone }: IGeoZoneProps) => {
  return (
    <Polygon
      positions={geoZone.points.map((coords) => latLng(coords.lat, coords.lng))}
      key={geoZone.id}
      pathOptions={{ color: `#${geoZone.color}` }}
    >
      <Popup>
        <MapCardGeoZone geoZone={geoZone} />
      </Popup>
    </Polygon>
  );
};

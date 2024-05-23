import { IGeoZoneProps } from "@/shared/types";
import { MapCard } from "../mapCard/mapCard";

export const MapCardGeoZone = ({ geoZone }: IGeoZoneProps) => {
  return (
    <MapCard>
      <MapCard.Header children={geoZone.name} />
      <MapCard.Content>
        <div>ID: {geoZone.id}</div>
        <div>Тип: {geoZone.type}</div>
      </MapCard.Content>
    </MapCard>
  );
};

import { IBuildingProps } from "@/shared/types";
import { MapCard } from "../mapCard/mapCard";

export const MapCardBuilding = ({ building }: IBuildingProps) => {
  return (
    <MapCard>
      <MapCard.Header children={building.name} />
      <MapCard.Content>
        <span>ID: {building.id}</span>
        <span>Тип: {building.type}</span>
        <span>Адрес: {building.address}</span>
      </MapCard.Content>
    </MapCard>
  );
};

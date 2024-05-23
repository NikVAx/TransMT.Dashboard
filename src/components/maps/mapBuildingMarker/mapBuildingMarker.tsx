import { Marker, Popup } from "react-leaflet";
import { MapCardBuilding } from "../mapCardBuilding";
import { toLatLng } from "@/features";
import { IBuildingProps } from "@/shared/types";

export const MapBuildingMarker = ({ building }: IBuildingProps) => {
  return (
    <Marker position={toLatLng(building.location)}>
      <Popup>
        <MapCardBuilding building={building} />
      </Popup>
    </Marker>
  );
};

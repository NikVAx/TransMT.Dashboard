import { toLatLng } from "@/features";
import { IBuildingProps } from "@/shared/types";
import { MapConsumer } from "@/shared/utils/leaflet";
import { Button } from "primereact/button";

export const BuildingSideNode = ({ building }: IBuildingProps) => {
  return (
    <div className="flex gap-1">
      <div>{building.name}</div>
      <MapConsumer>
        {(map) => (
          <Button
            style={{ flex: "0 0 2rem", height: "2rem" }}
            className="ml-auto"
            icon="pi pi-fw pi-map-marker"
            outlined
            text
            onClick={() => {
              map.flyTo(toLatLng(building.location), 16);
            }}
          />
        )}
      </MapConsumer>
    </div>
  );
};

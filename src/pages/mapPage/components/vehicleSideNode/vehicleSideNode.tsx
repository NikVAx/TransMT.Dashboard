import { toLatLng } from "@/features";
import { IVehicleProps } from "@/shared/types";
import { MapConsumer } from "@/shared/utils/leaflet";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";

export const VehicleSideNode = observer(({ vehicle }: IVehicleProps) => {
  return (
    <div className="flex w-full align-items-center">
      <div>{vehicle.number}</div>
      <MapConsumer>
        {(map) => {
          if (vehicle.latlng) {
            return (
              <Button
                style={{ flex: "0 0 2rem", height: "2rem" }}
                className="ml-auto"
                icon="pi pi-fw pi-map-marker"
                outlined
                text
                onClick={() => {
                  if (vehicle.latlng) {
                    map.flyTo(toLatLng(vehicle.latlng), 16);
                  }
                }}
              />
            );
          }
        }}
      </MapConsumer>
    </div>
  );
});

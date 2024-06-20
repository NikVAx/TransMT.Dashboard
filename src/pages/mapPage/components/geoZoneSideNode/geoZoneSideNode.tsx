import { IGeoZoneProps } from "@/shared/types";
import { MapConsumer } from "@/shared/utils/leaflet";
import { Button } from "primereact/button";

export const GeoZoneSideNode = ({ geoZone }: IGeoZoneProps) => {
  return (
    <div className="flex w-full align-items-center">
      <span>{geoZone.name}</span>
      <MapConsumer>
        {(map) => (
          <Button
            style={{ flex: "0 0 2rem", height: "2rem" }}
            className="ml-auto"
            icon="pi pi-fw pi-map-marker"
            outlined
            text
            onClick={() => {
              map.fitBounds(geoZone.points.map((x) => [x.lat, x.lng]));
            }}
          />
        )}
      </MapConsumer>
    </div>
  );
};

import { MapPolygonStore } from "@/features/maps";
import { useMapMouseOver } from "@/shared/hooks";
import { StoreProps } from "@/shared/types";
import { observer } from "mobx-react-lite";
import { Polyline } from "react-leaflet";

export const PredictZonePolyline = observer(
  ({ store }: StoreProps<MapPolygonStore>) => {
    const [position] = useMapMouseOver();

    return (
      <>
        {store.isEditing && position && !store.isComplited && (
          <>
            {store.nodes.at(-1) && (
              <Polyline
                dashArray={[16, 16]}
                positions={[store.nodes.at(-1)!.position!, position!]}
                color="black"
              />
            )}
            {store.nodes.at(0) && store.countOfPoints > 1 && (
              <Polyline
                weight={1.5}
                positions={[store.nodes.at(0)!.position!, position!]}
                color="black"
              />
            )}
          </>
        )}
        {store.isEditing && (
          <Polyline
            pathOptions={{ color: "black" }}
            positions={[...store.getPositions()]}
          />
        )}
      </>
    );
  }
);

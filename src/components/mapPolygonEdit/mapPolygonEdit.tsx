import { MapDragNode, MapPolygonStore } from "@/features/maps";
import { StoreProps } from "@/shared/types";
import { observer } from "mobx-react-lite";
import { useMapEvent } from "react-leaflet";
import { MapWidget } from "../mapCard";
import { Button } from "primereact/button";
import {
  EdgePolygonNodes,
  PredictZonePolyline,
  VerticesPolygonNodes,
} from "./components";

export const MapPolygonEdit = observer(
  ({ store }: StoreProps<MapPolygonStore>) => {
    useMapEvent("click", (e) => {
      if (store.isEditing && !store.isComplited) {
        store.push(new MapDragNode(e.latlng, store.countOfPoints));
      }
    });

    const onEditStart = () => {
      store.toggleEditing();
    };

    const onEditEnd = () => {
      store.toggleEditing();
    };

    return (
      <>
        <MapWidget position="topright">
          <div className="flex gap-2" style={{ marginRight: "3rem" }}>
            {!store.isEditing && (
              <Button label="Начать редактирование" onClick={onEditStart} />
            )}
            {store.isEditing && (
              <Button
                label="Завершить редактирование"
                severity="success"
                onClick={onEditEnd}
              />
            )}
          </div>
        </MapWidget>
        <PredictZonePolyline store={store} />
        <VerticesPolygonNodes store={store} />
        <EdgePolygonNodes store={store} />
      </>
    );
  }
);

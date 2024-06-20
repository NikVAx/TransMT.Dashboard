import { MapDragNode, MapPolygonStore } from "@/features/maps";
import { IStoreProps } from "@/shared/types";
import { observer } from "mobx-react-lite";
import { useMap, useMapEvent } from "react-leaflet";
import { MapWidget } from "..";
import { Button } from "primereact/button";
import {
  EdgePolygonNodes,
  PredictZonePolyline,
  VerticesPolygonNodes,
} from "./components";
import { useEffect } from "react";

export const MapPolygonEdit = observer(
  ({ store }: IStoreProps<MapPolygonStore>) => {
    useMapEvent("click", (e) => {
      if (store.isEditing && !store.isComplited) {
        store.push(new MapDragNode(e.latlng, store.countOfPoints));
      }
    });

    const map = useMap();

    useEffect(() => {
      if (store.countOfPoints > 3) {
        map.fitBounds(store.getPositions().map((x) => [x.lat, x.lng]));
      }
    }, [store.nodes]);

    const onEditStart = () => {
      store.toggleEditing();
    };

    const onEditEnd = () => {
      store.toggleEditing();
      if (store.countOfPoints >= 3) {
        store.isComplited = true;
      }
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

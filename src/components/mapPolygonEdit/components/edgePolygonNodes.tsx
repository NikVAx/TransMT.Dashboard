import { MapDragNode, MapPolygonStore } from "@/features/maps";
import { IStoreProps } from "@/shared/types";
import { mapPairsByRing } from "@/shared/utils";
import { latLng } from "leaflet";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { Marker } from "react-leaflet";
import { editCircle } from "../resources/icons";

export const EdgePolygonNodes = observer(
  ({ store }: IStoreProps<MapPolygonStore>) => {
    const mapEdgeNode = useCallback((a: MapDragNode, b: MapDragNode) => {
      return new MapDragNode(
        latLng(
          (a.position.lat + b.position.lat) / 2,
          (a.position.lng + b.position.lng) / 2
        ),
        a.id
      );
    }, []);

    return (
      <>
        {store.isEditing &&
          store.countOfPoints > 1 && [
            ...mapPairsByRing(store.nodes, mapEdgeNode).map((node, i) => {
              node.toggleDraggable();
              return (
                <Marker
                  key={"emp" + i}
                  icon={editCircle}
                  position={node.position}
                  eventHandlers={{
                    click: () => {
                      node.toggleDraggable();
                      store.insertAt(i + 1, node);
                    },
                  }}
                />
              );
            }),
          ]}
      </>
    );
  }
);

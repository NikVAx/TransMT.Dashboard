import { MapPolygonStore } from "@/features/maps";
import { StoreProps } from "@/shared/types";
import { LatLng } from "leaflet";
import { observer } from "mobx-react-lite";
import { Marker } from "react-leaflet";
import { editSquare, editSquareMain } from "../resources/icons";

export const VerticesPolygonNodes = observer(
  ({ store }: StoreProps<MapPolygonStore>) => {
    return (
      <>
        {store.isEditing && [
          ...store.nodes.map((node, i) => {
            return (
              <Marker
                key={"evp" + i}
                position={node.position}
                draggable={node.isDraggable}
                icon={i === 0 ? editSquareMain : editSquare}
                eventHandlers={{
                  click: () => {
                    if (i === 0) {
                      store.isEditing = false;
                      store.isComplited = true;
                      return;
                    }

                    store.removeAt(i);
                  },
                  drag: (e) => {
                    node.setPosition(e.target._latlng as LatLng);
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

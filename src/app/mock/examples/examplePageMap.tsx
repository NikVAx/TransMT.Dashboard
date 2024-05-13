import { MapBox, MapTabControl } from "@/components";

import { MapPolygonEdit } from "@/components/mapPolygonEdit/mapPolygonEdit";
import { MapPolygonStore } from "@/features/maps";
import { observer } from "mobx-react-lite";
import { Polygon, TileLayer } from "react-leaflet";

const editPolygonStore = new MapPolygonStore();

export const ExamplePageMap = observer(() => {
  return (
    <MapBox center={[59.938784, 30.314997]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapTabControl />

      <Polygon positions={editPolygonStore.getPositions()} />
      <MapPolygonEdit store={editPolygonStore} />
    </MapBox>
  );
});

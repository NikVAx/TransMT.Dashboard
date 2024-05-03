import { MapBox, MapTabControl } from "@/components";
import { TileLayer } from "react-leaflet";

export const ExamplePageMap = () => {
  return (
    <MapBox center={[59.938784, 30.314997]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapTabControl/>
    </MapBox>
  );
};

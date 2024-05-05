import { Marker, TileLayer, useMapEvent } from "react-leaflet";
import { MapBox } from "../mapBox";
import { LatLng, LeafletMouseEventHandlerFn } from "leaflet";
import {  useState } from "react";
import { getAddressByGeopointFromDadataRequest } from "@/features/maps";
import {
  ISuggestions,
} from "@/features/maps/geocoding/geocoding.types";

export type MapClickProps = {
  onClick: LeafletMouseEventHandlerFn;
};

export const MapClickEvent = ({ onClick }: MapClickProps) => {
  const [pos, setPos] = useState<LatLng | null>(null);
  useMapEvent("click", (e) => {
    onClick(e);
    setPos(e.latlng);
  });

  return pos ? <Marker position={pos} /> : null;
};

export interface OnSelectAdressArgs {
  status: boolean;
  latlng: LatLng;
  address?: string;
  data?: ISuggestions;
}

export interface MapSelectAddressProps {
  onSelect?: (args: OnSelectAdressArgs) => void;
}

export const MapSelectAddress = ({ onSelect }: MapSelectAddressProps) => {
  return (
    <MapBox center={[59.938784, 30.314997]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickEvent
        onClick={async (e) => {
          if (!onSelect) return;

          const [status, response] =
            await getAddressByGeopointFromDadataRequest(e.latlng);

          const data = response as ISuggestions;

          if (status && data.suggestions.length > 0) {
            onSelect({
              status: true,
              address: data.suggestions[0].address,
              data: data,
              latlng: e.latlng,
            });
          } else {
            onSelect({ status: false, latlng: e.latlng });
          }
        }}
      />
    </MapBox>
  );
};

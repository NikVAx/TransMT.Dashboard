import { Marker, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { MapBox } from "../mapBox";
import { LatLng, LeafletMouseEvent, LeafletMouseEventHandlerFn} from "leaflet";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export type MapClickProps = {
  onClick: LeafletMouseEventHandlerFn;
};

export const MapClickEvent = ({ onClick }: MapClickProps) => {
  useMapEvent("click", (e) => {
    onClick(e);
  });
  return null;
};

export interface MapSelectAddressProps {
  onChange?: (event: LeafletMouseEvent) => void;
  position: LatLng;
  isLoading?: boolean
}

export const MapSelectAddressBody = ({
  onChange,
  ...props
}: MapSelectAddressProps) => {
  const [position, setPosition] = useState(props.position);
  const map = useMap();

  useEffect(() => {
    setPosition(props.position);
    map.flyTo(props.position);
  }, [props.position]);

  return (
    <>
      <MapClickEvent
        onClick={(event) => {
          setPosition(event.latlng.wrap());

          if (!onChange) return;

          onChange(event);
        }}
      />
      <Marker position={position} />
    </>
  );
};

export const MapSelectAddress = (props: MapSelectAddressProps) => {
  return (
    !props.isLoading ? <MapBox center={props.position} zoom={13} minZoom={2} maxBounds={[[-90,-180],   [90,180]]}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapSelectAddressBody {...props} />
    </MapBox> : <div className="flex h-full w-full" style={{background: "lightgray"}}>
    <ProgressSpinner style={{alignSelf: "center"}}/>
    </div>
  );
};

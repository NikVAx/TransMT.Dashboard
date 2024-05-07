import { PropsWithChildren } from "react";
import {
  AttributionControl,
  MapContainer,
  MapContainerProps,
  ZoomControl,
} from "react-leaflet";

export const MapBox = ({
  children,
  ...props
}: PropsWithChildren & MapContainerProps) => {
  return (
    <MapContainer
      {...props}
      style={{ height: "100%" }}
      attributionControl={false}
      zoomControl={false}
    >
      {children}
      <AttributionControl position="bottomright" prefix={false} />
      <ZoomControl position="topright" />
    </MapContainer>
  );
};

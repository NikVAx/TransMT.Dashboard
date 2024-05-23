import { PropsWithChildren } from "react";
import {
  AttributionControl,
  MapContainer,
  MapContainerProps,
  ZoomControl,
} from "react-leaflet";
import styles from "./maxBox.module.css";
import { classNames } from "primereact/utils";

export const MapBox = ({
  children,
  ...props
}: PropsWithChildren & MapContainerProps) => {
  return (
    <MapContainer
      {...props}
      className={classNames(styles.mapBox, props.className)}
      style={props.style}
      attributionControl={false}
      zoomControl={false}
    >
      {children}
      <AttributionControl position="bottomright" prefix={false} />
      <ZoomControl position="topright" />
    </MapContainer>
  );
};

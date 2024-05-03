import "leaflet/dist/leaflet.css";
import { AttributionControl, MapContainer, ZoomControl } from "react-leaflet";

export const MapBox = ({ children, ...props }: any) => {
  return (
    <MapContainer
      style={{ height: "100%" }}
      attributionControl={false}
      zoomControl={false}
      {...props}
    >
      {children}
      <AttributionControl position="bottomright" prefix={false} />
      <ZoomControl position="topright"/>
    </MapContainer>
  );
};

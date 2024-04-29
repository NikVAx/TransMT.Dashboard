import "leaflet/dist/leaflet.css";
import { AttributionControl, MapContainer } from "react-leaflet";

export const MapBox = ({ children, ...props }: any) => {
  return (
    <MapContainer
      style={{ height: "100%", width: "100%", borderRadius: "5px" }}
      attributionControl={false}
      {...props}
    >
      {children}
      <AttributionControl position="bottomright" prefix={false} />
    </MapContainer>
  );
};

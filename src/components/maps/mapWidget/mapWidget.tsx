import L from "leaflet";
import { PropsWithChildren, useEffect, useRef } from "react";

export interface MapWidgetProps extends PropsWithChildren {
  position: "topleft" | "topright"
}

const POSITION_CLASSES = {
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right"
}

export const MapWidget = ({ position, children }: MapWidgetProps) => {
  const nodeRef = useRef(null);
  useEffect(() => {
    L.DomEvent.disableClickPropagation(
      nodeRef.current as unknown as HTMLElement
    );
    L.DomEvent.disableScrollPropagation(
      nodeRef.current as unknown as HTMLElement
    );
  }, [nodeRef]);

  return (
    <div className={POSITION_CLASSES[position]}>
      <div
        className="leaflet-control leaflet-bar"
        style={{
          borderWidth: children ? "0" : "1px",
        }}
        ref={nodeRef}
      >
        {children}
      </div>
    </div>
  );
};

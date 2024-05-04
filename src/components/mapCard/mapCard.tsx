import L from "leaflet";
import { PropsWithChildren, useEffect, useRef } from "react";

export const MapCard = ({ children }: PropsWithChildren) => {
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
    <div className={"leaflet-top leaflet-right"}>
      <div
        className="leaflet-control leaflet-bar"
        style={{
          right: "3rem",
          borderWidth: children ? "0" : "1px",
        }}
        ref={nodeRef}
      >
        {children}
      </div>
    </div>
  );
};

import L from "leaflet";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "./mapTabControl.module.css";
import { Button } from "primereact/button";

export const MapTabControl = ({ children }: PropsWithChildren) => {
  const [isClosed, setIsClosed] = useState(true);

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
    <div
      className={"leaflet-left leaflet-top leaflet-bottom"}
      style={{
        height: "100% - 5rem",
      }}
    >
      <div
        className="leaflet-control leaflet-bar"
        style={{
          background: "white",
          width: isClosed ? "auto" : "calc(100% - 20px)",
          height: isClosed ? "auto" : "calc(100% - 20px)",
        }}
        ref={nodeRef}
      >
        <div
          style={{
            width: isClosed ? "auto" : "420px",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className={styles.tabBox}
            style={{ borderBottomWidth: isClosed ? "0" : "1px" }}
          >
            <Button
              className={styles.tabButton}
              outlined
              onClick={() => {
                setIsClosed(!isClosed);
              }}
            >
              {isClosed ? "СЛОИ" : "ЗАКРЫТЬ"}
            </Button>
          </div>

          {!isClosed && <div style={{ height: "100%" }}>{children}</div>}
        </div>
      </div>
    </div>
  );
};

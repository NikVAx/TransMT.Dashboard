import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import styles from "./mapTabControl.module.css";

export const MapTabControl = () => {
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
            width: isClosed ? "auto" : "280px",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className={styles.tabBox}
            style={{ borderBottomWidth: isClosed ? "0" : "1px" }}
          >
            <button
              className={styles.tabButton}
              onClick={(e) => {
                setIsClosed(!isClosed);
              }}
              style={{}}
            >
              {isClosed ? "СЛОИ" : "X"}
            </button>
            {!isClosed &&
              ["Здания", "Геозоны", "Транспорт"].map((name) => {
                return <button className={styles.tabButton}>{name}</button>;
              })}
          </div>

          {!isClosed && <div style={{ height: "100%" }}></div>}
        </div>
      </div>
    </div>
  );
};

import styles from "./layout.module.css";
import { useLayout } from "./context/layout.hooks";
import { PropsWithChildren } from "react";

export function LayoutContent({ children }: PropsWithChildren) {
  const { isSidebarOpen, displayMode, config } = useLayout();

  return (
    <div
      className={styles.layoutContent}
      style={{
        paddingLeft:
          isSidebarOpen && displayMode === "large"
            ? config.sidebarOpenWidth
            : config.sidebarClosedWidth,
      }}
    >
      {children}
    </div>
  );
}

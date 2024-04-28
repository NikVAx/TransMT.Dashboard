import styles from "../../layout.module.css";
import { useLayout } from "../../context/layout.hooks";
import { AppMenu } from "../appMenu/appMenu";
import { Sidebar } from "primereact/sidebar";

export function LayoutSidebar() {
    const { isSidebarOpen, setIsSidebarOpen, displayMode, config } = useLayout();
  
    const Content = () => (
      <div className={styles.sidebarMenuContainer}>
        <AppMenu />
      </div>
    );
  
    return displayMode === "large" ? (
      <div
        className={styles.layoutSidebar}
        style={{
          width: isSidebarOpen
            ? config.sidebarOpenWidth
            : config.sidebarClosedWidth,
          borderWidth: isSidebarOpen 
            ? "1px" : "0"
        }}
      >
        <Content />
      </div>
    ) : (
      <Sidebar visible={isSidebarOpen} onHide={() => setIsSidebarOpen(false)} style={{borderRadius: "8px"}}>
        <Content />
      </Sidebar>
    );
  }
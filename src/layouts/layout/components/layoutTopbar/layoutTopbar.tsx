import styles from "../../layout.module.css";
import { Button } from "primereact/button";
import { useLayout } from "../../context/layout.hooks";

export function LayoutTopbar() {
  const { setIsSidebarOpen } = useLayout();

  const onSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className={styles.layoutTopbar}>
      <Button
        style={{width: "2rem", height: "2rem"}}
        icon="pi pi-bars"
        rounded
        text
        aria-label="Sidebar"
        onClick={onSidebarToggle}
      />
    </div>
  );
}

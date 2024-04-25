import styles from "./layout.module.css";
import { PropsWithChildren } from "react";
import { LayoutTopbar } from "./components/layoutTopbar/layoutTopbar";
import { LayoutContent } from "./components/layoutContent/layoutContent";
import { LayoutSidebar } from "./components/layoutSidebar/layoutSidebar";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.layoutContainer}>
      <LayoutTopbar />
      <LayoutSidebar />
      <LayoutContent>{children}</LayoutContent>
    </div>
  );
}

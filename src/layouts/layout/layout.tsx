import styles from "./layout.module.css";
import { PropsWithChildren } from "react";
import { LayoutTopbar } from "./layoutTopbar";
import { LayoutContent } from "./layoutContent";
import { LayoutSidebar } from "./layoutSidebar";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.layoutContainer}>
      <LayoutTopbar />
      <LayoutSidebar />
      <LayoutContent>{children}</LayoutContent>
    </div>
  );
}

import { View } from "../view";
import styles from "./panelV.module.css";
import { PanelVProps } from "./panelV.types";

export const PanelV = ({
  title,
  children,
  header
}: PanelVProps) => {
  return (
    <View className={styles.wrapper}>
      <div className={styles.header} style={header}>
        <span className={styles.headerText}>{title}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </View>
  );
};

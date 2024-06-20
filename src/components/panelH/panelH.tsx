import { View } from "../view";
import styles from "./panelH.module.css";
import { PanelHProps } from "./panelH.types";

export const PanelH = ({
  title,
  children,
  header
}: PanelHProps) => {
  return (
    <View className={styles.wrapper}>
      <div className={styles.header} style={header}>
        <span className={styles.headerText}>{title}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </View>
  );
};

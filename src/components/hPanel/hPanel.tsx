import { View } from "../view";
import styles from "./hPanel.module.css";
import { HPanelProps } from "./hPanel.types";

export const HPanel = ({
  title,
  children,
  header
}: HPanelProps) => {
  return (
    <View className={styles.wrapper}>
      <div className={styles.header} style={header}>
        <span className={styles.headerText}>{title}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </View>
  );
};

import { TabMenu } from "primereact/tabmenu";
import styles from "./profilePage.module.css";
import { View } from "@/components";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { ProfileSection, SessionsSection } from "./components";

const ImageSection = () => {
  return (
    <View variant="ground" style={{ margin: "1.25rem", height: "14rem" }} />
  );
};

export const ProfilePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const items = [
    { label: "Данные пользователя", icon: "pi pi-id-card", tab: <ProfileSection/> },
    { label: "Входы в систему", icon: "pi pi-key", tab: <SessionsSection/> },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <View className={styles.rightDataWrapper}>
          <div>
            <TabMenu
              className={classNames(styles.tabmenu)}
              model={items}
              activeIndex={tabIndex}
              onTabChange={(e) => {
                setTabIndex(e.index);
              }}
            />
          </div>
          <div className={styles.rightDataWrapperContent}>
            {items[tabIndex].tab}
          </div>
        </View>
      </div>
    </div>
  );
};

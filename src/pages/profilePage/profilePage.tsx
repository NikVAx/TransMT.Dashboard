import { TabMenu } from "primereact/tabmenu";
import styles from "./profilePage.module.css";
import { View } from "@/components";
import { classNames } from "primereact/utils";
import { Outlet, useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Данные пользователя",
      icon: "pi pi-id-card",
      command: () => navigate("/accounts/me"),
    },
    {
      label: "Входы в систему",
      icon: "pi pi-key",
      command: () => navigate("/accounts/sessions"),
    },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <View className={styles.rightDataWrapper}>
          <div>
            <TabMenu className={classNames(styles.tabmenu)} model={items} />
          </div>
          <div className={styles.rightDataWrapperContent}>
            <Outlet />
          </div>
        </View>
      </div>
    </div>
  );
};

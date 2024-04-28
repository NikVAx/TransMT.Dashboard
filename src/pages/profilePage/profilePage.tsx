import { TabMenu } from "primereact/tabmenu";
import styles from "./profilePage.module.css";
import { HPanel, View } from "@/components";
import { InputText } from "primereact/inputtext";
import { useStore } from "@/app/store";
import { Panel } from "primereact/panel";
import { createArray } from "@/shared/utils";
import { classNames } from "primereact/utils";

const VPanel = () => {
  return (
    <Panel
      header="Другая информация"
      pt={{
        content: {
          style: { display: "flex", flexDirection: "column", gap: "20px" },
        },
      }}
    >
      {createArray(10).map((_, i) => {
        return <div style={{ background: "black", height: "20px" }} key={i} />;
      })}
    </Panel>
  );
};

const ImageSection = () => {
  return (
    <View variant="ground" style={{ margin: "1.25rem", height: "14rem" }} />
  );
};

const FormSection = () => {
  const authStore = useStore((store) => store.authStore);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
        gap: "1rem",
      }}
    >
      <HPanel
        title="Основная информация"
        header={{ width: "12rem", minWidth: "12rem" }}
      >
        <div className="flex flex-column gap-2" style={{ width: "100%" }}>
          <label htmlFor="username">Имя пользователя</label>
          <InputText
            id="username"
            value={authStore.user?.username}
            style={{ width: "100%" }}
          />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="email">Электронная почта</label>
          <InputText id="email" value={authStore.user?.email} />
        </div>
      </HPanel>
      <VPanel />
    </div>
  );
};

export const ProfilePage = () => {
  const items = [
    { label: "Данные пользователя", icon: "pi pi-id-card" },
    { label: "Входы в систему", icon: "pi pi-key" },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <View className={styles.leftDataWrapper}>
          <ImageSection />
        </View>
        <View className={styles.rightDataWrapper}>
          <div>
            <TabMenu className={classNames(styles.tabmenu)} model={items} />
          </div>
          <div className={styles.rightDataWrapperContent}>
            <FormSection />
          </div>
        </View>
      </div>
    </div>
  );
};

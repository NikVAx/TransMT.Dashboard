import { TabMenu } from "primereact/tabmenu";
import styles from "./profilePage.module.css";
import { HPanel, View } from "@/components";
import { InputText } from "primereact/inputtext";
import { useStore } from "@/app/store";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { STATES } from "@/shared/constants/constants";

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
      <div className="flex flex-row-reverse gap-2">
        <Button>Сохранить</Button>
        <Button outlined>Отмена</Button>
      </div>
    </div>
  );
};

const formatDate = (value: Date) => {
  return value.toLocaleDateString() + " - " + value.toLocaleTimeString();
};

const SessionsSection = observer(() => {
  const { authStore, sessionStore } = useStore((store) => ({
    authStore: store.authStore,
    sessionStore: store.sessionStore,
  }));

  useEffect(() => {
    sessionStore.getSessions();
  }, []);

  return (
    <View>
      <DataTable
        value={sessionStore.sessions}
        tableStyle={{ minWidth: "50rem" }}
        loading={sessionStore.state === STATES.LOADING}
      >
        <Column
          field="createdAt"
          header="Создана"
          dataType="date"
          body={(s) => formatDate(s.createdAt)}
        />
        <Column
          field="expiredAt"
          header="Истекает"
          dataType="date"
          body={(s) => formatDate(s.expiredAt)}
        />
        <Column
          field="isBlocked"
          header="Заблокирована"
          body={(s) => (s.isBlocked ? "Да" : "Нет")}
        />
        <Column
          field="isExpired"
          header="Истекла"
          body={(s) => (s.isBlocked ? "Да" : "Нет")}
        />
      </DataTable>
    </View>
  );
});

export const ProfilePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

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
            {tabIndex === 0 ? (
              <FormSection />
            ) : tabIndex === 1 ? (
              <SessionsSection />
            ) : null}
          </div>
        </View>
      </div>
    </div>
  );
};

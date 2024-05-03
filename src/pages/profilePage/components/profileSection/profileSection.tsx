import { useStore } from "@/app/store";
import { PanelH } from "@/components";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const ProfileSection = () => {
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
      <PanelH
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
      </PanelH>
      <div className="flex flex-row-reverse gap-2">
        <Button>Сохранить</Button>
        <Button outlined>Отмена</Button>
      </div>
    </div>
  );
};

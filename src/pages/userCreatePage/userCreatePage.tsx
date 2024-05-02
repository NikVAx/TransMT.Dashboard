import { useStore } from "@/app/store";
import { PanelH } from "@/components";
import { ICreateUserDto } from "@/features";
import { STATES } from "@/shared/constants/constants";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";

export const UserCreatePage = observer(() => {
  const [user, setUser] = useState<ICreateUserDto>({
    username: "",
    email: "",
    password: "",
    roles: [ "string" ]
  });

  const userStore = useStore((x) => x.userStore);

  useEffect(() => {
    if (userStore.state === STATES.ERROR) {
      alert("Не удалось создать пользователя");
    }
  }, [userStore.state]);

  return (
    <>
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "fit-content"
        }}
      >
        <PanelH
          title="Регистрационные данные"
          header={{ width: "12rem", minWidth: "12rem" }}
        >
          <div className="flex flex-column gap-2">
            <label htmlFor="username">Имя пользователя</label>
            <InputText
              id="username"
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-column gap-2">
            <label htmlFor="email">Электронная почта</label>
            <InputText
              id="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-column gap-2">
            <label htmlFor="password">Пароль</label>
            <Password
              id="password"
              pt={{
                input: {
                  style: {
                    width: "100%",
                  },
                },
              }}
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
        </PanelH>
        <div className="flex flex-row-reverse gap-2">
          <Button
            label="Сохранить"
            onClick={async () => {
              userStore.createUser(user);
            }}
            loading={userStore.isLoading}
          />
        </div>
      </div>
    </>
  );
});

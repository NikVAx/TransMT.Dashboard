import { PanelH } from "@/components";
import { ICreateUserDto } from "@/features";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { ChangeEvent, useState } from "react";

export const UserCreatePage = () => {
  const [user, setUser] = useState<ICreateUserDto>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <>
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
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
                        width: "100%"
                    }
                }
              }}
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
        </PanelH>
        <PanelH
          title="Основная информация"
          header={{ width: "12rem", minWidth: "12rem" }}
        >
          <div className="flex flex-column gap-2">
            <label htmlFor="username">Фамилия</label>
            <InputText id="username" />
          </div>
          <div className="flex flex-column gap-2">
            <label htmlFor="email">Имя</label>
            <InputText id="email" />
          </div>
          <div className="flex flex-column gap-2">
            <label htmlFor="email">Отчество</label>
            <InputText id="email" />
          </div>
        </PanelH>
      </div>
    </>
  );
};

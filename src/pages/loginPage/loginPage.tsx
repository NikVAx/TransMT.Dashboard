import styles from "./loginPage.module.css";
import { Button } from "primereact/button";
import { SubmitHandler } from "react-hook-form";
import { FormInputPassword, FormInputText, FormWrapper } from "@/components";
import { ILoginDto, STATES } from "@/features";
import { useStore } from "@/app/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = observer(() => {
  const authStore = useStore((store) => store.authStore);

  const onSubmit: SubmitHandler<ILoginDto> = (data) => {
    console.log("onSubmit", data);

    authStore.login(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.state === STATES.DONE) {
      navigate("/");
    } else if (authStore.state === STATES.ERROR) {
      alert("Неверное имя пользователя или пароль");
    }
  }, [authStore.state]);

  const defaultValue = {
    username: "",
    password: "",
  } as ILoginDto;

  return (
    <div className={styles.layoutWrapper}>
      <FormWrapper
        className={styles.formWrapper}
        onSubmit={onSubmit}
        defaultValues={defaultValue}
      >
        <h1>Авторизация</h1>
        <FormInputText
          name="username"
          label="Имя пользователя"
          style={{ width: "100%" }}
          rules={{
            required: "Имя пользователя - обязательное поле.",
          }}
        />
        <FormInputPassword
          name="password"
          label="Пароль"
          style={{ width: "100%" }}
          rules={{ required: "Пароль - обязательное поле." }}
        />
        <Button
          type="submit"
          label="Войти"
          loading={authStore.state === STATES.LOADING}
        />
      </FormWrapper>
    </div>
  );
});

import styles from "./loginPage.module.css";
import { Button } from "primereact/button";
import { SubmitHandler } from "react-hook-form";
import { FormInputPassword, FormInputText, FormWrapper } from "@/components";
import { ILoginDto, STATES } from "@/features";
import { useStore } from "@/app/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const LoginPage = observer(() => {
  const authStore = useStore((store) => store.authStore);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ILoginDto> = async (data) => {
    console.log("onSubmit", data);

    const status = await authStore.login(data);

    if (status) {
      navigate("/");
    } else {
      alert("Неверное имя пользователя или пароль");
    }
  };

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

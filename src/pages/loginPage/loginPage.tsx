import styles from "./loginPage.module.css";
import { Button } from "primereact/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormInputErrorMessage,
  FormInputPassword,
  FormInputText,
  FormWrapper,
} from "@/components";
import { ILoginDto } from "@/features";
import { useStore } from "@/app/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { STATES } from "@/shared/constants/constants";

export const LoginPage = observer(() => {
  const authStore = useStore((store) => store.authStore);
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
  } as ILoginDto;

  const methods = useForm({ defaultValues });

  const onSubmit: SubmitHandler<ILoginDto> = async (data) => {
    const status = await authStore.login(data);

    if (status) {
      navigate("/");
    } else {
      methods.setError("root.login", {
        message: "Неверное имя пользователя или пароль!",
      });
    }
  };

  return (
    <div className={styles.layoutWrapper}>
      <FormWrapper
        className={styles.formWrapper}
        onSubmit={onSubmit}
        methods={methods}
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
        <FormInputErrorMessage root name="login" />
      </FormWrapper>
    </div>
  );
});

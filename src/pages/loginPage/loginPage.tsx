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

import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema, object, string } from "yup";

export const LoginPage = observer(() => {
  const authStore = useStore((store) => store.authStore);
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
  } as ILoginDto;

  const schema: ObjectSchema<ILoginDto> = object()
    .shape({
      username: string().required().label("Имя пользователя"),
      password: string().required().label("Пароль"),
    })
    .required();

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ILoginDto> = async (data) => {
    const status = await authStore.login(data);

    if (status.isSuccess) {
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
        />
        <FormInputPassword
          name="password"
          label="Пароль"
          style={{ width: "100%" }}
        />
        <Button
          type="submit"
          label="Войти"
          loading={authStore.isLoading}
        />
        <FormInputErrorMessage root name="login" />
      </FormWrapper>
    </div>
  );
});

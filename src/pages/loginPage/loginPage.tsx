import styles from "./loginPage.module.css";
import { Button } from "primereact/button";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { FormInputText, FormWrapper } from "@/components";

interface ILoginDto {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const onSubmit: SubmitHandler<ILoginDto> = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<ILoginDto> = (errors) => {
    console.log(errors);
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
        onError={onError}
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
        <FormInputText
          name="password"
          label="Пароль"
          style={{ width: "100%" }}
          rules={{ required: "Пароль - обязательное поле." }}
        />
        <Button type="submit" label="Войти" />
      </FormWrapper>
    </div>
  );
};

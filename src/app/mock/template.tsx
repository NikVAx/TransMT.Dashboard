import { useParams } from "react-router-dom";
import { FormInputPassword, FormInputText, FormWrapper } from "@/components";
import { Button } from "primereact/button";
import { useState } from "react";

export const PageUseParamsTemplate = () => {
  const { id, tag } = useParams();

  return <div>page {tag !== undefined ? `- ${tag}` : null} - {id}</div>;
};

export const PageUseFormExample = () => {
  const [_, setFormData] = useState<any>({});

  const defaultValues = {
    username: "",
    password: "",
  };

  const onFormSubmit = (data: any) => {
    setFormData(data);
    console.log("data", data);
  };
  const onFormErrors = (errors: any) => {
    console.log("errors", errors);
  };

  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={onFormSubmit}
      onError={onFormErrors}
      style={{
        padding: "4rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <FormInputText
        name="username"
        label="Имя пользователя"
        rules={{ required: "Имя пользователя - обязательное поле." }}
        style={{width: "100%"}}
      />

      <FormInputPassword
        name="password"
        label="Пароль"
        rules={{ required: "Пароль - обязательное для заполнения поле." }}
        style={{width: "100%"}}
      />

      <Button type="submit" label="Submit" />
    </FormWrapper>
  );
};

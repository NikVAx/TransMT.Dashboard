import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { PickList, PickListChangeEvent } from "primereact/picklist";
import { Button } from "primereact/button";
import { useStore } from "@/app/store";
import { ICreateUserDto, IRole } from "@/features";
import {
  FormInputErrorMessage,
  FormInputPassword,
  FormInputText,
  FormWrapper,
  PageButtons,
  PageWrapper,
  PanelV,
} from "@/components";
import { getUserValidationSchema } from "./configs/validation.config";
import { itemTemplate } from "./components/itemTemplate";
import { useComponentDidMount } from "@/shared/hooks";

export const UserCreatePage = observer(() => {
  const navigate = useNavigate();

  const [sourceRoles, setSourceRoles] = useState<IRole[]>([]);
  const [targetRoles, setTargetRoles] = useState<IRole[]>([]);

  const { userStore, roleStore } = useStore((x) => ({
    userStore: x.userStore,
    roleStore: x.roleStore,
  }));

  useComponentDidMount(async () => {
    roleStore.pagination.pageSize = 20000;
    await roleStore.getRolesPage();
    setSourceRoles(roleStore.roles);
  });

  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      middleName: "",
      roles: [],
    } as ICreateUserDto,
    resolver: yupResolver(getUserValidationSchema()),
  });

  const onSubmit: SubmitHandler<ICreateUserDto> = async (data) => {
    if (targetRoles.length === 0) {
      methods.setError("root.roles", {
        message: "Не выбрана ни одна роль.",
      });
      return;
    }

    const createDto = {
      ...data,
      roles: targetRoles.map((x) => x.name),
    } as ICreateUserDto;

    console.log(createDto);

    const status = await userStore.createUser(createDto);

    if (status.isSuccess) {
      navigate("/identity/users");
    } else {
      alert("Не удалось создать пользователя");
    }
  };

  const onSubmitError: SubmitErrorHandler<ICreateUserDto> = async () => {
    if (targetRoles.length === 0) {
      methods.setError("root.roles", {
        message: "Не выбрана ни одна роль.",
      });
    }
  };

  const onChange = (event: PickListChangeEvent) => {
    setSourceRoles(event.source);
    setTargetRoles(event.target);
  };

  return (
    <PageWrapper>
      <FormWrapper
        onSubmit={onSubmit}
        onError={onSubmitError}
        methods={methods}
      >
        <PanelV>
          <PanelV.Header>Персональные данные</PanelV.Header>
          <PanelV.Content>
            <FormInputText
              labelType="fixed"
              name="lastName"
              label="Фамилия"
              placeholder=""
            />
            <FormInputText
              labelType="fixed"
              name="firstName"
              label="Имя"
              placeholder=""
            />
            <FormInputText
              labelType="fixed"
              name="middleName"
              label="Отчество (необязательно)"
              placeholder=""
            />
          </PanelV.Content>
        </PanelV>
        <PanelV>
          <PanelV.Header>Основная информация</PanelV.Header>
          <PanelV.Content>
            <FormInputText
              labelType="fixed"
              name="username"
              label="Имя пользователя"
              placeholder="Имя пользователя для входа в систему, например: example-manager"
            />
            <FormInputText
              labelType="fixed"
              name="email"
              label="Электронная почта"
              placeholder="Электронная почта, например: my-example@ex.com"
            />
            <FormInputPassword
              labelType="fixed"
              name="password"
              label="Пароль"
              placeholder="Пароль"
            />
          </PanelV.Content>
        </PanelV>

        <PickList
          dataKey="id"
          source={sourceRoles}
          target={targetRoles}
          onChange={onChange}
          itemTemplate={itemTemplate}
          filter
          filterBy="name"
          breakpoint="1280px"
          sourceHeader="Доступные роли"
          targetHeader="Выбранные роли"
          sourceStyle={{ height: "24rem" }}
          targetStyle={{ height: "24rem" }}
          sourceFilterPlaceholder="Поиск по названию"
          targetFilterPlaceholder="Поиск по названию"
          showSourceControls={false}
          showTargetControls={false}
        />
        <FormInputErrorMessage root name="roles" />

        <PageButtons>
          <Button
            label="Сохранить"
            type="submit"
            loading={userStore.isLoading}
          />
        </PageButtons>
      </FormWrapper>
    </PageWrapper>
  );
});

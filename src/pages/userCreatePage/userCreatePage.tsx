import { useStore } from "@/app/store";
import {
  FormInputErrorMessage,
  FormInputPasswordStatic,
  FormInputTextStatic,
  FormWrapper,
  PageWrapper,
  PanelV,
} from "@/components";
import { ICreateUserDto, IRole } from "@/features";
import { STATES } from "@/shared/constants/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { PickList, PickListChangeEvent } from "primereact/picklist";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { getUserValidationSchema } from "./configs/validation.config";
import { useNavigate } from "react-router-dom";

export const UserCreatePage = observer(() => {
  const { userStore, roleStore } = useStore((x) => ({
    userStore: x.userStore,
    roleStore: x.roleStore,
  }));
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    roles: [],
  } as ICreateUserDto;

  const [sourceRoles, setSourceRoles] = useState<IRole[]>([]);
  const [targetRoles, setTargetRoles] = useState<IRole[]>([]);

  const initialize = async () => {
    roleStore.pagination.pageSize = 20000;
    await roleStore.getRolesPage();
    setSourceRoles(roleStore.roles);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (userStore.state === STATES.ERROR) {
      alert("Не удалось создать пользователя");
      userStore.state = STATES.INITIAL;
    }
    else if (userStore.state === STATES.DONE) {
      navigate("/identity/users");
    }
  }, [userStore.state]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(getUserValidationSchema()),
  });

  const onSubmit: SubmitHandler<ICreateUserDto> = async (data) => {
    if (targetRoles.length === 0) {
      methods.setError("root.roles", {
        message: "Не выбрана ни одна роль.",
      });
    } else {
      
      userStore.createUser({
        ...data,
        roles: ["string"] /* TODO: fix backend: target.map(x => x.name)*/,
      });
    }
  };

  const onSubmitError: SubmitErrorHandler<ICreateUserDto> = async (e) => {
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
  const itemTemplate = (item: IRole) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <span className="font-bold">{item.name}</span>
      </div>
    );
  };

  return (
    <PageWrapper>
      <FormWrapper
        onSubmit={onSubmit}
        onError={onSubmitError}
        methods={methods}
      >
        <PanelV title="Основная информация">
          <FormInputTextStatic name="username" label="Имя пользователя" placeholder="Введите имя пользователя, например: example-username"/>
          <FormInputTextStatic name="email" label="Электронная почта" placeholder="Введите электронную почту, например: my-example@ex.com"/>
          <FormInputPasswordStatic name="password" label="Пароль" placeholder="Введите пароль"/>
        </PanelV>

        <PickList
          style={{
            marginTop: "20px",
          }}
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

        <div
          className="flex flex-row-reverse gap-2"
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Button
            label="Сохранить"
            type="submit"
            loading={userStore.isLoading}
          />
        </div>
      </FormWrapper>
    </PageWrapper>
  );
});

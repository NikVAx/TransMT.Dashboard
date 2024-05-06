import {
  FormInputErrorMessage,
  FormInputText,
  FormWrapper,
  PageWrapper,
  PanelV,
} from "@/components";
import { getRoleValidationSchema } from "./config/validation.config";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ICreateRoleDto } from "@/features";
import { useStore } from "@/app/store";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { PickList, PickListChangeEvent } from "primereact/picklist";
import { IPermission } from "@/features/identity/permissions";
import { useNavigate } from "react-router-dom";

export const RoleCreatePage = () => {
  const navigate = useNavigate();

  const { permissionStore, roleStore } = useStore((x) => ({
    permissionStore: x.permissionStore,
    roleStore: x.roleStore,
  }));

  const [sourcePermissions, setSourcePermissions] = useState<IPermission[]>([]);
  const [targetPermissions, setTargetPermissions] = useState<IPermission[]>([]);

  const initialize = async () => {
    await permissionStore.fetchPermissions();
    setSourcePermissions(permissionStore.permissions);
  };

  useEffect(() => {
    initialize();
  }, []);

  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    } as ICreateRoleDto,
    resolver: yupResolver(getRoleValidationSchema()),
  });

  const onSubmit: SubmitHandler<ICreateRoleDto> = async (data) => {
    if (targetPermissions.length === 0) {
      methods.setError("root.permissions", {
        message: "Должно быть выбрано по крайней мере одно разрешение",
      });
    } else {
      const status = await roleStore.createRole({
        ...data,
        permissions: targetPermissions.map((x) => x.name),
      });
      if (status.isSuccess) {
        navigate("/identity/roles");
      }
    }
  };

  const onSubmitError: SubmitErrorHandler<ICreateRoleDto> = async () => {
    if (targetPermissions.length === 0) {
      methods.setError("root.permissions", {
        message: "Должно быть выбрано по крайней мере одно разрешение",
      });
    }
  };

  const onChange = (event: PickListChangeEvent) => {
    setSourcePermissions(event.source);
    setTargetPermissions(event.target);
  };

  const itemTemplate = (item: IPermission) => {
    return (
      <div className="flex flex-column flex-wrap p-1 align-items-left">
        <div className="flex flex-wrap p-1 align-items-center">
          <small>{item.id}</small>
        </div>
        <div className="flex flex-wrap p-1 align-items-center">
          <span className="font-bold">{item.name}</span>
        </div>
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
          <FormInputText
            labelType="fixed"
            name="name"
            label="Название"
            placeholder="Название роли, например: Администратор"
          />
          <FormInputText
            labelType="fixed"
            name="description"
            label="Описание"
            placeholder='Описание роли, например: "Может выполнять все действия в системе"'
          />
        </PanelV>
        <PickList
          dataKey="id"
          onChange={onChange}
          itemTemplate={itemTemplate}
          filter
          filterBy="name"
          breakpoint="1280px"
          source={sourcePermissions}
          target={targetPermissions}
          sourceHeader="Доступные разрешения"
          targetHeader="Выбранные разрешения"
          sourceStyle={{ height: "24rem" }}
          targetStyle={{ height: "24rem" }}
          sourceFilterPlaceholder="Поиск по названию"
          targetFilterPlaceholder="Поиск по названию"
          showSourceControls={false}
          showTargetControls={false}
        />
        <FormInputErrorMessage root name="permissions" />
        <div
          className="flex flex-row-reverse gap-2"
          style={{
            paddingBottom: "20px",
          }}
        >
          <Button
            label="Сохранить"
            type="submit"
            loading={roleStore.isLoading}
          />
        </div>
      </FormWrapper>
    </PageWrapper>
  );
};

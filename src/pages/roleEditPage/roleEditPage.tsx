import {
  FormInputErrorMessage,
  FormInputText,
  FormWrapper,
  PageWrapper,
  PanelV,
} from "@/components";
import { getRoleValidationSchema } from "../roleCreatePage/config/validation.config";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ICreateRoleDto, IEditRoleDto } from "@/features";
import { useStore } from "@/app/store";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { PickList, PickListChangeEvent } from "primereact/picklist";
import { IPermission } from "@/features/identity/permissions";
import { useNavigate, useParams } from "react-router-dom";

export const RoleEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { permissionStore, roleStore } = useStore((x) => ({
    permissionStore: x.permissionStore,
    roleStore: x.roleStore,
  }));

  const [sourcePermissions, setSourcePermissions] = useState<IPermission[]>([]);
  const [targetPermissions, setTargetPermissions] = useState<IPermission[]>([]);

  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    } as IEditRoleDto,
    resolver: yupResolver(getRoleValidationSchema()),
  });

  const initialize = async () => {
    if (!id) return navigate("/not-found");

    const status = await roleStore.getRoleById(id);

    if (!status.isSuccess) {
      return navigate("/not-found");
    }

    await permissionStore.fetchPermissions();

    const separated = permissionStore.getSeparated(status.data!.permissions);

    methods.reset({ ...status.data! });

    setSourcePermissions(separated.excluded);
    setTargetPermissions(separated.included);
  };

  useEffect(() => {
    initialize();
  }, []);

  const onSubmit: SubmitHandler<ICreateRoleDto> = async (data) => {
    if (targetPermissions.length === 0) {
      methods.setError("root.permissions", {
        message: "Должно быть выбрано по крайней мере одно разрешение",
      });
    } else {
      const responseData = await roleStore.editRoleById(id!, {
        ...data,
        permissions: targetPermissions.map((x) => x.name),
      });
      if (responseData != null) {
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

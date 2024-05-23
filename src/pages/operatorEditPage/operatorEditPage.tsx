import {
  FormInputText,
  FormWrapper,
  PageButtons,
  PageWrapper,
  PanelV,
} from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "@/app/store";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  ICreateOperatorDto,
  getOperatorValidationSchema,
} from "@/features/entities/operator";
import { useEffect } from "react";

export const OperatorEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { operatorStore } = useStore((x) => ({
    operatorStore: x.operatorStore,
  }));

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
    } as ICreateOperatorDto,
    resolver: yupResolver(getOperatorValidationSchema()),
  });

  const handleLoadPage = async () => {
    if (!id) return navigate("/not-found");

    const status = await operatorStore.getOperatorById(id);

    if (!status.isSuccess) {
      return navigate("/not-found");
    }

    methods.reset({ ...status.data! });
  };

  useEffect(() => {
    handleLoadPage();
  });

  const onSubmit: SubmitHandler<ICreateOperatorDto> = async (data) => {
    const status = await operatorStore.editOperatorById(id!, {
      ...data,
    });
    if (status.isSuccess) {
      navigate("/entities/operators");
    }
  };

  return (
    <PageWrapper>
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <PanelV>
          <PanelV.Header>Персональные данные</PanelV.Header>
          <PanelV.Content>
            <FormInputText labelType="fixed" name="lastName" label="Фамилия" />
            <FormInputText labelType="fixed" name="firstName" label="Имя" />
            <FormInputText
              labelType="fixed"
              name="middleName"
              label="Отчество (необязательно)"
            />
          </PanelV.Content>
        </PanelV>
        <PageButtons>
          <Button
            label="Сохранить"
            type="submit"
            loading={operatorStore.isLoading}
          />
        </PageButtons>
      </FormWrapper>
    </PageWrapper>
  );
};

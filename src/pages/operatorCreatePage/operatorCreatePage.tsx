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
import { useNavigate } from "react-router-dom";
import {
  ICreateOperatorDto,
  getOperatorValidationSchema,
} from "@/features/entities/operator";

export const OperatorCreatePage = () => {
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<ICreateOperatorDto> = async (data) => {
    const status = await operatorStore.createOperator({
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

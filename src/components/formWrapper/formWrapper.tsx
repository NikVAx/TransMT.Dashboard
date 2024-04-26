import { FormProvider, useForm } from "react-hook-form";
import { FormWrapperProps } from "./formWrapper.types";

export const FormWrapper = ({
  defaultValues,
  children,
  onSubmit,
  onError,
  ...props
}: FormWrapperProps) => {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

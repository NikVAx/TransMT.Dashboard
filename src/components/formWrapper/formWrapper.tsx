import { FormProvider } from "react-hook-form";
import { FormWrapperProps } from "./formWrapper.types";

export const FormWrapper = ({
  methods,
  children,
  onSubmit,
  onError,
  ...props
}: FormWrapperProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

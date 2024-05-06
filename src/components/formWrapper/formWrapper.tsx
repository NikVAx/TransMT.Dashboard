import { FormProvider } from "react-hook-form";
import { FormWrapperProps } from "./formWrapper.types";

export const FormWrapper = ({
  methods,
  children,
  onSubmit,
  onError,
  className,
  ...props
}: FormWrapperProps) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        {...props}
        className={"flex flex-column gap-4"}
      >
        {children}
      </form>
    </FormProvider>
  );
};

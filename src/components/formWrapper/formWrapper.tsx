import { FormProvider } from "react-hook-form";
import { FormWrapperProps } from "./formWrapper.types";
import { classNames } from "primereact/utils";

export const FormWrapper = ({
  methods,
  children,
  onSubmit,
  onError,
  className,
  ...props
}: FormWrapperProps) => {
  const computedClassName = classNames("flex flex-column gap-4", className);

  return (
    <FormProvider {...methods}>
      <form
        {...props}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className={computedClassName}
      >
        {children}
      </form>
    </FormProvider>
  );
};

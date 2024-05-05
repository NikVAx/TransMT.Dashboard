import { Controller, useFormContext } from "react-hook-form";
import { FormInputPasswordProps } from "../formInputPassword/formInputPassword.types";
import { FormInputErrorMessage, VariantInputPassword } from "..";

export const FormInputPassword = ({
  name,
  rules,
  label,
  feedback,
  ...props
}: FormInputPasswordProps) => {
  const { control } = useFormContext();

  return (
    <div className="field">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <VariantInputPassword
            {...props}
            {...field}
            label={label}
            name={name}
            invalid={fieldState.invalid}
            feedback={feedback}
            title={label}
          />
        )}
      />

      <FormInputErrorMessage name={name} />
    </div>
  );
};

import { Controller, useFormContext } from "react-hook-form";
import { FormInputErrorMessage, VariantInputNumber } from "..";
import { FormInputNumberProps } from "./formInputNumber.types";

export const FormInputNumber = ({
  name,
  rules,
  label,
  ...props
}: FormInputNumberProps) => {
  const { control } = useFormContext();

  return (
    <div className="field">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <VariantInputNumber
            {...props}
            {...field}
            label={label}
            name={name}
            invalid={fieldState.invalid}
            title={label}
          />
        )}
      />

      <FormInputErrorMessage name={name} />
    </div>
  );
};

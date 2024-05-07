import { Controller, useFormContext } from "react-hook-form";
import { FormInputErrorMessage, GenericVariantInput } from "..";
import { FormInputNumberProps } from "./formInputNumber.types";
import { InputNumber } from "primereact/inputnumber";

export const FormInputNumber = ({
  name,
  rules,
  label,
  ...props
}: FormInputNumberProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <GenericVariantInput
            as={InputNumber}
            {...field}
            {...props}
            id={name}
            value={field.value}
            onChange={(e: any) => {field.onChange(e.value)}}
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

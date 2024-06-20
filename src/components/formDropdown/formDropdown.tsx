import { Controller, useFormContext } from "react-hook-form";
import { FormInputErrorMessage, GenericVariantInput } from "..";
import { Dropdown } from "primereact/dropdown";
import { FormDropdownProps } from "./formDropdown.types";

export const FormDropdown = ({
  name,
  rules,
  label,
  labelType,
  ...props
}: FormDropdownProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <GenericVariantInput
            as={Dropdown}
            {...field}
            {...props}      
            value={field.value}
            onChange={(e: any) => {
              field.onChange(e.value);
            }}
            invalid={fieldState.invalid}
            title={label}
            label={label}
            labelType={labelType}
            name={name}
            id={name}
          />
        )}
      />

      <FormInputErrorMessage name={name} />
    </div>
  );
};

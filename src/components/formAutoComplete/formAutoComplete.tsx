import { Controller, useFormContext } from "react-hook-form";
import { FormInputErrorMessage, GenericVariantInput } from "..";
import { FormAutoCompleteProps } from "./formAutoComplete.types";
import { AutoComplete } from "primereact/autocomplete";

export const FormAutoComplete = ({
  name,
  rules,
  label,
  labelType,
  ...props
}: FormAutoCompleteProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <GenericVariantInput
            as={AutoComplete}
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

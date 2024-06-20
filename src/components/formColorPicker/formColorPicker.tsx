import { Controller, useFormContext } from "react-hook-form";
import { FormInputErrorMessage, GenericVariantInput } from "..";
import { ColorPicker } from "primereact/colorpicker";
import { FormColorPickerProps } from "./formColorPicker.types";

export const FormColorPicker = ({
  name,
  rules,
  label,
  labelType,
  ...props
}: FormColorPickerProps) => {
  const { control } = useFormContext();

  return (
    <div
      style={{
        display: "flex",
        gap: "3px",
        alignItems: "center",
      }}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <GenericVariantInput
            as={ColorPicker}
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

import { Controller, useFormContext } from "react-hook-form";
import { FormInputTextProps } from "./formInputText.types";
import { FormInputErrorMessage, GenericVariantInput } from "..";
import { InputText } from "primereact/inputtext";

export const FormInputText = ({
  name,
  rules,
  label,
  labelType = "fixed",
  hideErrorMessage = false,
  ...props
}: FormInputTextProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <GenericVariantInput
            as={InputText}
            {...props}
            {...field}
            invalid={fieldState.invalid}
            autoFocus
            label={label}
            labelType={labelType}
          />
        )}
      />
      {!hideErrorMessage && (
        <FormInputErrorMessage
          name={name}
          style={{ paddingLeft: labelType === "float" ? "0.8rem" : "0" }}
        />
      )}
    </div>
  );
};

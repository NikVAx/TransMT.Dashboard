import { Controller, useFormContext } from "react-hook-form";
import { FormInputTextProps } from "./formInputText.types";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { FormInputErrorMessage, Label } from "..";

export const FormInputText = ({
  name,
  rules,
  label,
  ...props
}: FormInputTextProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div className="field">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <span className="p-float-label">
            <InputText
              {...props}
              {...field}
              id={field.name}
              autoFocus
              className={classNames({ "p-invalid": fieldState.invalid })}
            />
            <Label
              htmlFor={name}
              invalid={errors !== undefined && errors[name] !== undefined}
            >
              {label}
            </Label>
          </span>
        )}
      />
      <FormInputErrorMessage name={name} style={{ paddingLeft: "0.8rem" }}/>
    </div>
  );
};

import { Controller, useFormContext } from "react-hook-form";
import { FormInputTextProps } from "./formInputText.types";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { FormInputErrorMessage } from "..";

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
      <span className="p-float-label">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <InputText
              {...props}
              id={field.name}
              {...field}
              autoFocus
              className={classNames({ "p-invalid": fieldState.invalid })}
            />
          )}
        />
        <label
          htmlFor={name}
          className={classNames({
            "p-error": errors !== undefined && errors[name] !== undefined,
          })}
        >
          {label}
        </label>
      </span>
      <FormInputErrorMessage name={name} />
    </div>
  );
};

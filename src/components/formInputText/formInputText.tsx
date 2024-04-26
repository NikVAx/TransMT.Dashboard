import { Controller, useFormContext } from "react-hook-form";
import { FormInputTextProps } from "./formInputText.types";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";

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
    <>
      <span className="p-float-label">
        <Controller
          name="username"
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
      {errors !== undefined && errors[name] && (
        <small className="p-error">
          {errors !== undefined && (errors[name]?.message as string)}
        </small>
      )}
    </>
  );
};

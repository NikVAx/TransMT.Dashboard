import { Controller, useFormContext } from "react-hook-form";
import { Password } from "primereact/password";
import { FormInputPasswordProps } from "./formInputPassword.types";
import { classNames } from "primereact/utils";

export const FormInputPassword = ({
  name,
  rules,
  label,
  feedback,
  ...props
}: FormInputPasswordProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <>
      <span className="p-float-label">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <Password
              {...props}
              id={field.name}
              {...field}
              className={classNames({ "p-invalid": fieldState.invalid })}
              feedback={feedback}
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

import { Controller, useFormContext } from "react-hook-form";
import { Password } from "primereact/password";
import { FormInputPasswordProps } from "./formInputPassword.types";
import { classNames } from "primereact/utils";
import { FormInputErrorMessage } from "..";

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
    <div className="field">
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
              pt={{
                input: {
                  style: {
                    width: "100%",
                  },
                },
              }}
              feedback={feedback}
              title={label}
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

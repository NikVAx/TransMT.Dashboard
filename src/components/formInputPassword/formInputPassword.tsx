import { Controller, useFormContext } from "react-hook-form";
import { Password } from "primereact/password";
import { FormInputPasswordProps } from "./formInputPassword.types";
import { classNames } from "primereact/utils";
import { FormInputErrorMessage, Label } from "..";

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
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <span className="p-float-label">
            <Password
              {...props}
              {...field}
              id={field.name}
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
            <Label
              htmlFor={name}
              invalid={errors !== undefined && errors[name] !== undefined}
            >
              {label}
            </Label>
          </span>
        )}
      />

      <FormInputErrorMessage name={name} style={{ paddingLeft: "0.8rem" }} />
    </div>
  );
};

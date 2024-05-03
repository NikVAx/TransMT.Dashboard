import { Controller, useFormContext } from "react-hook-form";
import { Password } from "primereact/password";
import { FormInputPasswordProps } from "../formInputPassword/formInputPassword.types";
import { classNames } from "primereact/utils";
import { FormInputErrorMessage, Label } from "..";

export const FormInputPasswordStatic = ({
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
          <div className="flex flex-column gap-2">
            <Label
              htmlFor={name}
              invalid={errors !== undefined && errors[name] !== undefined}
            >
              {label}
            </Label>
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
          </div>
        )}
      />

      <FormInputErrorMessage name={name} />
    </div>
  );
};

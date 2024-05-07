import { Controller, useFormContext } from "react-hook-form";
import { FormInputPasswordProps } from "../formInputPassword/formInputPassword.types";
import { FormInputErrorMessage, GenericVariantInput } from "..";
import { Password } from "primereact/password";

export const FormInputPassword = ({
  name,
  rules,
  label,
  feedback,
  ...props
}: FormInputPasswordProps) => {
  const { control } = useFormContext();

  return (
    <div className="field">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <GenericVariantInput
            as={Password}
            {...props}
            {...field}
            label={label}
            name={name}
            invalid={fieldState.invalid}
            feedback={feedback}
            title={label}
            pt={{
              input: {
                style: {
                  width: "100%",
                },
              },
            }}
          />
        )}
      />

      <FormInputErrorMessage name={name} />
    </div>
  );
};

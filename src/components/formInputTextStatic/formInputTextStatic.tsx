import { Controller, useFormContext } from "react-hook-form";
import { FormInputTextProps } from "../formInputText/formInputText.types";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { FormInputErrorMessage, Label } from "..";

export const FormInputTextStatic = ({
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
    <div
      className="field"
      style={{
        marginBottom: "0.5rem",
      }}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <span className="flex flex-column gap-2">
            <Label
              htmlFor={name}
              invalid={errors !== undefined && errors[name] !== undefined}
            >
              {label}
            </Label>
            <InputText
              {...props}
              {...field}
              id={field.name}
              autoFocus
              className={classNames({ "p-invalid": fieldState.invalid })}
            />
          </span>
        )}
      />
      <FormInputErrorMessage name={name}/>
    </div>
  );
};

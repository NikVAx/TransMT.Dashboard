import { Controller, useFormContext } from "react-hook-form";
import { FormInputTextProps } from "./formInputText.types";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { FormInputErrorMessage, Label } from "..";

export const FormInputText = ({
  name,
  rules,
  label,
  labelType = "fixed",
  ...props
}: FormInputTextProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div
      className={classNames({
        "mb-2": labelType === "fixed",
        "mt-2 mb-3": labelType === "float",
      })}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <span
            className={classNames({
              "p-float-label": labelType === "float",
              "flex flex-column-reverse gap-2": labelType === "fixed",
            })}
          >
            <InputText
              {...props}
              {...field}
              id={field.name}
              autoFocus
              className={classNames({
                "p-invalid": fieldState.invalid,
                "w-full": labelType === "float",
              })}
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
      <FormInputErrorMessage
        name={name}
        style={{ paddingLeft: labelType === "float" ? "0.8rem" : "0" }}
      />
    </div>
  );
};

import { PasswordProps } from "primereact/password";
import { FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";

type FormRule = Omit<
  RegisterOptions<FieldValues, string>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export interface FormInputPasswordProps extends PasswordProps {
  name: string;
  errors?: FieldErrors<any>;
  rules?: FormRule;
  label?: string
}

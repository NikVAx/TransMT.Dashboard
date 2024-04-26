import { InputTextProps } from "primereact/inputtext";
import { FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";

type FormRule = Omit<
  RegisterOptions<FieldValues, string>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export interface FormInputTextProps extends InputTextProps {
  name: string;
  errors?: FieldErrors<any>;
  rules?: FormRule;
  label?: string;
}

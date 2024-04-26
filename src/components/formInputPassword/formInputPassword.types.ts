import { FormRule } from "@/shared/types";
import { PasswordProps } from "primereact/password";
import { FieldErrors } from "react-hook-form";

export interface FormInputPasswordProps extends PasswordProps {
  name: string;
  errors?: FieldErrors<any>;
  rules?: FormRule;
  label?: string;
}

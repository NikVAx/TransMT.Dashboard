import { FormRule } from "@/shared/types";
import { PasswordProps } from "primereact/password";

export interface FormInputPasswordProps extends PasswordProps {
  name: string;
  rules?: FormRule;
  label?: string;
}

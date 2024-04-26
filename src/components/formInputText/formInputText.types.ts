import { FormRule } from "@/shared/types";
import { InputTextProps } from "primereact/inputtext";
import { FieldErrors } from "react-hook-form";

export interface FormInputTextProps extends InputTextProps {
  name: string;
  errors?: FieldErrors<any>;
  rules?: FormRule;
  label?: string;
}

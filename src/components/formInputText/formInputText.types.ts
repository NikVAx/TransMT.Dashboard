import { FormRule } from "@/shared/types";
import { InputTextProps } from "primereact/inputtext";

export interface FormInputTextProps extends InputTextProps {
  name: string;
  rules?: FormRule;
  label?: string;
  labelType?: "float" | "fixed"
}

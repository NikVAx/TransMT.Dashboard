import { FormRule, IVariantLabel } from "@/shared/types";
import { InputTextProps } from "primereact/inputtext";

export interface VariantInputTextProps extends InputTextProps, IVariantLabel {
  name: string;
  rules?: FormRule;
}

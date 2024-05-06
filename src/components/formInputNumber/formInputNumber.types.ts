import { FormRule, IVariantLabel } from "@/shared/types";
import { InputNumberProps } from "primereact/inputnumber";

export interface FormInputNumberProps
  extends InputNumberProps,
    IVariantLabel {
  name: string;
  rules?: FormRule;
}

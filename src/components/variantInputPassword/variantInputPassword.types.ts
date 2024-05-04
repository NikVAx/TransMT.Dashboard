import { FormRule, IVariantLabel } from "@/shared/types";
import { PasswordProps } from "primereact/password";

export interface VariantInputPasswordProps
  extends PasswordProps,
    IVariantLabel {
  name: string;
  rules?: FormRule;
}

import { FormRule, IVariantLabel } from "@/shared/types";
import { DropdownProps } from "primereact/dropdown";

export interface FormDropdownProps
  extends DropdownProps,
    IVariantLabel {
  name: string;
  rules?: FormRule;
}

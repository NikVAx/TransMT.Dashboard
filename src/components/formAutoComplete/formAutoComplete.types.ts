import { FormRule, IVariantLabel } from "@/shared/types";
import { AutoCompleteProps } from "primereact/autocomplete";

export interface FormAutoCompleteProps
  extends AutoCompleteProps,
    IVariantLabel {
  name: string;
  rules?: FormRule;
}

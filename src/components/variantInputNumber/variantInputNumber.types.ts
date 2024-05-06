import { IVariantLabel } from "@/shared/types";
import { InputNumberProps } from "primereact/inputnumber";

export interface VariantInputNumberProps
  extends InputNumberProps,
    IVariantLabel {
  name: string;
}

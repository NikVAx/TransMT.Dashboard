import { FormRule, IVariantLabel } from "@/shared/types";
import { ColorPickerProps } from "primereact/colorpicker";

export interface FormColorPickerProps extends ColorPickerProps, IVariantLabel {
  name: string;
  rules?: FormRule;
}

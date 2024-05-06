import { CSSProperties } from "react";

export interface IHeightSizeProps {
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}
export interface IWidhtSizeProps {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

export interface ISizeProps extends IHeightSizeProps, IWidhtSizeProps {}

export interface IStyled {
  style?: CSSProperties;
}
export interface IVariantLabel {
  label?: string;
  labelType?: "float" | "fixed";
}

export interface IAs<T> {
  as?: T;
}
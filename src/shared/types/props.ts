import { CSSProperties } from "react";

export interface IHeightSizeProps {
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}
export interface IWightSizeProps {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

export interface ISizeProps extends IHeightSizeProps, IWightSizeProps {}

export interface IStyled {
  style?: CSSProperties;
}
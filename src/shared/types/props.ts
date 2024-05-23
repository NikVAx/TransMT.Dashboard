import { IBuilding, IGeoZone } from "@/features";
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
  spanStyle?: CSSProperties;
}

export interface IAs<T> {
  as?: T;
}

export interface StoreProps<T> {
  store: T;
}

export interface IGeoZoneProps {
  geoZone: IGeoZone;
}

export interface IBuildingProps {
  building: IBuilding;
}

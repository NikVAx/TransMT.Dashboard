import { PropsWithChildren } from "react";

export interface PanelHHeaderProps {
  width?: string | number,
  minWidth?: string | number,
  maxWidth?: string | number,
}

export interface PanelHProps extends PropsWithChildren {
  title: string,
  header?: PanelHHeaderProps
}

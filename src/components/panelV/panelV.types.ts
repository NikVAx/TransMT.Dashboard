import { PropsWithChildren } from "react";

export interface PanelVHeaderProps {
  height?: string | number,
  minHeight?: string | number,
  maxHeight?: string | number,
}

export interface PanelVProps extends PropsWithChildren {
  title: string,
  header?: PanelVHeaderProps
}

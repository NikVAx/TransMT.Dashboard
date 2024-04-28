import { PropsWithChildren } from "react";

export interface HPanelHeaderProps {
  width?: string | number,
  minWidth?: string | number,
  maxWidth?: string | number,
}

export interface HPanelProps extends PropsWithChildren {
  title: string,
  header?: HPanelHeaderProps
}

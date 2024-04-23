import { Dispatch, SetStateAction } from "react";

export type DisplayMode = 'small' | 'large';

export interface ILayoutContext {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<ILayoutContext["isSidebarOpen"]>>;
  displayMode: DisplayMode;
  config: ILayoutConfig;
}

export interface ILayoutConfig {
  sidebarOpenWidth: number | string;
  sidebarClosedWidth: number | string;
}


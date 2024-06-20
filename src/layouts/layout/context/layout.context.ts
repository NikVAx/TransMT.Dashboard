import { createContext } from "react";
import { ILayoutContext } from "./layout.types";

export const LayoutContext = createContext<ILayoutContext>(null as unknown as ILayoutContext);
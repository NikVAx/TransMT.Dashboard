import { useContext } from "react";
import { LayoutContext } from "./layout.context";

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(`Wrap into LayoutProvider`);
  }
  return context;
};

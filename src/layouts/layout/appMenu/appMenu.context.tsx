import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface MenuContextProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

export const MenuContext = createContext({} as MenuContextProps);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [activeMenu, setActiveMenu] = useState("");

  const value = {
    activeMenu,
    setActiveMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

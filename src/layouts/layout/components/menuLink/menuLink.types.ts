import { IAppMenuItem } from "../appMenuItem";

export type MenuLinkProps = {
  item: IAppMenuItem;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isActive: boolean;
};

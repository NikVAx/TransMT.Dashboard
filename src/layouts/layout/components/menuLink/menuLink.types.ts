import { MobxTreeNode } from "@/features/tree";
import { IAppMenuItem } from "../appMenuItem";

export type MenuLinkProps = {
  node: MobxTreeNode<IAppMenuItem>;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isActive: boolean;
};

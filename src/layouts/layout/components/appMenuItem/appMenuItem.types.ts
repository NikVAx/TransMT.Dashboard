import { MobxTreeNode } from "@/features/tree";

export type MenuCommandProps = {
    originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    item: IAppMenuItem;
};

export interface IAppMenuItem {
    id: string,

    label: string;
    icon?: string;
    to?: string;
    items?: IAppMenuItem[];

    seperator?: boolean;
    
    visible?: boolean;
    disabled?: boolean;

    command?: ({ originalEvent, item }: MenuCommandProps) => void;
}


export interface AppMenuItemProps {
    node: MobxTreeNode<IAppMenuItem>;
    parentKey?: string;
    index?: number;
    className?: string;
  }
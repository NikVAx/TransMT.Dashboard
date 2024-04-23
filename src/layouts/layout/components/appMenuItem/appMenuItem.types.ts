export type MenuCommandProps = {
    originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    item: IAppMenuItem;
};

export interface IAppMenuItem {
    label: string;
    icon?: string;
    to?: string;
    items?: IAppMenuItem[];

    class?: string;
    seperator?: boolean;
    
    visible?: boolean;
    disabled?: boolean;

    badge?: 'UPDATED' | 'NEW';
    badgeClass?: string;

    command?: ({ originalEvent, item }: MenuCommandProps) => void;
}


export interface AppMenuItemProps {
    item?: IAppMenuItem;
    parentKey?: string;
    index?: number;
    root?: boolean;
    className?: string;
  }
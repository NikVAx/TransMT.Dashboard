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
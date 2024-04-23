import { useLocation, useNavigate } from "react-router-dom";
import { AppMenuItemProps, IAppMenuItem } from "./appMenuItem.types";
import { useContext, useEffect, useMemo } from "react";
import { MenuContext } from "../appMenu/appMenu.context";
import { CSSTransition } from "react-transition-group";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import styles from "./appMenuItem.module.css";

type MenuLinkProps = {
  item: IAppMenuItem;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isActiveRoute: boolean;
};

const MenuLink = ({ item, onClick, isActiveRoute }: MenuLinkProps) => {

  const hasHref = useMemo(() =>{
    return item.disabled || item.items !== undefined;    
  }, [item]) 

  return (
    <a
      href={hasHref ? undefined : item.to}
      tabIndex={0}
      onClick={(e) => onClick(e)}
      className={classNames(item!.class, "p-ripple", {
        [styles.active_route]: isActiveRoute,
      })}
    >
      <i className={classNames(styles.layout_menuitem_icon, item!.icon)}></i>
      <span className={styles.layoutMenuItemText}>{item!.label}</span>
      {item!.items && (
        <i
          className={classNames(
            "pi pi-fw pi-angle-down",
            styles.layout_submenu_toggler
          )}
        />
      )}
      <Ripple />
    </a>
  );
};

export const AppMenuitem = (props: AppMenuItemProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const item = props.item;
  const key = props.parentKey
    ? props.parentKey + "-" + props.index
    : String(props.index);
  const isActiveRoute = (item!.to && pathname === item!.to) as boolean;
  const active = activeMenu === key || activeMenu.startsWith(key + "-");

  const onRouteChange = (url: string) => {
    if (item!.to && item!.to === url) {
      setActiveMenu(key);
    }
  };

  useEffect(() => {
    onRouteChange(pathname);
  }, [pathname]);

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    //avoid processing disabled items
    if (item!.disabled) {
      return;
    }

    //execute command
    if (item!.command) {
      item!.command({ originalEvent: event, item: item! });
    }

    // toggle active state
    if (item!.items) {
      setActiveMenu(active ? (props.parentKey as string) : key);
    } else {
      setActiveMenu(key);
    }

    if (item?.to !== undefined && item.items === undefined) {
      navigate(item.to);
    }
  };

  const subMenu = item!.items && item!.visible !== false && (
    <CSSTransition
      timeout={{ enter: 1000, exit: 450 }}
      classNames={{
        enterActive: styles.layoutSubmenuEnterActive,
        enterDone: styles.layoutSubmenuEnterDone,
        exit: styles.layoutSubmenuExit,
        exitActive: styles.layoutSubmenuExitActive,
      }}
      in={props.root ? true : active}
      key={item!.label}
    >
      <ul className={styles.submenu_wrapper}>
        {item!.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  return (
    <li
      tabIndex={item?.disabled ? 0 : 5}
      className={classNames(
        { [styles.layout_root_menuitem]: props.root },
        { [styles.active_menuitem]: active },
        { [styles.disabled_menuitem]: item?.disabled }
      )}
    >
      {props.root && item!.visible !== false && (
        <div
          tabIndex={item?.disabled ? 0 : 5}
          className={styles.layout_menuitem_root_text}
        >
          {item!.label}
        </div>
      )}

      {item!.visible !== false && item !== undefined ? (
        <MenuLink
          item={item}
          onClick={itemClick}
          isActiveRoute={isActiveRoute}
        />
      ) : null}

      {subMenu}
    </li>
  );
};

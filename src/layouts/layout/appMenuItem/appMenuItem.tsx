import { useLocation, useNavigate } from "react-router-dom";
import { AppMenuItemProps } from "./appMenuItem.types";
import { useContext, useEffect } from "react";
import { MenuContext } from "../appMenu/appMenu.context";
import { CSSTransition } from "react-transition-group";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import styles from "./appMenuItem.module.css";
import "../menu.css";

export const AppMenuitem = (props: AppMenuItemProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const item = props.item;
  const key = props.parentKey
    ? props.parentKey + "-" + props.index
    : String(props.index);
  const isActiveRoute = item!.to && pathname === item!.to;
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
    //avoid processing disabled items
    if (item!.disabled) {
      event.preventDefault();
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
      classNames="layout-submenu"
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

  const MenuLink = () => {
    return (
      <a
        tabIndex={0}
        onClick={(e) => itemClick(e)}
        className={classNames(item!.class, "p-ripple", {
          "active-route": isActiveRoute,
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
          ></i>
        )}
        <Ripple />
      </a>
    );
  };

  return (
    <li
      className={classNames(
        { [styles.layout_root_menuitem]: props.root },
        { [styles.active_menuitem]: active },
        { [styles.disabled_menuitem]: item?.disabled }
      )}
    >
      {props.root && item!.visible !== false && (
        <div className={styles.layout_menuitem_root_text}>{item!.label}</div>
      )}

      {item!.visible !== false ? <MenuLink /> : null}

      {subMenu}
    </li>
  );
};

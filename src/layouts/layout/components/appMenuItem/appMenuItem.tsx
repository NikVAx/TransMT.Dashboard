import { useLocation } from "react-router-dom";
import { AppMenuItemProps } from "./appMenuItem.types";
import { useContext, useEffect, useRef } from "react";
import { MenuContext } from "../appMenu/appMenu.context";
import { CSSTransition } from "react-transition-group";
import { classNames } from "primereact/utils";
import styles from "./appMenuItem.module.css";
import { MenuLink } from "../menuLink";

export const AppMenuitem = (props: AppMenuItemProps) => {
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
  };

  const nodeRef = useRef(null);

  const subMenu = item!.items && item!.visible !== false && (
    <CSSTransition
      nodeRef={nodeRef}
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
      <ul ref={nodeRef} className={styles.submenuWrapper}>
        {item!.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
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
      tabIndex={-1}
      className={classNames(
        { [styles.rootMenuItem]: props.root },
        { [styles.activeMenuItem]: active },
        { [styles.disabledMenuItem]: item?.disabled }
      )}
    >
      {props.root && item!.visible !== false && (
        <div tabIndex={-1} className={styles.menuItemRootText}>
          {item!.label}
        </div>
      )}

      {!props.root && item!.visible !== false && item !== undefined ? (
        <MenuLink item={item} onClick={itemClick} isActive={isActiveRoute} />
      ) : null}

      {subMenu}
    </li>
  );
};

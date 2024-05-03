import { useLocation } from "react-router-dom";
import { AppMenuItemProps, IAppMenuItem } from "./appMenuItem.types";
import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { classNames } from "primereact/utils";
import styles from "./appMenuItem.module.css";
import { MenuLink } from "../menuLink";
import { observer } from "mobx-react-lite";
import { MobxTreeNode } from "@/features/tree";

export interface IMobxNodeProps<T> {
  node: MobxTreeNode<T>;
}

export const AppMenuitem = observer(({ node }: AppMenuItemProps) => {
  const { pathname } = useLocation();

  const isActiveRoute = (node.value!.to &&
    pathname === node.value!.to) as boolean;

  const onRouteChange = (url: string) => {
    if (node.value!.to && node.value!.to === url) {
      node.activate();
    }
  };

  useEffect(() => {
    onRouteChange(pathname);
  }, [pathname]);

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (node.value!.command) {
      node.value!.command({ originalEvent: event, item: node.value! });
    }

    console.log(node.value.label, node.isOpen);

    if (node.hasChildren()) {
      node.toggle();
      if (node.isOpen) {
        node.closeOtherBranches();
      }
    }
  };

  const nodeRef = useRef(null);

  const subMenu = node.hasChildren() &&
    node.value!.visible !== false &&
    (node.isOpen || node.deepIndex === 1) && (
      <ul ref={nodeRef} className={styles.submenuWrapper}>
        {node.children.map((child, i) => {
          return <AppMenuitem node={child} index={i} key={child.value.label} />;
        })}
      </ul>
    );

  return (
    <li
      tabIndex={-1}
      className={classNames(
        { [styles.rootMenuItem]: node.deepIndex === 1 },
        { [styles.activeMenuItem]: true /*TODO: replace to isActive()*/ },
        { [styles.disabledMenuItem]: node.value.disabled }
      )}
    >
      {node.deepIndex === 1 && node.value!.visible !== false && (
        <div tabIndex={-1} className={styles.menuItemRootText}>
          {node.value!.label}
        </div>
      )}

      {node.deepIndex !== 1 &&
      node.value!.visible !== false &&
      node.value !== undefined ? (
        <MenuLink node={node} onClick={itemClick} isActive={isActiveRoute} />
      ) : null}

      {subMenu}
    </li>
  );
});

/*
  
  <CSSTransition
        nodeRef={nodeRef}
        timeout={{ enter: 1000, exit: 450 }}
        classNames={{
          enterActive: styles.layoutSubmenuEnterActive,
          enterDone: styles.layoutSubmenuEnterDone,
          exit: styles.layoutSubmenuExit,
          exitActive: styles.layoutSubmenuExitActive,
        }}
        in={node.deepIndex === 1 ? true : node.isOpen}
        key={item!.label}
      >
        
      </CSSTransition>
  */

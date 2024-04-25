import { NavigationLink } from "@/components/navigationLink";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import { MenuLinkProps } from "./menuLink.types";
import styles from "../appMenuItem/appMenuItem.module.css";

export const MenuLink = ({ item, onClick, isActive }: MenuLinkProps) => {
  return (
    <NavigationLink
      to={item.to}
      tabIndex={item?.disabled ? -1 : 5}
      disabled={item.disabled}
      navigate={item.items === undefined}
      onClick={(e) => onClick(e)}
      className={classNames({
        [styles.activeRoute]: isActive,
        "p-ripple": !item.disabled,
      })}
    >
      <i
        className={classNames(styles.menuItemIcon, item!.icon, {
          [styles.activeRouteIcon]: isActive,
        })}
      />
      <span className={styles.menuItemText}>{item!.label}</span>
      {item!.items && (
        <i
          className={classNames(
            "pi pi-fw pi-angle-down",
            styles.submenuTogglerIcon
          )}
        />
      )}
      {!item.disabled ? <Ripple /> : null}
    </NavigationLink>
  );
};

import { BreadCrumb } from "primereact/breadcrumb";
import { NavigationLink } from "@/components/navigationLink";
import { MenuItem, MenuItemOptions } from "primereact/menuitem";
import { UIMatch, useLocation, useMatches } from "react-router-dom";
import styles from "./breadcrumbs.module.css";
import { IHandle } from "./bradcrumbs.types";

export function Breadcrumbs() {
  let location = useLocation();
  let currentRoutes = [];
  currentRoutes = location.pathname !== "/" ? location.pathname.split("/") : [];
  if (currentRoutes.length > 0) currentRoutes.shift();

  const matches = useMatches() as UIMatch<unknown, IHandle>[];

  const iconItemTemplate = (item: MenuItem, options: MenuItemOptions) => {
    return (
      <NavigationLink className={options.className} to={item.url}>
        <span className={item.icon}></span>
      </NavigationLink>
    );
  };

  const home = { icon: "pi pi-home", url: "/", template: iconItemTemplate };

  const itemTemplate = (item: MenuItem, options: MenuItemOptions) => {
    return (
      <NavigationLink
        className={options.className}
        to={item.url}
        disabled={item.disabled}
      >
        <span className={options.labelClassName}>{item.label}</span>
      </NavigationLink>
    );
  };

  const items = matches.slice(1, matches.length).map<MenuItem>((match) => {
    return {
      label: match.handle.crumb,
      url: match.pathname,
      template: itemTemplate,
    };
  });

  return <BreadCrumb className={styles.breadCrumb} model={items} home={home} />;
}

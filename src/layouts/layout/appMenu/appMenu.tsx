import { appMenuConfig } from "../menu.config";
import { MenuProvider } from "./appMenu.context";
import { AppMenuitem } from "../appMenuItem/appMenuItem";

import "../menu.css";

export function AppMenu() {
  return (
    <MenuProvider>
      <ul className="layout-menu">
        {appMenuConfig.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
}

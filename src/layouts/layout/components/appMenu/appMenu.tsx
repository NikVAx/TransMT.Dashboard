import { appMenuConfig } from "../../config/menu.config";
import { MenuProvider } from "./appMenu.context";
import { AppMenuitem } from "../appMenuItem/appMenuItem";
import s from "./appMenu.module.css";

export function AppMenu() {
  return (
    <MenuProvider>
      <ul className={s.appMenu}>
        {appMenuConfig.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.id} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
}

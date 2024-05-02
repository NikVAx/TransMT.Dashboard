import { menuStore } from "../../config/menu.config";
import { AppMenuitem } from "../appMenuItem/appMenuItem";
import s from "./appMenu.module.css";

export function AppMenu() {
  return (
    <ul className={s.appMenu}>
      {menuStore.root.children.map((node, i) => {
        return <AppMenuitem node={node} index={i} key={node.value.id} />;
      })}
    </ul>
  );
}

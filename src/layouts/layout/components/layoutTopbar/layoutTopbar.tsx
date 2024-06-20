import styles from "../../layout.module.css";
import { Button } from "primereact/button";
import { useLayout } from "../../context/layout.hooks";
import { Menu } from "primereact/menu";
import { SyntheticEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/app/store";
import { IUserWithRoles } from "@/features";

export function LayoutTopbar() {
  const navigate = useNavigate();
  const authStore = useStore((store) => store.authStore);

  const items = [
    {
      items: [
        {
          label: "Профиль",
          icon: "pi pi-refresh",
          command: () => navigate("/accounts/me"),
        },
        {
          label: "Выйти",
          icon: "pi pi-upload",
          command: () => {
            authStore.logout();
            navigate("/login");
          },
        },
      ],
    },
  ];
  const { setIsSidebarOpen } = useLayout();

  const menuRight = useRef<Menu>(null);

  const onMenuOpen = (event: SyntheticEvent<Element, Event>) => {
    menuRight.current?.toggle(event);
  };

  const onSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const getDisplayName = (user?: IUserWithRoles) => {
    if (user === undefined) {
      navigate("/login");
    }

    if (!authStore.user?.firstName && authStore.user?.lastName) {
      return `${authStore.user?.lastName} ${authStore.user?.firstName}`;
    } else {
      return `${authStore.user?.username}`;
    }
  };

  return (
    <div className={styles.layoutTopbar}>
      <Button
        style={{ width: "2rem", height: "2rem" }}
        icon="pi pi-bars"
        rounded
        text
        aria-label="Sidebar"
        onClick={onSidebarToggle}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <Menu
          model={items}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
        <span style={{ paddingRight: "1rem" }}>
          {getDisplayName(authStore.user!)}
        </span>
        <Button
          style={{ width: "2rem", height: "2rem" }}
          icon="pi pi-user"
          rounded
          text
          aria-label="Sidebar"
          onClick={onMenuOpen}
        />
      </div>
    </div>
  );
}

import styles from "../../layout.module.css";
import { Button } from "primereact/button";
import { useLayout } from "../../context/layout.hooks";
import { Menu } from "primereact/menu";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/app/store";

export function LayoutTopbar() {
  const navigate = useNavigate();
  const authStore = useStore((store) => store.authStore);

  const [theme, setTheme] = useState("lara-dark-blue");

  useEffect(() => {
    let themeLink = document.getElementById("theme-link") as any;
    if (themeLink) {
      themeLink.href = `/themes/${theme}/theme.css`;
    }
  }, [theme]);

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
        {
          label: "Сменить тему",
          icon: "pi pi-upload",
          command: () => {
            if (theme === "lara-dark-blue") {
              setTheme("lara-light-blue");
            } else {
              setTheme("lara-dark-blue");
            }
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

      <div style={{ display: "flex" }}>
        <Menu
          model={items}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
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

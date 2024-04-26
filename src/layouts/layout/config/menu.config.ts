import { mock } from "@/app/mock";
import { IAppMenuItem } from "../components/appMenuItem/appMenuItem.types";

export const appMenuConfig: IAppMenuItem[] = [
  {
    id: "#home",
    label: "Главное",
    items: [
      {
        id: "/dashboard",
        label: "Панель управления",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
    ],
  },
  {
    id: "#pages",
    label: "Pages",
    items: [
      {
        id: "/pages/example/form",
        label: "Пример формы",
        to: "/pages/example/form",
      },
      {
        id: "/pages/example/cards",
        label: "Cards To Show Scroll",
        icon: "pi pi-fw pi-bookmark",
        to: "/pages/example/cards",
      },
      {
        id: "/pages/example/long-name",
        label: "Menu Item With Very Very Long Name",
        icon: "pi pi-fw pi-exclamation-circle",
        to: "/pages/example/long-name",
      },
      {
        id: "/pages/example/common",
        label: "Common Menu Item",
        icon: "pi pi-fw pi-mobile",
        to: "/pages/example/common",
      },
      {
        id: "/pages/example/disabled-item",
        label: "Disabled Menu Item",
        icon: "pi pi-fw pi-table",
        to: "/pages/example/disabled-item",
        disabled: true,
      }
    ],
  },
  {
    id: "#tree",
    label: "Tree",
    items: mock.routesTree(3, 4),
  },
];

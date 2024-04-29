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
    id: "#admin",
    label: "Администрирование",
    items: [
      {
        id: "/identity",
        label: "Учетные записи",
        icon: "pi pi-fw pi-home",
        items: [
          {
            id: "/identity",
            label: "Пользователи",
            to: "/identity/users"
          },
          {
            id: "/identity",
            label: "Роли",
            to: "/pages/roles"
          },
        ],
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
      },
    ],
  },
  {
    id: "#examples",
    label: "Примеры",
    items: [
      {
        id: "#examples/group",
        label: "Примеры",
        items: [
          {
            id: "/examples/cards",
            label: "Список карточек",
            to: "/examples/cards",
          },
          {
            id: "/examples/map",
            label: "Карта",
            to: "/examples/map",
          },
        ],
      },
    ],
  },
  {
    id: "#tree",
    label: "Tree",
    items: mock.routesTree(3, 4),
  },
];

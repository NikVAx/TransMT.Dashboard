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
        id: "/pages/gm/full",
        label: "Form Layout",
        icon: "pi pi-fw pi-id-card",
        to: "/pages/full",
      },
      {
        id: "/pages/gm/1",
        label: "Input",
        icon: "pi pi-fw pi-check-square",
        to: "/pages/1",
      },
      {
        id: "/pages/gm/cards",
        label: "Cards",
        icon: "pi pi-fw pi-bookmark",
        to: "/pages/cards",
      },
      {
        id: "/pages/gm/2",
        label: "Invalid State",
        icon: "pi pi-fw pi-exclamation-circle",
        to: "/pages/2",
      },
      {
        id: "/pages/gm/3",
        label: "Button",
        icon: "pi pi-fw pi-mobile",
        to: "/pages/3",
      },
      {
        id: "/pages/gm/4",
        label: "Table",
        icon: "pi pi-fw pi-table",
        to: "/pages/4",
        disabled: true,
      },
      {
        id: "/pages/gm/5",
        label: "Menu",
        icon: "pi pi-fw pi-bars",
        to: "/pages/5",
        disabled: true,
      },
      {
        id: "/pages/gm/6",
        label: "Message",
        icon: "pi pi-fw pi-comment",
        to: "/pages/6",
        disabled: true,
      },
    ],
  },
  {
    id: "#tree",
    label: "Hierarchy",
    items: mock.routes(3, 4),
  },
];

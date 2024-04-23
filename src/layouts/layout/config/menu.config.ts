import { mock } from "@/app/mock";
import { IAppMenuItem } from "../components/appMenuItem/appMenuItem.types";

export const appMenuConfig: IAppMenuItem[] = [
  {
    label: "Главное",
    items: [{ label: "Панель управления", icon: "pi pi-fw pi-home", to: "/" }],
  },
  {
    label: "Pages",
    items: [
      {
        label: "Form Layout",
        icon: "pi pi-fw pi-id-card",
        to: "/pages/full",
      },
      {
        label: "Input",
        icon: "pi pi-fw pi-check-square",
        to: "/pages/1",
      },
      {
        label: "Cards",
        icon: "pi pi-fw pi-bookmark",
        to: "/pages/cards",
      },
      {
        label: "Invalid State",
        icon: "pi pi-fw pi-exclamation-circle",
        to: "/pages/2",
      },
      {
        label: "Button",
        icon: "pi pi-fw pi-mobile",
        to: "/pages/3",
        class: "rotated-icon",
      },
      {
        label: "Table",
        icon: "pi pi-fw pi-table",
        to: "/pages/4",
        disabled: true,
      },
      {
        label: "Menu",
        icon: "pi pi-fw pi-bars",
        to: "/pages/5",
        disabled: true,
      },
      {
        label: "Message",
        icon: "pi pi-fw pi-comment",
        to: "/pages/6",
        disabled: true,
      },
    ],
  },
  {
    label: "Hierarchy",
    items: mock.routes(3, 4),
  },
];

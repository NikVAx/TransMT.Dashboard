import { mock } from "@/app/mock";
import { IAppMenuItem } from "../components/appMenuItem/appMenuItem.types";
import { ITreeNode, MobxTree } from "@/features/tree";

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
            to: "/identity/users",
          },
          {
            id: "/identity",
            label: "Роли",
            to: "/pages/roles",
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

export function TreeNode<T>(
  value: T,
  children: ITreeNode<T>[] = []
): ITreeNode<T> {
  return { value, children };
}

export const appMenuConfig2: ITreeNode<IAppMenuItem>[] = [
  TreeNode(
    {
      id: "#home",
      label: "Главное",
    } as IAppMenuItem,
    [
      TreeNode({
        id: "/dashboard",
        label: "Панель управления",
        icon: "pi pi-fw pi-home",
        to: "/",
      }),
    ]
  ),
  TreeNode(
    {
      id: "#admin",
      label: "Администрирование",
    } as IAppMenuItem,
    [
      TreeNode(
        {
          id: "/identity",
          label: "Учетные записи",
          icon: "pi pi-fw pi-home",
        } as IAppMenuItem,
        [
          TreeNode({
            id: "/identity/users",
            label: "Пользователи",
            to: "/identity/users",
          }),
          TreeNode({
            id: "/identity/roles",
            label: "Роли",
            to: "/pages/roles",
          }),
        ]
      ),
    ]
  ),
  TreeNode(
    {
      id: "#examples",
      label: "Примеры",
    } as IAppMenuItem,
    [
      TreeNode(
        {
          id: "#examples/group",
          label: "Примеры",
        } as IAppMenuItem,
        [
          TreeNode({
            id: "/examples/cards",
            label: "Список карточек",
            to: "/examples/cards",
          }),
          TreeNode({
            id: "/examples/map",
            label: "Карта",
            to: "/examples/map",
          }),
        ]
      ),
    ]
  ),
];

/*
TreeNode({
    id: "#tree",
    label: "Tree",
    } as IAppMenuItem, mock.routesTree(3, 4),
  ),

*/

const menuStore = new MobxTree<IAppMenuItem>(
  appMenuConfig2,
  (value) => value.to === window.location.pathname
);

menuStore.selected?.activate();

export { menuStore };

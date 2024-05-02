import { IAppMenuItem } from "../components/appMenuItem/appMenuItem.types";
import { ITreeNode, MobxTree } from "@/features/tree";

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
            to: "/identity/roles",
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

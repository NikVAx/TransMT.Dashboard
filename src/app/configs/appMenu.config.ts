import { ITreeNode, MobxTree } from "@/features/tree";
import { IAppMenuItem } from "@/layouts/layout/components/appMenuItem";

export function TreeNode<T>(
  value: T,
  children: ITreeNode<T>[] = []
): ITreeNode<T> {
  return { value, children };
}

export const appMenuConfig: ITreeNode<IAppMenuItem>[] = [
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
          icon: "pi pi-fw pi-users",
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
      id: "#entities",
      label: "Справочники и типы",
    } as IAppMenuItem,
    [
      TreeNode(
        {
          id: "#entities/buildings",
          label: "Здания и объекты",
          icon: "pi pi-fw pi-building",
        } as IAppMenuItem,
        [
          TreeNode({
            id: "/entities/buildings",
            label: "Список зданий",
            to: "/entities/buildings",
          }),
        ]
      ),
      TreeNode(
        {
          id: "#entities/vehicles",
          label: "Транспортные средства",
          icon: "pi pi-fw pi-truck",
        } as IAppMenuItem,
        [
          TreeNode({
            id: "/entities/vehicles",
            label: "Список ТС",
            to: "/entities/vehicles",
          }),
        ]
      ),
      TreeNode(
        {
          id: "#entities/operators",
          label: "Операторы ТС",
          icon: "pi pi-fw pi-user",
        } as IAppMenuItem,
        [
          TreeNode({
            id: "/entities/operators",
            label: "Список операторов",
            to: "/entities/operators",
          }),
        ]
      ),
      TreeNode(
        {
          id: "#entities/operators",
          label: "Устройства GPS",
          icon: "pi pi-fw pi-tablet",
        } as IAppMenuItem,
        [
          TreeNode({
            id: "/entities/devices",
            label: "Список устройств",
            to: "/entities/devices",
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

const menuStore = new MobxTree<IAppMenuItem>(
  appMenuConfig,
  (value) => value.to === window.location.pathname
);

menuStore.selected?.activate();

export { menuStore };

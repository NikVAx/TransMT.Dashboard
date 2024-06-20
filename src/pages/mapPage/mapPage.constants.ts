import { TreeNode } from "primereact/treenode";

export const defaultNodes: TreeNode[] = [
  {
    key: "root",
    label: "Все объекты",
    data: { entity: "root" },
    children: [
      {
        key: "buildings",
        label: "Здания",
        icon: "pi pi-fw pi-building",
        children: [],
        data: { entity: "group" },
      },
      {
        key: "geozones",
        label: "Геозоны",
        icon: "pi pi-fw pi-clone",
        children: [],
        data: { entity: "group" },
      },
      {
        key: "vehicles",
        label: "Транспортные средства",
        icon: "pi pi-fw pi-truck",
        children: [],
        data: { entity: "group" },
      },
    ],
  },
];

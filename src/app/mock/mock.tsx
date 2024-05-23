
import { IAppMenuItem } from "@/layouts/layout/components/appMenuItem";
import { createArray } from "@/shared/utils";
import { Card } from "primereact/card";

function cards(count: number) {
  return createArray(count).map((value) => (
    <Card title={`TITLE OF CARD #${value}`} style={{ margin: "10px" }} key={value}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Card>
  ));
}

function routes(
  count: number,
  deep: number,
  index: number = 0
): IAppMenuItem[] | undefined {
  if (deep === 0) {
    return undefined;
  }

  return createArray(count).map<IAppMenuItem>((value) => {
    const id = index + 1 + value;

    return {
      id: `/pages/tree/${id}`,
      label: `Submenu ${[...Array.from(String(id), Number)].join(".")}`,
      icon: "pi pi-fw pi-bookmark",
      to: `/pages/tree/${id}`,
      items: routes(count, deep - 1, 10 * id),
      disabled: id % 3 == 0
    } as IAppMenuItem;
  });
}

const geoZoneTypes = [
  { name: "Не определен", defaultColor: "" },
  { name: "Зона хранения", defaultColor: "" },
  { name: "Зона погрузки", defaultColor: "" },
  { name: "Зона разгрузки", defaultColor: "" },
  { name: "Опасная зона", defaultColor: "" },
  { name: "Пешеходная зона", defaultColor: "" },
];

const buildingTypes = [
  "Не указан",
  "Склад",
  "Порт",
  "Офис",
  "Техническое",
  "Ангар",
];

export const mock = {
  cards: cards,
  routesTree: routes,
  geoZoneTypes: geoZoneTypes,
  buildingTypes: buildingTypes
};

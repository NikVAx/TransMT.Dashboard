import { IAppMenuItem } from "@/layouts/layout/components/appMenuItem/appMenuItem.types";
import { Card } from "primereact/card";

const createArray = (size: number) => {
  return Array.from(Array(size).keys());
};

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
      label: `Submenu ${id}`,
      icon: "pi pi-fw pi-bookmark",
      to: `/pages/tree/${id}`,
      items: routes(count, deep - 1, 10 * id),
      disabled: id === 11
    } as IAppMenuItem;
  });
}

export const mock = {
  cards: cards,
  routes: routes,
};

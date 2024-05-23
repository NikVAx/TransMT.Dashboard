import { groupBy } from "@/shared/utils";
import { IHasType } from "./mapPage.types";

export function getChildrenNodes<T extends IHasType>(
  data: T[],
  entityName: string
) {
  const groupedBy = groupBy(data, "type");

  return Object.keys(groupedBy).map((type) => {
    return {
      key: `${entityName}.group.${type}`,
      label: `${type}`,
      data: {
        entity: "group",
      },
      children: groupedBy[type].map((item: any) => {
        return {
          key: `${entityName}.${item.id}`,
          label: `${item.name}`,
          data: {
            entity: `${entityName}`,
            ...item,
          },
        };
      }),
    };
  });
}

import { useStore } from "@/app/store";
import { CrudDeleteEntityButton, CrudEditEntityButton } from "@/components";
import { IBuilding } from "@/features";

export const actionBodyTemplate = (data: IBuilding) => {
  const { buildingStore } = useStore((store) => ({
    buildingStore: store.buildingStore,
  }));

  return (
    <div>
      <CrudEditEntityButton to={`/entities/buildings/${data.id}/edit`} />
      <CrudDeleteEntityButton
        message="Вы уверены, что хотите удалить здание?"
        data={data}
        onAccept={(arg) => {
          buildingStore.deleteBuildings({ keys: [arg.id] });
        }}
      />
    </div>
  );
};

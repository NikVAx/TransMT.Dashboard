import { useStore } from "@/app/store";
import { CrudDeleteEntityButton, CrudEditEntityButton } from "@/components";
import { IBuilding } from "@/features";

export const actionBodyTemplate = (data: IBuilding) => {
  const { geoZoneStore } = useStore((store) => ({
    geoZoneStore: store.geoZoneStore,
  }));

  return (
    <div>
      <CrudEditEntityButton to={`/entities/geozones/${data.id}/edit`} />
      <CrudDeleteEntityButton
        message="Вы уверены, что хотите удалить географическую зону?"
        data={data}
        onAccept={(arg) => {
          geoZoneStore.deleteGeoZones({ keys: [arg.id] });
        }}
      />
    </div>
  );
};

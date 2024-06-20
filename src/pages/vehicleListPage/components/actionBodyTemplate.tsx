import { useStore } from "@/app/store";
import { CrudDeleteEntityButton, CrudEditEntityButton } from "@/components";
import { IVehicle } from "@/features/entities/vehicle";

export const actionBodyTemplate = (data: IVehicle) => {
  const { vehicleStore } = useStore((store) => ({
    vehicleStore: store.vehicleStore,
  }));

  return (
    <div>
      <CrudEditEntityButton to={`/entities/vehicles/${data.id}/edit`} />
      <CrudDeleteEntityButton
        message="Вы уверены, что хотите удалить ТС?"
        data={data}
        onAccept={(arg) => {
          vehicleStore.deleteVehicles({ keys: [arg.id] });
        }}
      />
    </div>
  );
};

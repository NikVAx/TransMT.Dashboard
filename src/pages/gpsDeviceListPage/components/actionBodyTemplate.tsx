import { useStore } from "@/app/store";
import { CrudDeleteEntityButton, CrudEditEntityButton } from "@/components";
import { IGpsDevice } from "@/features/entities/gpsDevice";

export const actionBodyTemplate = (data: IGpsDevice) => {
  const { deviceStore } = useStore((store) => ({ deviceStore: store.deviceStore }));

  return (
    <div>
      <CrudEditEntityButton to={`/entities/devices/${data.id}/edit`} />
      <CrudDeleteEntityButton
        message="Вы уверены, что хотите удалить GPS Устройство?"
        data={data}
        onAccept={(arg) => {
          deviceStore.deleteGpsDevices({ keys: [arg.id] });
        }}
      />
    </div>
  );
};

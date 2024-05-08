import { useStore } from "@/app/store";
import { CrudDeleteEntityButton, CrudEditEntityButton } from "@/components";
import { IRole } from "@/features";

export const actionBodyTemplate = (data: IRole) => {
  const { roleStore } = useStore((store) => ({ roleStore: store.roleStore }));

  return (
    <div style={{ height: "48px" }}>
      {data.name !== "superuser" && (
        <>
          <CrudEditEntityButton to={`/identity/roles/${data.id}/edit`} />
          <CrudDeleteEntityButton
            message="Вы уверены, что хотите удалить роль?"
            data={data}
            onAccept={(arg) => {
              roleStore.deleteRoles({ keys: [arg.id] });
            }}
          />
        </>
      )}
    </div>
  );
};

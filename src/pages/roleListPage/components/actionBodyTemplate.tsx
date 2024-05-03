import { useStore } from "@/app/store";
import { IRole } from "@/features";
import { Button } from "primereact/button";
import { confirmPopup } from "primereact/confirmpopup";
import { useNavigate } from "react-router-dom";

export const actionBodyTemplate = (data: IRole) => {
  const { roleStore } = useStore((store) => ({ roleStore: store.roleStore }));
  const navigate = useNavigate();

  return (
    <div style={{ height: "48px" }}>
      {data.name !== "superuser" && (
        <>
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className="mr-2"
            onClick={() => {
              navigate(`/identity/roles/${data.id}/edit`);
            }}
          />
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={(event) => {
              confirmPopup({
                target: event.currentTarget,
                message: "Вы уверены, что хотите удалить роль?",
                acceptLabel: "Да",
                rejectLabel: "Нет",
                icon: "pi pi-info-circle",
                defaultFocus: "reject",
                acceptClassName: "p-button-danger",
                accept: () => {
                  roleStore.deleteRoles({ keys: [data.id] });
                },
              });
            }}
          />
        </>
      )}
    </div>
  );
};

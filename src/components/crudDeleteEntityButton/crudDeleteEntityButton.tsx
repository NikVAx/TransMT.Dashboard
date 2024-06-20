import { IEntity } from "@/shared/types";
import { CrudDeleteEntityButtonProps } from "./crudDeleteEntityButton.types";
import { confirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";

export const CrudDeleteEntityButton = <T extends IEntity>({
  message,
  onAccept,
  data,
}: CrudDeleteEntityButtonProps<T>) => {
  return (
    <Button
      icon="pi pi-trash"
      rounded
      severity="danger"
      onClick={(event) => {
        confirmPopup({
          target: event.currentTarget,
          message: message,
          acceptLabel: "Да",
          rejectLabel: "Нет",
          icon: "pi pi-info-circle",
          defaultFocus: "reject",
          acceptClassName: "p-button-danger",
          accept: () => onAccept(data),
        });
      }}
    />
  );
};

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { CrudEditEntityButtonProps } from "./crudEditEntityButton.types";

export const CrudEditEntityButton = ({ to }: CrudEditEntityButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      icon="pi pi-pencil"
      rounded
      outlined
      className="mr-2"
      onClick={() => {
        navigate(to);
      }}
    />
  );
};

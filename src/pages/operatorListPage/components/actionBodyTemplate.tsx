import { IBuilding } from "@/features";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const actionBodyTemplate = (_: IBuilding) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        className="mr-2"
        onClick={() => {
          navigate("/not-implemented");
            // TODO: add after fix backend
        }}
      />
      <Button icon="pi pi-trash" 
        rounded 
        severity="danger" 
        onClick={() => {
            // TODO: add after fix backend
        }} />
    </div>
  );
};

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="flex flex-wrap gap-2">
        <Button
          label="Создать"
          icon="pi pi-plus"
          severity="success"
          onClick={() => {
            navigate("/identity/users/create");
          }}
        />
      </div>
      <span className="text-xl text-900 font-bold">Пользователи</span>
    </div>
  );
};

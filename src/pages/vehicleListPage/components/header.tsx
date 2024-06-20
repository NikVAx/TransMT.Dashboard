import { CrudCreateEntityButton } from "@/components";

export const Header = () => {
  return (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="flex flex-wrap gap-2">
        <CrudCreateEntityButton to="/entities/vehicles/create" />
      </div>
      <span className="text-xl text-900 font-bold">Транспортные средства</span>
    </div>
  );
};

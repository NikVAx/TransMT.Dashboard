import { IRole } from "@/features";

export const itemTemplate = (item: IRole) => {
  return (
    <div className="flex flex-column flex-wrap p-2 align-items-left">
      <div className="flex flex-wrap p-2 align-items-center">
        <small>{item.id}</small>
      </div>
      <div className="flex flex-wrap p-2 align-items-center">
        <span className="font-bold">{item.name}</span>
      </div>
    </div>
  );
};

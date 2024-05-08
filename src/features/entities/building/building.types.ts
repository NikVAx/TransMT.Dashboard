import { IEntity, IGeoPoint } from "@/shared/types";

export interface IBuilding extends IEntity {
  name: string;
  type: string;
  address?: string;
  location: IGeoPoint;
}

export interface IGetBuildingDto extends IBuilding {}
export interface ICreateBuildingDto extends Omit<IBuilding, "id"> {}
export interface IEditBuildingDto extends Partial<ICreateBuildingDto> {}

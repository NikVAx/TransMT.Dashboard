import { IEntity } from "@/shared/types";
import { IBuilding } from "../building";

export interface IVehicle extends IEntity {
  number: string;
  type: string;
  operatingStatus: string;
  storageAreaId: string;
  storageArea: IBuilding;
}

export interface IGetVehicleDto extends IVehicle {}
export interface ICreateVehicleDto extends Omit<IVehicle, "id"> {}
export interface IEditVehicleDto extends Partial<ICreateVehicleDto> {}
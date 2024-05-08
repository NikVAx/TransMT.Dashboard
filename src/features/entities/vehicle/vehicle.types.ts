import { IEntity } from "@/shared/types";

export interface IVehicle extends IEntity {
  number: string;
  type: string;
  operatingStatus: string;
  storageAreaId: string;
}

export interface IGetVehicleDto extends IVehicle {}
export interface ICreateVehicleDto extends Omit<IVehicle, "id"> {}
export interface IEditVehicleDto extends Partial<ICreateVehicleDto> {}
import { IEntity } from "@/shared/types";

export interface IGpsDevice extends IEntity {
    vehicleId: string;
}

export interface IGetGpsDeviceDto extends IGpsDevice {}
export interface ICreateGpsDeviceDto extends Omit<IGpsDevice, "id"> {}
export interface IEditGpsDeviceDto extends Partial<ICreateGpsDeviceDto> {

}

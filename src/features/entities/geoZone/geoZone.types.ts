import { IEntity, ILatLng } from "@/shared/types";

export interface IGeoZone extends IEntity {
  name: string;
  type: string;
  color: string;
  points: ILatLng[];
}

export interface IGetGeoZoneDto extends IGeoZone {}
export interface ICreateGeoZoneDto extends Omit<IGeoZone, "id"> {}
export interface IEditGeoZoneDto extends Partial<ICreateGeoZoneDto> {}

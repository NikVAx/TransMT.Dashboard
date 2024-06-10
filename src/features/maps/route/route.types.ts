import { ILatLng } from "@/shared/types";

export interface ICreateRouteOptions {
  name: string;
  positions: ILatLng[];
}
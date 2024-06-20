import { ILatLng } from "@/shared/types";
import { Waypoint } from "./route";
import { IGpsDevice } from "@/features/entities";

export interface IStatus {
  status: string;
}

export interface IDelayInfo extends IStatus {
  duration: number;
}
export interface IDriveInfo extends IStatus {
  speed: number;
}

export interface ICreateRouteOptions {
  name: string;
  positions: ILatLng[];
  speeds: IDriveInfo[];
  delays: IDelayInfo[];
  device: IGpsDevice | null;
  type: "create" | "edit";
}

export interface IRouteElement extends IStatus {
  type: string;
  name: string;
  a: number;
  b: number;
}

export interface PointInfo extends IRouteElement {
  type: "point";
}

export interface SegmentInfo extends IRouteElement {
  type: "segment";
  fraction: number;
}

export interface IRouteConfig {
  id: string;
  device: IGpsDevice;
  name: string;
  points: Waypoint[];
  delays: IDelayInfo[];
  speeds: IDriveInfo[];
}



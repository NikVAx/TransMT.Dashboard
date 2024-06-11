import { ILatLng } from "@/shared/types";
import { Waypoint } from "./route";

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
  name: string;
  points: Waypoint[];
  delays: number[];
  speeds: IDriveInfo[];
}



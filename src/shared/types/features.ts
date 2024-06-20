export type States = "loading" | "done" | "failed";

export interface IPageRequestOptions {
  pageIndex: number;
  pageSize: number;
}

export interface IPageOptions {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}

export type IPaginatedRequest<T = any> = IPageRequestOptions & T;

export interface IPaginatedResponse<T> extends IPageOptions {
  items: T[];
}

export interface ILatLng {
  lng: number;
  lat: number;
}

export interface IDeleteOptions<TKey = string> {
  keys: TKey[] | TKey;
}

export interface IManyDeleteRequestOptions<TKey = string> {
  keys: TKey[];
}

export interface IEntity<T = string> {
  id: T
}


export interface IVehicleStatus {
  status: string;
}
export interface IDuration {
  duration: number;
}

export interface IStatusDuration extends IVehicleStatus, IDuration {}
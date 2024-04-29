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

export interface IGeoPoint {
  lng: number;
  lat: number;
}

export interface IManyDeleteOptions<TKey = string> {
  keys: TKey[] | TKey;
}

export interface IManyDeleteRequestOptions<TKey = string> {
  keys: TKey[];
}

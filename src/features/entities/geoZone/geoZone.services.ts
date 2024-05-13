import { createGuardRequest } from "@/shared/utils";
import { appApiInstance } from "@/shared/api";
import {
  IManyDeleteRequestOptions,
  IPaginatedRequest,
  IPaginatedResponse,
} from "@/shared/types";
import {
  ICreateGeoZoneDto,
  IEditGeoZoneDto,
  IGetGeoZoneDto,
} from "./geoZone.types";

const ROUTE = "geozones";

export const getGeoZonesRequest = createGuardRequest(
  (params?: IPaginatedRequest) =>
    appApiInstance.get<IPaginatedResponse<IGetGeoZoneDto>>(`/${ROUTE}`, {
      params,
    })
);

export const deleteGeoZonesRequest = createGuardRequest(
  (data: IManyDeleteRequestOptions) =>
    appApiInstance.delete(`/${ROUTE}`, { data })
);

export const createGeoZoneRequest = createGuardRequest(
  (data: ICreateGeoZoneDto) =>
    appApiInstance.post<IGetGeoZoneDto>(`/${ROUTE}`, data)
);

export const getGeoZoneByIdRequest = createGuardRequest((id: string) =>
  appApiInstance.get<IGetGeoZoneDto>(`/${ROUTE}/${id}`)
);

export const editGeoZoneByIdRequest = createGuardRequest(
  (id: string, data: IEditGeoZoneDto) =>
    appApiInstance.patch<IGetGeoZoneDto>(`/${ROUTE}/${id}`, data)
);

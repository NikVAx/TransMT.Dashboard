import { createGuardRequest } from "@/shared/utils";
import { appApiInstance } from "@/shared/api";
import {
  IManyDeleteRequestOptions,
  IPaginatedRequest,
  IPaginatedResponse,
} from "@/shared/types";
import {
  ICreateGpsDeviceDto,
  IEditGpsDeviceDto,
  IGetGpsDeviceDto,
} from "./gpsDevice.types";

const ROUTE = "devices";

export const getGpsDevicesRequest = createGuardRequest(
  (params?: IPaginatedRequest) =>
    appApiInstance.get<IPaginatedResponse<IGetGpsDeviceDto>>(`/${ROUTE}`, {
      params,
    })
);

export const deleteGpsDevicesRequest = createGuardRequest(
  (data: IManyDeleteRequestOptions) =>
    appApiInstance.delete(`/${ROUTE}`, { data })
);

export const createGpsDeviceRequest = createGuardRequest(
  (data: ICreateGpsDeviceDto) =>
    appApiInstance.post<IGetGpsDeviceDto>(`/${ROUTE}`, data)
);

export const getGpsDeviceByIdRequest = createGuardRequest((id: string) =>
  appApiInstance.get<IGetGpsDeviceDto>(`/${ROUTE}/${id}`)
);

export const editGpsDeviceByIdRequest = createGuardRequest(
  (id: string, data: IEditGpsDeviceDto) =>
    appApiInstance.patch<IGetGpsDeviceDto>(`/${ROUTE}/${id}`, data)
);

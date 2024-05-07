import { createGuardRequest } from "@/shared/utils";
import { appApiInstance } from "@/shared/api";
import {
  IManyDeleteRequestOptions,
  IPaginatedRequest,
  IPaginatedResponse,
} from "@/shared/types";
import {
  ICreateVehicleDto,
  IEditVehicleDto,
  IGetVehicleDto,
} from "./vehicle.types";

const ROUTE = "vehicles";

export const getVehiclesRequest = createGuardRequest(
  (params?: IPaginatedRequest) =>
    appApiInstance.get<IPaginatedResponse<IGetVehicleDto>>(`/${ROUTE}`, {
      params,
    })
);

export const deleteVehiclesRequest = createGuardRequest(
  (data: IManyDeleteRequestOptions) =>
    appApiInstance.delete(`/${ROUTE}`, { data })
);

export const createVehicleRequest = createGuardRequest(
  (data: ICreateVehicleDto) =>
    appApiInstance.post<IGetVehicleDto>(`/${ROUTE}`, data)
);

export const getVehicleByIdRequest = createGuardRequest((id: string) =>
  appApiInstance.get<IGetVehicleDto>(`/${ROUTE}/${id}`)
);

export const editVehicleByIdRequest = createGuardRequest(
  (id: string, data: IEditVehicleDto) =>
    appApiInstance.patch<IGetVehicleDto>(`/${ROUTE}/${id}`, data)
);

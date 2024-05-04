import { createGuardRequest } from "@/shared/utils";
import { appApiInstance } from "@/shared/api";
import {
  IManyDeleteRequestOptions,
  IPaginatedRequest,
  IPaginatedResponse,
} from "@/shared/types";
import {
  ICreateBuildingDto,
  IEditBuildingDto,
  IGetBuildingDto,
} from "./building.types";

const ROUTE = "buildings";

export const getBuildingsRequest = createGuardRequest(
  (params?: IPaginatedRequest) =>
    appApiInstance.get<IPaginatedResponse<IGetBuildingDto>>(`/${ROUTE}`, {
      params,
    })
);

export const deleteBuildingsRequest = createGuardRequest(
  (data: IManyDeleteRequestOptions) =>
    appApiInstance.delete(`/${ROUTE}`, { data })
);

export const createBuildingRequest = createGuardRequest(
  (data: ICreateBuildingDto) =>
    appApiInstance.post<IGetBuildingDto>(`/${ROUTE}`, data)
);

export const getBuildingByIdRequest = createGuardRequest((id: string) =>
  appApiInstance.get<IGetBuildingDto>(`/${ROUTE}/${id}`)
);

export const editBuildingByIdRequest = createGuardRequest(
  (id: string, data: IEditBuildingDto) =>
    appApiInstance.patch<IGetBuildingDto>(`/${ROUTE}/${id}`, data)
);

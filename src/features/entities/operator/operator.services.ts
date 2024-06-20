import { createGuardRequest } from "@/shared/utils";
import { appApiInstance } from "@/shared/api";
import {
  IManyDeleteRequestOptions,
  IPaginatedRequest,
  IPaginatedResponse,
} from "@/shared/types";
import {
  ICreateOperatorDto,
  IEditOperatorDto,
  IGetOperatorDto,
} from "./operator.types";

const ROUTE = "operators";

export const getOperatorsRequest = createGuardRequest(
  (params?: IPaginatedRequest) =>
    appApiInstance.get<IPaginatedResponse<IGetOperatorDto>>(`/${ROUTE}`, {
      params,
    })
);

export const deleteOperatorsRequest = createGuardRequest(
  (data: IManyDeleteRequestOptions) =>
    appApiInstance.delete(`/${ROUTE}`, { data })
);

export const createOperatorRequest = createGuardRequest(
  (data: ICreateOperatorDto) =>
    appApiInstance.post<IGetOperatorDto>(`/${ROUTE}`, data)
);

export const getOperatorByIdRequest = createGuardRequest((id: string) =>
  appApiInstance.get<IGetOperatorDto>(`/${ROUTE}/${id}`)
);

export const editOperatorByIdRequest = createGuardRequest(
  (id: string, data: IEditOperatorDto) =>
    appApiInstance.patch<IGetOperatorDto>(`/${ROUTE}/${id}`, data)
);

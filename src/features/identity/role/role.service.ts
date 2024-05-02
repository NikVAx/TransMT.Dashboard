import {
  IManyDeleteRequestOptions,
  IPaginatedRequest,
  IPaginatedResponse,
} from "@/shared/types";
import {
  ICreateRoleDto,
  IEditRoleDto,
  IGetRoleDto,
  IGetRoleWithShortPermissionsDto,
} from "./role.types";
import { createGuardRequest } from "@/shared/utils";
import { appApiInstance } from "@/shared/api";

const ROUTE = "roles";

export const getRolesRequest = createGuardRequest(
  (params?: IPaginatedRequest) =>
    appApiInstance.get<IPaginatedResponse<IGetRoleDto>>(`/${ROUTE}`, {
      params,
    })
);

export const createRoleRequest = createGuardRequest((data: ICreateRoleDto) =>
  appApiInstance.post<IGetRoleDto>(`/${ROUTE}`, data)
);

export const deleteRolesRequest = createGuardRequest(
  (data: IManyDeleteRequestOptions) =>
    appApiInstance.delete(`/${ROUTE}`, { data })
);

export const getRoleByIdRequest = createGuardRequest((id: string) =>
  appApiInstance.get<IGetRoleWithShortPermissionsDto>(`/${ROUTE}/${id}`)
);

export const editRoleByIdRequest = createGuardRequest(
  (id: string, data: IEditRoleDto) =>
    appApiInstance.patch<IGetRoleDto>(`/${ROUTE}/${id}`, data)
);

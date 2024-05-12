import { appApiInstance } from "@/shared/api";
import {
  IManyDeleteRequestOptions,
  IPaginatedRequest,
  IPaginatedResponse,
} from "@/shared/types";
import { createGuardRequest } from "@/shared/utils";
import { ICreateUserDto, IEditUserDto, IGetUserDto } from "./user.types";

const ROUTE = "users";

export const getUsersRequest = createGuardRequest(
  (params?: IPaginatedRequest) =>
    appApiInstance.get<IPaginatedResponse<IGetUserDto>>(`/${ROUTE}`, {
      params,
    })
);

export const createUserRequest = createGuardRequest((data: ICreateUserDto) =>
  appApiInstance.post<IGetUserDto>("/users", { ...data })
);

export const getUserByIdRequest = createGuardRequest((id: string) =>
  appApiInstance.get<IGetUserDto>(`/${ROUTE}/${id}`)
);

export const editUserByIdRequest = createGuardRequest(
  (id: string, data: IEditUserDto) =>
    appApiInstance.patch<IGetUserDto>(`/${ROUTE}/${id}`, data)
);

export const deleteUsersRequest = createGuardRequest(
  (data: IManyDeleteRequestOptions) =>
    appApiInstance.delete(`/${ROUTE}`, { data })
);

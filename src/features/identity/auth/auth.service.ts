import { createGuardRequest } from "@/shared/utils";
import { IAuthDataDto, ILoginDto, ILoginException } from "./auth.types";
import { appApiInstance } from "@/shared/api/instances";

export const login = createGuardRequest<IAuthDataDto, ILoginException>(
  (data: ILoginDto) => appApiInstance.post<IAuthDataDto>("/auth/sign-in", data)
);

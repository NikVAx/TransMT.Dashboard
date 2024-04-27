
import { createGuardRequest } from "@/shared/utils";
import { IAuthDataDto, ILoginDto } from "./auth.types";
import { appApiInstance } from "@/shared/api/instances";

export const loginRequest = createGuardRequest(
  (data: ILoginDto) =>
    appApiInstance.post<IAuthDataDto>("/auth/sign-in", data)
);

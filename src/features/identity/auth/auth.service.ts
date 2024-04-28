import { createGuardRequest } from "@/shared/utils";
import {
  IAuthDataDto,
  ILoginDto,
  IUserWithRoles,
  STORAGE_KEYS,
} from "./auth.types";
import { appApiInstance } from "@/shared/api/instances";

export const loginRequest = createGuardRequest((data: ILoginDto) =>
  appApiInstance.post<IAuthDataDto>("/auth/sign-in", data)
);

export const getLocalUserOrNull = () => {
  const localUser = localStorage.getItem(STORAGE_KEYS.USER);

  if (localUser) {
    return JSON.parse(localUser) as IUserWithRoles;
  } else {
    return null;
  }
};

export const getLocalAccessTokenOrNull = () => {
  const localUser = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (localUser) {
    return JSON.parse(localUser) as string;
  } else {
    return null;
  }
};

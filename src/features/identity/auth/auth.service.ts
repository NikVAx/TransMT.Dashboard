import { createGuardRequest } from "@/shared/utils";
import { IAuthDataDto, ILoginDto, IUserWithRoles } from "./auth.types";
import { appApiInstance } from "@/shared/api/instances";
import { STORAGE_KEYS } from "@/shared/constants/constants";

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
  const localAccessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (localAccessToken) {
    return localAccessToken;
  } else {
    return null;
  }
};

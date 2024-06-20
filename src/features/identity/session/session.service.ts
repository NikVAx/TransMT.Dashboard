import { appApiInstance } from "@/shared/api";
import { createGuardRequest } from "@/shared/utils";

export const getSessionsRequest = createGuardRequest((userId: string) =>
  appApiInstance.get<IGetSessionDto[]>(`/auth/${userId}/sessions`)
);

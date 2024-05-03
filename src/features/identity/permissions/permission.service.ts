import { createGuardRequest } from "@/shared/utils";
import { IPermission } from "./permission.types";
import { appApiInstance } from "@/shared/api";

const ROUTE = "permissions";

export const getPermissions = createGuardRequest(() =>
  appApiInstance.get<IPermission[]>(`/${ROUTE}`, {})
);

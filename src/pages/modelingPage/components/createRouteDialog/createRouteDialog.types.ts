import { ICreateRouteOptions } from "@/features";

export interface ICreateRouteDialogContentProps {
  initialState: ICreateRouteOptions | null,
  onClick?: (options: ICreateRouteOptions) => void;
}

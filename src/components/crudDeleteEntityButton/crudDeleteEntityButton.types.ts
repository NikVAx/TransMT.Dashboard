import { IEntity } from "@/shared/types";

export interface CrudDeleteEntityButtonProps<T extends IEntity> {
  message: string;
  data: T;
  onAccept: (data: T) => void;
}

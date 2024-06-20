import { IEntity } from "@/shared/types";

export interface IOperator extends IEntity {
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface IGetOperatorDto extends IOperator {}
export interface ICreateOperatorDto extends Omit<IOperator, "id"> {}
export interface IEditOperatorDto extends Partial<ICreateOperatorDto> {}

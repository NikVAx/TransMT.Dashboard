import { IEntity } from "@/shared/types";

export interface IOperator extends IEntity {

}

export interface IGetOperatorDto extends IOperator {}
export interface ICreateOperatorDto extends Omit<IOperator, "id"> {}
export interface IEditOperatorDto extends Partial<ICreateOperatorDto> {}

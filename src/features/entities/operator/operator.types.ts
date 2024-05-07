export interface IOperator {
  id: string;
}

export interface IGetOperatorDto extends IOperator {}
export interface ICreateOperatorDto extends Omit<IOperator, "id"> {}
export interface IEditOperatorDto extends Partial<ICreateOperatorDto> {}

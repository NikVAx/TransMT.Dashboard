import { IEntity } from "@/shared/types";

export interface IUser extends IEntity {
  username: string;
  email: string;
  roles: string[]
}

export interface IGetUserDto extends IUser {}

export interface ICreateUserDto extends Omit<IUser, "id"> {
  password: string;
}

export interface IEditUserDto extends Partial<Omit<IUser, "id">> {}

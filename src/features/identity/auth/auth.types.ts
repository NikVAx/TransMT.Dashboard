import { IUser } from "../user";

export interface ILoginDto {
  username: string;
  password: string;
}

export interface IUserWithRoles extends IUser {}

export interface IAuthDataDto {
  user: IUserWithRoles | null;
  accessToken: string | null;
}

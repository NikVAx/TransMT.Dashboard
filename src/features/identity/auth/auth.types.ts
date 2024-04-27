import { IRole } from "../role";
import { IUser } from "../user";

export interface ILoginDto {
  username: string;
  password: string;
}

export interface ILoginException {

}

export interface IUserWithRoles extends IUser {
  roles: IRole[];
}

export interface IAuthDataDto {
  user: IUserWithRoles | null;
  accessToken: string | null;
}

export enum STORAGE_KEYS {
  ACCESS_TOKEN = "access-token",
  USER = "user",
}

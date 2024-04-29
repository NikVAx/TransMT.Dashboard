import { IRole } from "../role";
import { IUser } from "../user";

export interface ILoginDto {
  username: string;
  password: string;
}

export interface IUserWithRoles extends IUser {
  roles: IRole[];
}

export interface IAuthDataDto {
  user: IUserWithRoles | null;
  accessToken: string | null;
}



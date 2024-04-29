export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface IGetUserDto extends IUser {}

export interface ICreateUserDto extends Omit<IUser, "id"> {
  password: string;
}

export interface IEditUserDto extends Partial<Omit<IUser, "id">> {}

export interface IRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface IGetRoleDto extends Omit<IRole, "permissions"> {}
export interface IGetRoleWithShortPermissionsDto extends IRole {}
export interface ICreateRoleDto extends Omit<IRole, "id"> {}
export interface IEditRoleDto extends Omit<IRole, "id"> {}
import { RootStore } from "@/app/store";
import { PaginationStore } from "@/features/pagination";
import { ICreateRoleDto, IEditRoleDto, IRole } from "./role.types";
import { makeAutoObservable, runInAction } from "mobx";
import {
  createRoleRequest,
  deleteRolesRequest,
  editRoleByIdRequest,
  getRoleByIdRequest,
  getRolesRequest,
} from "./role.service";
import { IDeleteOptions, fail, success } from "@/shared/types";
import { toArray } from "@/shared/utils";

export class RoleStore {
  pagination: PaginationStore;
  roles: IRole[];
  isLoading: boolean;

  constructor(_: RootStore) {
    this.isLoading = false;
    this.roles = [];
    this.pagination = new PaginationStore();
    makeAutoObservable(this);
  }

  public async getRolesPage() {
    this.loading();

    const [status, response] = await getRolesRequest(this.pagination);

    runInAction(() => {
      if (status) {
        this.roles = response.data.items.map<IRole>((dto) => ({
          ...dto,
          permissions: [],
        }));
        this.pagination.totalCount = response.data.totalCount;
        return this.success();
      } else {
        return this.fail();
      }
    });
  }

  public async getRoleById(id: string) {
    this.loading();

    const [status, response] = await getRoleByIdRequest(id);
    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async createRole(options: ICreateRoleDto) {
    this.loading();

    const [status, response] = await createRoleRequest(options);

    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async editRoleById(id: string, options: IEditRoleDto) {
    this.loading();

    const [status, response] = await editRoleByIdRequest(id, options);

    if (status) {
      this.isLoading = false;
      return success(response.data);
    } else {
      return this.fail();
    }
  }

  public async deleteRoles(options: IDeleteOptions) {
    this.loading();

    const [status, _] = await deleteRolesRequest({
      keys: toArray(options.keys),
    });

    if (status) {
      this.getRolesPage();
    } else {
      this.fail();
    }
  }

  private loading() {
    this.isLoading = true;
  }

  private success<T>(data?: T) {
    this.isLoading = false;
    return success(data);
  }

  private fail<E>(error?: E) {
    this.isLoading = false;
    return fail(error);
  }
}

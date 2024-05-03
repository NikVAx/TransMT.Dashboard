import { RootStore } from "@/app/store";
import { PaginationStore } from "@/features/pagination";
import { STATES } from "@/shared/constants/constants";
import { ICreateRoleDto, IEditRoleDto, IRole } from "./role.types";
import { makeAutoObservable, runInAction } from "mobx";
import {
  createRoleRequest,
  deleteRolesRequest,
  editRoleByIdRequest,
  getRoleByIdRequest,
  getRolesRequest,
} from "./role.service";
import { IManyDeleteOptions } from "@/shared/types";
import { toArray } from "@/shared/utils";

export class RoleStore {
  state: STATES;
  pagination: PaginationStore;
  roles: IRole[];

  constructor(_: RootStore) {
    this.state = STATES.INITIAL;
    this.roles = [];
    this.pagination = new PaginationStore();
    makeAutoObservable(this);
  }

  public async getRolesPage() {
    this.setLoading();

    const [status, response] = await getRolesRequest(this.pagination);

    runInAction(() => {
      if (status) {
        this.roles = response.data.items.map<IRole>((dto) => ({
          ...dto,
          permissions: [],
        }));
        this.pagination.totalCount = response.data.totalCount;
        this.setDone();
      } else {
        this.setError("failed to load roles");
      }
    });
  }

  public async getRoleById(id: string) {
    this.setLoading();
    const [status, response] = await getRoleByIdRequest(id);
    if (status) {
      this.setDone();
      return response.data;
    } else {
      this.setError();
      return null;
    }
  }

  public async createRole(options: ICreateRoleDto) {
    this.setLoading();

    const [status, response] = await createRoleRequest(options);

    if (status) {
      this.setDone();
      return response.data;
    } else {
      this.setError();
      return null;
    }
  }

  public async editRoleById(id: string, options: IEditRoleDto) {
    this.setLoading();

    const [status, response] = await editRoleByIdRequest(id, options);

    if (status) {
      this.setDone();
      return response.data;
    } else {
      this.setError();
      return null;
    }
  }

  public async deleteRoles(options: IManyDeleteOptions) {
    this.setLoading();

    const [status, response] = await deleteRolesRequest({
      keys: toArray(options.keys),
    });

    if (status) {
      this.getRolesPage();
    } else {
      this.setError(response);
    }
  }

  private setLoading() {
    this.state = STATES.LOADING;
  }
  private setDone() {
    this.state = STATES.DONE;
  }
  private setError(object?: unknown) {
    this.state = STATES.ERROR;
    console.error(object);
  }
  get isLoading() {
    return this.state === STATES.LOADING;
  }
}

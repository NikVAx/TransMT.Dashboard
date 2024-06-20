import { makeAutoObservable, runInAction } from "mobx";
import { IPermission } from "./permission.types";
import { getPermissions } from "./permission.service";
import { RootStore } from "@/app/store";

export class PermissionStore {
  constructor(public rootStore: RootStore) {
    makeAutoObservable(this);
    this.permissions = [];
  }

  public permissions: IPermission[];

  public async fetchPermissions() {
    const [status, response] = await getPermissions();

    runInAction(async () => {
      if (status) {
        this.permissions = response.data;
      }
    });
  }

  public getSeparated(permissions: string[]) {
    let included: IPermission[] = [];
    let excluded: IPermission[] = [];

    this.permissions.forEach((perm) => {
      if (permissions.some((id) => id === perm.id)) {
        included.push(perm);
      } else {
        excluded.push(perm);
      }
    });

    return { included, excluded }
  }
}

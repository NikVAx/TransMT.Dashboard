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
}

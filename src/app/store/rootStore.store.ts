import { AuthStore, SessionStore } from "@/features";
import { RoleStore } from "@/features/identity/role/role.store";
import { UserStore } from "@/features/identity/user/user.store";
import { makeAutoObservable } from "mobx";

export class RootStore {
  authStore: AuthStore;
  sessionStore: SessionStore;
  userStore: UserStore;
  roleStore: RoleStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.roleStore = new RoleStore(this);
    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();

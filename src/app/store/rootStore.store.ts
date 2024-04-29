import { AuthStore, SessionStore } from "@/features";
import { UserStore } from "@/features/identity/user/user.store";
import { makeAutoObservable } from "mobx";

export class RootStore {
  authStore: AuthStore;
  sessionStore: SessionStore;
  userStore: UserStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();

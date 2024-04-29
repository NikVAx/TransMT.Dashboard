import { AuthStore, SessionStore } from "@/features";
import { makeAutoObservable } from "mobx";

export class RootStore {
  authStore: AuthStore;
  sessionStore: SessionStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.sessionStore = new SessionStore(this);
    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();

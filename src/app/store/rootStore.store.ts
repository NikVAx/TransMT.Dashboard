import { AuthStore } from "@/features";
import { makeAutoObservable } from "mobx";

export class RootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();

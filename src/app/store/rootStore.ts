import { makeAutoObservable } from "mobx";

export class RootStore {

  constructor() {

    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();

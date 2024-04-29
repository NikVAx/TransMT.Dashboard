import { RootStore } from "@/app/store";
import { STATES } from "@/shared/constants/constants";
import { makeAutoObservable, runInAction } from "mobx";
import { IUser } from "./user.types";
import { getUsersRequest } from "./user.service";
import { PaginationStore } from "@/features/pagination";

export class UserStore {
  state: STATES;
  users: IUser[];
  pagination: PaginationStore;

  constructor(_: RootStore) {
    this.state = STATES.INITIAL;
    this.users = [];
    this.pagination = new PaginationStore();
    makeAutoObservable(this);
  }

  public async getUsersPage() {
    runInAction(() => {
      this.state = STATES.LOADING;
    });

    const [status, response] = await getUsersRequest(this.pagination);

    runInAction(() => {
      if (status) {
        this.users = response.data.items;
        this.pagination.totalCount = response.data.totalCount;
        this.state = STATES.DONE;
      } else {
        this.state = STATES.ERROR;
      }
    });
  }

  get isLoading() {
    return this.state === STATES.LOADING;
  }
}

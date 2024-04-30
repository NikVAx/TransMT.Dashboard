import { RootStore } from "@/app/store";
import { STATES } from "@/shared/constants/constants";
import { makeAutoObservable, runInAction } from "mobx";
import { ICreateUserDto, IUser } from "./user.types";
import { createUserRequest, deleteUsersRequest, getUsersRequest } from "./user.service";
import { PaginationStore } from "@/features/pagination";
import { IManyDeleteOptions, IManyDeleteRequestOptions } from "@/shared/types";
import { toArray } from "@/shared/utils";

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
        console.log("failed to load users");
      }
    });
  }

  public async createUser(options: ICreateUserDto) {
    runInAction(() => {
      this.state = STATES.LOADING;
    });

    const [status] = await createUserRequest(options);

    runInAction(() => {
      if (status) {
        this.getUsersPage();
      } else {
        this.state = STATES.ERROR;
      }
    });
  }

  get isLoading() {
    return this.state === STATES.LOADING;
  }
}

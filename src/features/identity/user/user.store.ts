import { RootStore } from "@/app/store";
import { STATES } from "@/shared/constants/constants";
import { makeAutoObservable, runInAction } from "mobx";
import { ICreateUserDto, IUser } from "./user.types";
import { createUserRequest, getUsersRequest } from "./user.service";
import { PaginationStore } from "@/features/pagination";

export class UserStore {
  state: STATES;
  pagination: PaginationStore;
  users: IUser[];

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

    const [status, response] = await createUserRequest(options);
    console.log(status, response);

    runInAction(() => {
      if (status) {
        this.state = STATES.DONE;
      } else {
        this.state = STATES.ERROR;
        console.log("failed to create user");
      }
    });
  }

  get isLoading() {
    return this.state === STATES.LOADING;
  }
}

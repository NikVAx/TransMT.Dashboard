import { RootStore } from "@/app/store";
import { makeAutoObservable, runInAction } from "mobx";
import { ICreateUserDto, IUser } from "./user.types";
import { createUserRequest, getUsersRequest } from "./user.service";
import { PaginationStore } from "@/features/pagination";
import { fail, success } from "@/shared/types";

export class UserStore {
  pagination: PaginationStore;
  users: IUser[];
  isLoading: boolean;

  constructor(_: RootStore) {
    this.isLoading = false;
    this.users = [];
    this.pagination = new PaginationStore();
    makeAutoObservable(this);
  }

  public async getUsersPage() {
    this.loading();

    const [status, response] = await getUsersRequest(this.pagination);

    runInAction(() => {
      if (status) {
        this.users = response.data.items;
        this.pagination.totalCount = response.data.totalCount;
        this.success();
      } else {
        this.fail();
      }
    });
  }

  public async createUser(options: ICreateUserDto) {
    this.loading();

    const [status, response] = await createUserRequest(options);

    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  private loading() {
    this.isLoading = true;
  }

  private success<T>(data?: T) {
    this.isLoading = false;
    return success(data);
  }

  private fail<E>(error?: E) {
    this.isLoading = false;
    return fail(error);
  }
}

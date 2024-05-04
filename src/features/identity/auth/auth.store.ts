import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "@/app/store";
import { STORAGE_KEYS } from "@/shared/constants";
import { ILoginDto, IUserWithRoles } from "./auth.types";
import {
  getLocalAccessTokenOrNull,
  getLocalUserOrNull,
  loginRequest,
} from "./auth.service";
import { fail, success } from "@/shared/types";

export class AuthStore {
  user: IUserWithRoles | null;
  accessToken: string | null;
  isLoading: boolean;

  constructor(_: RootStore) {
    this.user = getLocalUserOrNull();
    this.accessToken = getLocalAccessTokenOrNull();
    this.isLoading = false;
    makeAutoObservable(this);
  }

  login = async (options: ILoginDto) => {
    this.loading();
    this.logout();

    const [status, response] = await loginRequest(options);
    
    return runInAction(() => {
      if (status) {
        this.user = response.data.user;
        this.accessToken = response.data.accessToken;
        if (this.accessToken) {
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, this.accessToken);
        }
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.user));
        return this.fail();
      } else {
        return this.success();
      }
    });
  };

  logout = () => {
    this.accessToken = null;
    this.user = null;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

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

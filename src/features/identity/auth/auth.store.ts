import { ILoginDto, IUserWithRoles } from "./auth.types";
import {
  getLocalAccessTokenOrNull,
  getLocalUserOrNull,
  loginRequest,
} from "./auth.service";
import { RootStore } from "@/app/store";
import { makeAutoObservable, runInAction } from "mobx";
import { STATES, STORAGE_KEYS } from "@/shared/constants/constants";

export class AuthStore {
  user: IUserWithRoles | null;
  accessToken: string | null;
  state: STATES;

  constructor(_: RootStore) {
    this.user = getLocalUserOrNull();
    this.accessToken = getLocalAccessTokenOrNull();
    this.state = STATES.INITIAL;
    makeAutoObservable(this);
  }

  login = async (options: ILoginDto) => {
    runInAction(() => {
      this.state = STATES.LOADING;
      this.logout();
    });
    const [status, response] = await loginRequest(options);
    runInAction(() => {
      if (status) {
        this.user = response.data.user;
        this.accessToken = response.data.accessToken;
        if (this.accessToken) {
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, this.accessToken);
        }
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.user));
        this.state = STATES.DONE;
      } else {
        this.state = STATES.ERROR;
      }
    });

    return this.state === STATES.DONE;
  };

  logout = () => {
    this.accessToken = null;
    this.user = null;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };
}

import { ILoginDto, IUserWithRoles } from "./auth.types";
import { loginRequest } from "./auth.service";
import { IUser } from "../user";
import { IRole } from "../role";
import { RootStore } from "@/app/store";
import { makeAutoObservable, runInAction } from "mobx";

export enum STATES {
  INITIAL = "initial",
  LOADING = "loading",
  DONE = "done",
  ERROR = "error",
}

export class AuthStore {
  user: IUserWithRoles | null;
  accessToken: string | null;
  state: STATES;

  constructor(_: RootStore) {
    this.user = null;
    this.accessToken = null;
    this.state = STATES.INITIAL;
    makeAutoObservable(this);
  }

  login = async (options: ILoginDto) => {
    runInAction(() => {
      this.state = STATES.LOADING;
    });
    const [status, response] = await loginRequest(options);
    runInAction(() => {
      console.log(response);
      if (status) {
        this.user = response.data.user;
        this.accessToken = response.data.accessToken;
        this.state = STATES.DONE;
      } else {
        this.state = STATES.ERROR;
      }
    });
  };
}

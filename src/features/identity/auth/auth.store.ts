import { RootStore } from "@/app/store";
import { makeAutoObservable } from "mobx";
import { ILoginDto, ILoginException } from "./auth.types";
import { login } from "./auth.service";

export class AuthStore {
  constructor(public rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async login(options: ILoginDto) {
    const [status, data] = await login<ILoginException>(options);

    if (status) {
      data; // IAuthDataDto
    } else {
      data; // ILoginException
    }
  }
}

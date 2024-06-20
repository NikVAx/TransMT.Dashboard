import { RootStore } from "@/app/store";
import { makeAutoObservable, runInAction } from "mobx";
import { getSessionsRequest } from "./session.service";
import { getLocalUserOrNull } from "../auth";
import { fail, success } from "@/shared/types";

export class SessionStore {
  sessions: ISession[];
  isLoading: boolean;

  constructor(_: RootStore) {
    this.sessions = [];
    this.isLoading = false;
    makeAutoObservable(this);
  }

  getSessions = async () => {
    this.loading();
    const id = getLocalUserOrNull()?.id;
    if (!id) {
      return this.fail();
    }
    const [status, response] = await getSessionsRequest(id);
    if (status) {
      runInAction(() => {
        this.sessions = response.data.map<ISession>((dto) => {
          const expiredAtDate = new Date(dto.expiredAt);
          const createdAtDate = new Date(dto.createdAt);

          return {
            ...dto,
            expiredAt: expiredAtDate,
            createdAt: createdAtDate,
            isExpired: new Date(Date.now()) > expiredAtDate,
          };
        });
      });
      return this.success();
    } else {
      return this.fail();
    }
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

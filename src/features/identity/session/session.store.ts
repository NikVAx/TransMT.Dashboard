import { RootStore } from "@/app/store";
import { STATES } from "@/shared/constants/constants";
import { makeAutoObservable, runInAction } from "mobx";
import { getSessionsRequest } from "./session.service";
import { getLocalUserOrNull } from "../auth";

export class SessionStore {
  sessions: ISession[];
  state: STATES;

  constructor(_: RootStore) {
    this.sessions = [];
    this.state = STATES.INITIAL;
    makeAutoObservable(this);
  }

  getSessions = async () => {
    runInAction(() => {
      this.state = STATES.LOADING;
    });
    const id = getLocalUserOrNull()?.id;
    if (id) {
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
        runInAction(() => {
          this.state = STATES.DONE;
        });
      } else {
        runInAction(() => {
          this.state = STATES.ERROR;
        });
      }
    }
  };
}

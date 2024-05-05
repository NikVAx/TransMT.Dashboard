import { RootStore } from "@/app/store";
import {
  IManyDeleteOptions,
  IManyDeleteRequestOptions,
  fail,
  success,
} from "@/shared/types";
import { makeAutoObservable } from "mobx";
import { IBuilding, ICreateBuildingDto } from "./building.types";
import {
  createBuildingRequest,
  deleteBuildingsRequest,
  getBuildingsRequest,
} from "./building.services";
import { toArray } from "@/shared/utils";
import { PaginationStore } from "@/features/pagination";

export class BuildingStore {
  buildings: IBuilding[];
  isLoading: boolean;
  pagination: PaginationStore;

  constructor(public rootStore: RootStore) {
    this.isLoading = false;
    this.buildings = [];
    this.pagination = new PaginationStore();

    makeAutoObservable(this);
  }

  public async deleteBuildings(options: IManyDeleteOptions) {
    this.loading();
    const mappedOptions: IManyDeleteRequestOptions = {
      ...options,
      keys: toArray(options.keys),
    };

    const [status] = await deleteBuildingsRequest(mappedOptions);

    if (status) {
      this.getBuildingsPage();
    } else {
      this.fail();
    }
  }

  public async createBuilding(options: ICreateBuildingDto) {
    this.loading();
    const [status] = await createBuildingRequest(options);

    if (status) {
      this.getBuildingsPage();
    } else {
      this.fail();
    }
  }

  public async getBuildingsPage() {
    this.loading();
    const [status, response] = await getBuildingsRequest(this.pagination);

    if (status) {
      this.buildings = response.data.items;
      this.success();
    } else {
      this.fail();
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

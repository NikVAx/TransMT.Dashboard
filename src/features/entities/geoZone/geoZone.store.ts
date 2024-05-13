import { RootStore } from "@/app/store";
import {
  IDeleteOptions,
  IManyDeleteRequestOptions,
  fail,
  success,
} from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";
import { IGeoZone, ICreateGeoZoneDto } from "./geoZone.types";
import {
  createGeoZoneRequest,
  deleteGeoZonesRequest,
  getGeoZonesRequest,
} from "./geoZone.services";
import { toArray } from "@/shared/utils";
import { PaginationStore } from "@/features/pagination";

export class GeoZoneStore {
  geoZones: IGeoZone[];
  isLoading: boolean;
  pagination: PaginationStore;

  constructor(public rootStore: RootStore) {
    this.isLoading = false;
    this.geoZones = [];
    this.pagination = new PaginationStore();

    makeAutoObservable(this);
  }

  public async deleteGeoZones(options: IDeleteOptions) {
    this.loading();
    const mappedOptions: IManyDeleteRequestOptions = {
      ...options,
      keys: toArray(options.keys),
    };

    const [status] = await deleteGeoZonesRequest(mappedOptions);

    if (status) {
      this.getGeoZonesPage();
    } else {
      this.fail();
    }
  }

  public async createGeoZone(options: ICreateGeoZoneDto) {
    this.loading();
    const [status, response] = await createGeoZoneRequest(options);

    if (status) {
      return this.success(response.data)
    } else {
      return this.fail();
    }
  }

  public async getGeoZonesPage() {
    this.loading();
    const [status, response] = await getGeoZonesRequest(this.pagination);

    runInAction(() => {
      if (status) {
        this.geoZones = response.data.items;
        this.pagination.totalCount = response.data.totalCount;
        return this.success();
      } else {
        return this.fail();
      }
    });
  

    if (status) {
      this.geoZones = response.data.items;
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

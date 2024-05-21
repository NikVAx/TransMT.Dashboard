import { RootStore } from "@/app/store";
import {
  IDeleteOptions,
  IManyDeleteRequestOptions,
  fail,
  success,
} from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";
import { IVehicle, ICreateVehicleDto, IEditVehicleDto } from "./vehicle.types";
import {
  createVehicleRequest,
  deleteVehicleByIdRequest,
  deleteVehiclesRequest,
  editVehicleByIdRequest,
  getVehicleByIdRequest,
  getVehiclesRequest,
} from "./vehicle.services";
import { toArray } from "@/shared/utils";
import { PaginationStore } from "@/features/pagination";


export class VehicleStore {
  vehicles: IVehicle[];
  isLoading: boolean;
  pagination: PaginationStore;

  constructor(public rootStore: RootStore) {
    this.isLoading = false;
    this.vehicles = [];
    this.pagination = new PaginationStore();

    makeAutoObservable(this);
  }

  public async deleteVehicles(options: IDeleteOptions) {
    this.loading();
    const mappedOptions: IManyDeleteRequestOptions = {
      ...options,
      keys: toArray(options.keys),
    };

    const [status] =
      mappedOptions.keys.length === 1
        ? await deleteVehicleByIdRequest(options.keys[0])
        : await deleteVehiclesRequest(mappedOptions);

    if (status) {
      this.getVehiclesPage();
    } else {
      this.fail();
    }
  }

  public async createVehicle(options: ICreateVehicleDto) {
    this.loading();
    const [status, response] = await createVehicleRequest(options);

    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async getVehiclesPage() {
    this.loading();
    const [status, response] = await getVehiclesRequest(this.pagination);
    return runInAction(() => {
      if (status) {
        this.vehicles = response.data.items;
        this.pagination.totalCount = response.data.totalCount;
        return this.success();
      } else {
        return this.fail();
      }
    });
  }

  public async getVehicleById(id: string) {
    this.loading();

    const [status, response] = await getVehicleByIdRequest(id);
    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async editVehicleById(id: string, options: IEditVehicleDto) {
    this.loading();
    const [status, response] = await editVehicleByIdRequest(id, options);

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

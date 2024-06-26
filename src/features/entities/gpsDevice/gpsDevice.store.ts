import { RootStore } from "@/app/store";
import {
  IDeleteOptions,
  IManyDeleteRequestOptions,
  fail,
  success,
} from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";
import {
  IGpsDevice,
  ICreateGpsDeviceDto,
  IEditGpsDeviceDto,
} from "./gpsDevice.types";
import {
  createGpsDeviceRequest,
  deleteGpsDevicesRequest,
  editGpsDeviceByIdRequest,
  getGpsDeviceByIdRequest,
  getGpsDevicesRequest,
} from "./gpsDevice.services";
import { toArray } from "@/shared/utils";
import { PaginationStore } from "@/features/pagination";

export class GpsDeviceStore {
  devices: IGpsDevice[];
  isLoading: boolean;
  pagination: PaginationStore;

  constructor(public rootStore: RootStore) {
    this.isLoading = false;
    this.devices = [];
    this.pagination = new PaginationStore();

    makeAutoObservable(this);
  }

  public async deleteGpsDevices(options: IDeleteOptions) {
    this.loading();
    const mappedOptions: IManyDeleteRequestOptions = {
      ...options,
      keys: toArray(options.keys),
    };

    const [status] = await deleteGpsDevicesRequest(mappedOptions);

    if (status) {
      this.getGpsDevicesPage();
    } else {
      this.fail();
    }
  }

  public async createGpsDevice(options: ICreateGpsDeviceDto) {
    this.loading();
    const [status, response] = await createGpsDeviceRequest(options);

    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async getGpsDevicesPage() {
    this.loading();
    const [status, response] = await getGpsDevicesRequest(this.pagination);

    return runInAction(() => {
      if (status) {
        this.devices = response.data.items;
        this.pagination.totalCount = response.data.totalCount;
        return this.success();
      } else {
        return this.fail();
      }
    });
  }

  public async getGpsDeviceById(id: string) {
    this.loading();

    const [status, response] = await getGpsDeviceByIdRequest(id);
    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async editGpsDeviceById(id: string, options: IEditGpsDeviceDto) {
    this.loading();
    const [status, response] = await editGpsDeviceByIdRequest(id, options);

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

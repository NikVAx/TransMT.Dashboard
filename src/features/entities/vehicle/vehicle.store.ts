import { RootStore } from "@/app/store";
import {
  IDeleteOptions,
  ILatLng,
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
import { IBuilding } from "../building";

export class Vehicle implements IVehicle {
  id: string;
  number: string;
  type: string;
  operatingStatus: string;
  storageAreaId: string;
  storageArea: IBuilding;

  latlng?: ILatLng;

  constructor(vehicle: IVehicle) {
    makeAutoObservable(this);

    this.id = vehicle.id;
    this.number = vehicle.number;
    this.type = vehicle.type;
    this.operatingStatus = vehicle.operatingStatus;
    this.storageArea = vehicle.storageArea;
    this.storageAreaId = vehicle.storageAreaId;
    this.latlng = vehicle.latlng;
  }
}

export class VehicleStore {
  vehicles: Vehicle[];
  isLoading: boolean;
  pagination: PaginationStore;

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this);

    this.isLoading = false;
    this.vehicles = [];
    this.pagination = new PaginationStore();
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
        this.vehicles = response.data.items.map(
          (vehicleDto) =>
            new Vehicle({
              ...vehicleDto,
              latlng: undefined,
            })
        );
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

  public update(data: any) {
    const index = this.vehicles.findIndex((x) => x.id === data.vehicleId);
    if (index !== -1) {
      this.vehicles[index].operatingStatus = data.vehicleStatus;
      this.vehicles[index].latlng = { lat: data.lat, lng: data.lng } as ILatLng;
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

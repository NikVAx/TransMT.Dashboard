import {
  AuthStore,
  BuildingStore,
  GeoZoneStore,
  SessionStore,
} from "@/features";
import { GpsDeviceStore } from "@/features/entities/gpsDevice";
import { OperatorStore } from "@/features/entities/operator";
import { VehicleStore } from "@/features/entities/vehicle";
import { PermissionStore } from "@/features/identity/permissions";
import { RoleStore } from "@/features/identity/role/role.store";
import { UserStore } from "@/features/identity/user/user.store";
import { makeAutoObservable } from "mobx";

export class RootStore {
  authStore: AuthStore;
  sessionStore: SessionStore;
  userStore: UserStore;
  roleStore: RoleStore;
  permissionStore: PermissionStore;
  buildingStore: BuildingStore;
  vehicleStore: VehicleStore;
  operatorStore: OperatorStore;
  deviceStore: GpsDeviceStore;
  geoZoneStore: GeoZoneStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.roleStore = new RoleStore(this);
    this.permissionStore = new PermissionStore(this);
    this.buildingStore = new BuildingStore(this);
    this.vehicleStore = new VehicleStore(this);
    this.operatorStore = new OperatorStore(this);
    this.deviceStore = new GpsDeviceStore(this);
    this.geoZoneStore = new GeoZoneStore(this);

    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();

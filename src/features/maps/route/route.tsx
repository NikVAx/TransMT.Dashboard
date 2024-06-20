import { ILatLng } from "@/shared/types";
import { LatLng, latLng } from "leaflet";
import { makeAutoObservable } from "mobx";
import { ICreateRouteOptions, IDelayInfo, IDriveInfo, IRouteConfig, PointInfo, SegmentInfo } from "./route.types";
import { sum } from "@/pages/modelingPage/utils";
import { STORAGE_KEYS } from "@/shared/constants";
import { IGpsDevice } from "@/features/entities";

export class Waypoint implements ILatLng {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    makeAutoObservable(this);
  }

  latlng() {
    return latLng(this.lat, this.lng);
  }
}

export class Route implements IRouteConfig {
  id: string;
  device: IGpsDevice;
  name: string;
  points: Waypoint[];
  delays: IDelayInfo[];
  speeds: IDriveInfo[];

  constructor(config: IRouteConfig) {
    this.id = config.id;
    this.name = config.name;
    this.points = config.points;
    this.delays = config.delays;
    this.speeds = config.speeds;
    this.device = config.device;
    makeAutoObservable(this);
  }

  append(lat: number, lng: number) {
    this.points.push(new Waypoint(lat, lng));
  }

  latlngs() {
    return this.points.map((waypoint) => waypoint.latlng());
  }

  getDistance() {
    return this.points.slice(0, -1).reduce((acc, point, i) => {
      return acc + point.latlng().distanceTo(this.points[i + 1].latlng());
    }, 0);
  }

  getDelays() {
    return this.delays;
  }
}

export class RouteStore {
  idgen = 1;

  routes: Route[];

  constructor() {
    this.routes = [];
    makeAutoObservable(this);
  }

  create(name: string = "") {
    this.routes.push(
      new Route({
        id: this.idgen.toString(),
        name: name,
        delays: [],
        speeds: [],
        points: [],
        device: null!
      })
    );
    this.idgen += 1;
  }
}

export class Segment {
  x: LatLng;
  y: LatLng;
  speed: number;

  constructor(x: LatLng, y: LatLng, speed: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  interpolate(fraction: number) {
    return latLng(
      this.x.lat + (this.y.lat - this.x.lat) * fraction,
      this.x.lng + (this.y.lng - this.x.lng) * fraction
    );
  }

  getDistance() {
    return this.x.distanceTo(this.y);
  }

  getTimeOfPassage() {
    return (this.getDistance() / this.speed) * 1000;
  }
}

export class RouteModel {
  isExecuting: boolean;
  isHide: boolean;
  waypoint: Waypoint;
  time: number;
  route: Route;
  speed: number;
  status: string;

  constructor(route: Route) {
    this.isExecuting = false;
    this.isHide = false;
    this.waypoint = new Waypoint(route.points[0].lat, route.points[0].lng);
    this.time = 0;
    this.speed = 0;
    this.route = route;
    this.status = "";

    makeAutoObservable(this);
  }

  toggleExecuting() {
    this.isExecuting = !this.isExecuting;
  }
  
  toggleHide() {
    this.isHide = !this.isHide;
  }

  setWaypoint(position: LatLng) {
    this.waypoint.lat = position.lat;
    this.waypoint.lng = position.lng;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  setStatus(status: string) {
    this.status = status;
  }

  get maxTime() {
    const timeForSegments = this.getSegments()
      .map((x) => x.getTimeOfPassage())
      .reduce(sum, 0);
    const timeForDelays = this.getDelays().map(info => info.duration).reduce(sum, 0);

    return timeForSegments + timeForDelays;
  }

  setTime(time: number) {
    this.time = time > this.maxTime ? this.maxTime : time;
  }

  addInterval(interval: number) {
    this.setTime(this.time + interval);
  }

  getSegments() {
    let segments: Segment[] = [];
    for (let i = 0; i < this.route.points.length - 1; i++) {
      segments.push(
        new Segment(
          this.route.points[i].latlng(),
          this.route.points[i + 1].latlng(),
          this.route.speeds[i].speed
        )
      );
    }
    return segments;
  }

  getDelays() {
    return this.route.getDelays();
  }

  getOptionsByTime(time: number) {
    const delays = this.route.getDelays();
    const segments = this.getSegments();

    let totalDelay = 0;
    let totalPassage = 0;
    let totalDistance = 0;

    let locationData: PointInfo | SegmentInfo | null = null!;

    for (let i = 0; i < this.route.points.length - 1; i++) {
      const p0 = totalPassage + totalDelay; // время входа в точку
      const p1 = p0 + delays[i].duration; // время выхода из точки и входа на отрезок
      const p2 = p1 + segments[i].getTimeOfPassage(); // время выхода с отрезка

      totalDelay += delays[i].duration;
      totalPassage += segments[i].getTimeOfPassage();
      totalDistance += segments[i].getDistance();

      if (p0 <= time && time < p1) {
        locationData = {
          type: "point",
          name: `${i}`,
          a: p0,
          b: p1,
          status: this.route.delays[i].status
        } as PointInfo;
      } else if (p1 <= time && time <= p2) {
        locationData = {
          type: "segment",
          name: `${i}-${i + 1}`,
          a: p1,
          b: p2,
          fraction: (time - p1) / (p2 - p1),
          status: this.route.speeds[i].status
        } as SegmentInfo;
      }

      if (time <= totalDelay + totalPassage) {
        return {
          index: i,
          sumOfDelaysTime: totalDelay,
          sumOfPassageTime: totalPassage,
          sumOfDistance: totalDistance,
          info: locationData,
        };
      }
    }

    return {
      index: this.route.points.length - 1,
      sumOfDelaysTime: 0,
      sumOfPassageTime: 0,
      sumOfDistance: this.route.getDistance(),
      info: null,
    };
  }
}

export class RouteModelStore {
  private _store: RouteStore;

  constructor() {
    this._store = new RouteStore();
    makeAutoObservable(this);
  }

  get routes() {
    return this._store.routes.map((route) => new RouteModel(route));
  }

  create(options: ICreateRouteOptions) {
    this._store.create(options.name);
    const route = this._store.routes.at(-1)!;
    options.positions.forEach((position) => {
      route.append(position.lat, position.lng);
    });
    route.delays = options.delays;
    route.speeds = options.speeds;
    route.device = options.device as IGpsDevice;
  }

  remove(id: string) {
    const index = this._store.routes.map((route) => route.id).indexOf(id);
    this._store.routes.splice(index, 1);
  }

  save() {
    const string = JSON.stringify({
      idgen: this._store.idgen,
      routeConfigs: this.routes.map(
        (routeModel) => routeModel.route as IRouteConfig
      ),
    });
    localStorage.setItem(STORAGE_KEYS.MODELING_DATA, string);
    
  }

  load() {
    const string = localStorage.getItem(STORAGE_KEYS.MODELING_DATA);

    if (string === null) {
      this._store.idgen = 1;
      this._store.routes = [];
      return;
    }

    const object = JSON.parse(string!);

    this._store.idgen = object.idgen;
    this._store.routes = (object.routeConfigs as Array<IRouteConfig>).map(
      (config) => {
        return new Route({
          id: config.id,
          name: config.name,
          speeds: config.speeds,
          delays: config.delays,
          points: config.points.map(
            (waypoint) => new Waypoint(waypoint.lat, waypoint.lng)
          ),
          device: config.device
        });
      }
    );
  }
}

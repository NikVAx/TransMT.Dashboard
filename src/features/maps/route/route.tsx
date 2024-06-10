import { ILatLng } from "@/shared/types";
import { LatLng, latLng } from "leaflet";
import { makeAutoObservable } from "mobx";
import { ICreateRouteOptions } from "./route.types";
import { sum } from "@/pages/modelingPage/utils";

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

export interface IRouteConfig {
  id: string;
  name: string;
  // points: number[];
  delays: number[];
  // speeds: number[];
}

export function createDelays(positions: LatLng[]) {
  return positions.map((_, i) => i * 10000 * (i % 2)).map(() => 0);
}

export class Route implements IRouteConfig {
  id: string;
  name: string;
  waypoints: Waypoint[];
  delays: number[];
  // speeds: number[];

  constructor(id: string, name: string = "", waypoints: Waypoint[] = []) {
    this.id = id;
    this.name = name;
    this.waypoints = waypoints;
    this.delays = createDelays(this.latlngs());
    makeAutoObservable(this);
  }

  append(lat: number, lng: number) {
    this.waypoints.push(new Waypoint(lat, lng));
    this.delays = createDelays(this.latlngs());
  }

  latlngs() {
    return this.waypoints.map((waypoint) => waypoint.latlng());
  }

  getDistance() {
    return this.waypoints.slice(0, -1).reduce((acc, point, i) => {
      return acc + point.latlng().distanceTo(this.waypoints[i + 1].latlng());
    }, 0);
  }

  getDelays() {
    return this.delays;
  }
}

export class RouteStore {
  private idgen = 1;

  routes: Route[];

  constructor() {
    this.routes = [];
    makeAutoObservable(this);
  }

  create(name: string = "") {
    this.routes.push(new Route(this.idgen.toString(), name));
    this.idgen += 1;
  }

  save() {
    const string = JSON.stringify({
      idgen: this.idgen,
      routes: this.routes,
    });
    localStorage.setItem("route-data", string);
  }

  load() {
    const string = localStorage.getItem("route-data");
    const object = JSON.parse(string!);
    this.idgen = object.idgen;
    this.routes = (object.routes as Route[]).map(
      (route) =>
        new Route(
          route.id,
          route.name,
          route.waypoints.map(
            (waypoint) => new Waypoint(waypoint.lat, waypoint.lng)
          )
        )
    );
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

  constructor(route: Route) {
    this.isExecuting = false;
    this.isHide = false;
    this.waypoint = new Waypoint(
      route.waypoints[0].lat,
      route.waypoints[0].lng
    );
    this.time = 0;
    this.speed = 0;
    this.route = route;

    makeAutoObservable(this);
  }

  toggleExecuting() {
    this.isExecuting = !this.isExecuting;
  }

  setWaypoint(position: LatLng) {
    this.waypoint.lat = position.lat;
    this.waypoint.lng = position.lng;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  get maxTime() {
    const timeForSegments = this.getSegments()
      .map((x) => x.getTimeOfPassage())
      .reduce(sum, 0);
    const timeForDelays = this.getDelays().reduce(sum, 0);

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
    for (let i = 0; i < this.route.waypoints.length - 1; i++) {
      segments.push(
        new Segment(
          this.route.waypoints[i].latlng(),
          this.route.waypoints[i + 1].latlng(),
          15 + 10 * i
        )
      );
    }
    return segments;
  }

  getDelays() {
    return this.route.getDelays();
  }

  getTargetDistance(index: number, time: number) {
    const segments = this.getSegments();
    let sumOfDistance = 0;
    let sumOfTime = 0;

    for (let i = 0; i <= index - 1; ++i) {
      sumOfDistance += segments[i].getDistance();
      sumOfTime += segments[i].getTimeOfPassage();
    }

    if (index === this.route.waypoints.length - 1) {
      return this.route.getDistance();
    }

    return sumOfDistance + ((time - sumOfTime) / 1000) * segments[index].speed;
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
  }

  remove(id: string) {
    const index = this._store.routes.map((route) => route.id).indexOf(id);
    this._store.routes.splice(index, 1);
  }

  save() {
    this._store.save();
  }

  load() {
    this._store.load();
  }
}

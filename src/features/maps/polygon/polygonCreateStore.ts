import { ILatLng } from "@/shared/types";
import { LatLng, latLng } from "leaflet";
import { makeAutoObservable } from "mobx";

export function toLatLng(position: ILatLng) {
  return latLng(position.lat, position.lng);
}

export class MapDragNode {
  id: number;
  position: LatLng;
  isDraggable: boolean;

  constructor(position: ILatLng, id: number) {
    this.position = toLatLng(position);
    this.isDraggable = true;
    this.id = id;
    makeAutoObservable(this);
  }

  toggleDraggable() {
    this.isDraggable = !this.isDraggable;
  }

  setPosition(position: ILatLng) {
    this.position = toLatLng(position);
  }
}

export class MapPolygonStore {
  nodes: MapDragNode[];

  isEditing: boolean;
  isComplited: boolean;

  constructor() {
    makeAutoObservable(this);
    this.nodes = [];
    this.isEditing = false;
    this.isComplited = false;
  }

  public removeAt(index: number) {
    this.nodes.splice(index, 1);
  }
  public insertAt(index: number, point: MapDragNode) {
    this.nodes.splice(index, 0, point);
  }
  public push(point: MapDragNode) {
    this.nodes.push(point);
  }

  public toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  public getPositions() {
    return this.nodes.map(x => x.position);
  }

  public get countOfPoints() {
    return this.nodes.length;
  }
}

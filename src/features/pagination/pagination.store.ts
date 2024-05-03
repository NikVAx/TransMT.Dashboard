import { makeAutoObservable } from "mobx";

export class PaginationStore {
  pageSize: number;
  pageSizeOptions: number[];
  pageIndex: number;
  totalCount: number;

  constructor() {
    this.pageSize = 10;
    this.pageSizeOptions = [2, 5, 10, 20];
    this.pageIndex = 0;
    this.totalCount = 0;
    makeAutoObservable(this);
  }

  public get first() {
    return this.pageIndex * this.pageSize;
  }
}

import { makeAutoObservable } from "mobx";

export class PaginationStore {
  pageSize: number;
  pageSizeOptions: number[];
  pageIndex: number;
  totalCount: number;

  constructor() {
    this.pageSize = 20;
    this.pageSizeOptions = [10, 20, 40];
    this.pageIndex = 0;
    this.totalCount = 0;
    makeAutoObservable(this);
  }
}

import { RootStore } from "@/app/store";
import {
  IDeleteOptions,
  IManyDeleteRequestOptions,
  fail,
  success,
} from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";
import {
  IOperator,
  ICreateOperatorDto,
  IEditOperatorDto,
} from "./operator.types";
import {
  createOperatorRequest,
  deleteOperatorsRequest,
  editOperatorByIdRequest,
  getOperatorByIdRequest,
  getOperatorsRequest,
} from "./operator.services";
import { toArray } from "@/shared/utils";
import { PaginationStore } from "@/features/pagination";

export class OperatorStore {
  operators: IOperator[];
  isLoading: boolean;
  pagination: PaginationStore;

  constructor(public rootStore: RootStore) {
    this.isLoading = false;
    this.operators = [];
    this.pagination = new PaginationStore();

    makeAutoObservable(this);
  }

  public async deleteOperators(options: IDeleteOptions) {
    this.loading();
    const mappedOptions: IManyDeleteRequestOptions = {
      ...options,
      keys: toArray(options.keys),
    };

    const [status] = await deleteOperatorsRequest(mappedOptions);

    if (status) {
      this.getOperatorsPage();
    } else {
      this.fail();
    }
  }

  public async createOperator(options: ICreateOperatorDto) {
    this.loading();
    const [status, response] = await createOperatorRequest(options);

    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async getOperatorById(id: string) {
    this.loading();

    const [status, response] = await getOperatorByIdRequest(id);
    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async editOperatorById(id: string, options: IEditOperatorDto) {
    this.loading();
    const [status, response] = await editOperatorByIdRequest(id, options);

    if (status) {
      return this.success(response.data);
    } else {
      return this.fail();
    }
  }

  public async getOperatorsPage() {
    this.loading();
    const [status, response] = await getOperatorsRequest(this.pagination);

    return runInAction(() => {
      if (status) {
        this.operators = response.data.items;
        this.pagination.totalCount = response.data.totalCount;
        return this.success();
      } else {
        return this.fail();
      }
    });
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

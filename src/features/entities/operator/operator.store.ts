import { RootStore } from "@/app/store";
import {
  IManyDeleteOptions,
  IManyDeleteRequestOptions,
  fail,
  success,
} from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";
import { IOperator, ICreateOperatorDto } from "./operator.types";
import {
  createOperatorRequest,
  deleteOperatorsRequest,
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

  public async deleteOperators(options: IManyDeleteOptions) {
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
      return this.success(response.data)
    } else {
      return this.fail();
    }
  }

  public async getOperatorsPage() {
    this.loading();
    const [status, response] = await getOperatorsRequest(this.pagination);

    runInAction(() => {
      if (status) {
        this.operators = response.data.items;
        this.pagination.totalCount = response.data.totalCount;
        return this.success();
      } else {
        return this.fail();
      }
    });
  

    if (status) {
      this.operators = response.data.items;
      this.success();
    } else {
      this.fail();
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

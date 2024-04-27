export type AnyFunction = (...args: any[]) => any;

export type ISuccessResponse<T> = [true, T];
export type IInvalidResponse<E = unknown> = [false, E];

export type IResponse<T, E> = IInvalidResponse<E> | ISuccessResponse<T>;

export interface IStatus<T, E> {
  isSuccess: boolean;
  data?: T;
  error?: E;
}

export function success<T>(data?: T) {
  return {isSuccess: true, data: data, error: undefined} as IStatus<T, undefined>
}

export function fail<E>(error?: E) {
  return { isSuccess: false, date: undefined, error: error } as IStatus<undefined, E>
}
import { AnyArgsFunction, IInvalidResponse, IResponse } from ".";

export function createGuardRequest<
  S = any,
  E = unknown,
  F extends AnyArgsFunction<S> = AnyArgsFunction<S>
>(request: F) {
  return async (...args: Parameters<F>): Promise<IResponse<Awaited<S>, E>> => {
    try {
      const response = await request(...args);
      return [true, response];
    } catch (error) {
      return [false, error] as unknown as IInvalidResponse<E>;
    }
  };
}

import { AnyFunction, IInvalidResponse, IResponse } from ".";

export function createGuardRequest<F extends AnyFunction>(request: F) {
  return async <E>(
    ...args: Parameters<F>
  ): Promise<IResponse<Awaited<ReturnType<F>>, E>> => {
    try {
      const response = await request(...args);
      return [true, response];
    } catch (error) {
      return [false, error] as unknown as IInvalidResponse<E>;
    }
  };
}
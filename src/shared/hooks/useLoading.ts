import { Dispatch, SetStateAction, useState } from "react";

export function useLoading(
  initialState: boolean = true
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isLoading, setIsLoading] = useState(initialState);

  return [isLoading, setIsLoading];
}

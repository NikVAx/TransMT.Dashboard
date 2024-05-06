import { useEffect } from "react";

export const useComponentDidMount = (onDidMount: () => void) => {
  useEffect(() => {
    onDidMount();
  }, []);
};

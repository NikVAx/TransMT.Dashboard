import { StoreContext } from "./rootStore.context";
import { useContext } from "react";
import { RootStore } from "./rootStore.store";

export const useStore = <Selected = unknown>(
  selector: (store: RootStore) => Selected
) => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("Wrap in StoreProvider");
  }
  return selector(context);
};

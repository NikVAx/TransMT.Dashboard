import { LayoutProvider } from "@/layouts/layout/context/layout.provider";
import { PrimeReactProvider } from "primereact/api";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { StoreProvider, store } from "./store";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

const primeReactConfig = {
  ripple: true,
};

export function App() {
  return (
    <StoreProvider store={store}>
      <PrimeReactProvider value={primeReactConfig}>
        <LayoutProvider>
          <RouterProvider router={router} />
        </LayoutProvider>
      </PrimeReactProvider>
    </StoreProvider>
  );
}

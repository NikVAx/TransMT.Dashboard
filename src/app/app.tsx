import { LayoutProvider } from "@/layouts/layout/context/layout.provider";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

export function App() {
  return (
    <PrimeReactProvider>
      <LayoutProvider>
        <RouterProvider router={router} />
      </LayoutProvider>
    </PrimeReactProvider>
  );
}

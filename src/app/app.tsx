import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { LayoutProvider } from "@/layouts/layout/context/layout.provider";
import { PrimeReactProvider } from "primereact/api";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { StoreProvider, store } from "./store";
import { primeReactConfig, yupLocaleConfig } from "./configs";
import { setLocale } from "yup";
import { ConfirmPopup } from "primereact/confirmpopup";
import { SignalRTrackingContext } from "@/shared/api/websockets";
import { LogLevel } from "@microsoft/signalr";

export function App() {
  setLocale(yupLocaleConfig);

  return (
    <StoreProvider store={store}>
      <SignalRTrackingContext.Provider
        url={`${import.meta.env.VITE_HUBS_BASE_URL}/tracking`}
        logger={LogLevel.None}
      >
        <PrimeReactProvider value={primeReactConfig}>
          <ConfirmPopup />
          <LayoutProvider>
            <RouterProvider router={router} />
          </LayoutProvider>
        </PrimeReactProvider>
      </SignalRTrackingContext.Provider>
    </StoreProvider>
  );
}

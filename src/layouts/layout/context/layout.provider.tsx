import { PropsWithChildren, useEffect, useState } from "react";
import { LayoutContext } from "./layout.context";
import { useResizeListener } from "primereact/hooks";
import { DisplayMode } from "./layout.types";

export const LayoutProvider = ({ children }: PropsWithChildren<any>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);



  const getDisplayMode = (width: number) => {
    if (width > 991) {
      return "large";
    } else {
      return "small";
    }
  };

  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    getDisplayMode(window.innerWidth)
  );

  const updateDisplayModeOnChange = (width: number) => {
    const mode = getDisplayMode(width);

    if (displayMode !== mode) {
      setDisplayMode(mode);

      if (mode == "small") {
        setIsSidebarOpen(false);
      }
    }
  };

  const [bindWindowResizeListener, unbindWindowResizeListener] =
    useResizeListener({
      listener: (event: any) => {
        updateDisplayModeOnChange(event.currentTarget.innerWidth);
      },
    });

  useEffect(() => {
    bindWindowResizeListener();

    return () => {
      unbindWindowResizeListener();
    };
  }, [bindWindowResizeListener, unbindWindowResizeListener]);

  const config = {
    sidebarOpenWidth: "18rem",
    sidebarClosedWidth: "0rem",
  };

  return (
    <LayoutContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen, displayMode, config }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const createDivIcon = (
  size: number = 16,
  cirle: boolean = false,
  opacity: number,
  color: string = "white"
) => {
  return divIcon({
    html: renderToStaticMarkup(
      <div
        style={{
          height: `${size}px`,
          width: `${size}px`,
          opacity: opacity,
          borderRadius: cirle ? `${size}px` : 0,
          background: color,
        }}
      />
    ),
    iconAnchor: [size / 2, size / 2],
  });
};

export const editCircle = createDivIcon(16, true, 0.8, "white");
export const editSquare = createDivIcon(16, false, 1, "white");
export const editSquareMain = createDivIcon(16, false, 1, "black");

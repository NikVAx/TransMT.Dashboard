import { InputText } from "primereact/inputtext";
import { ICreateRouteDialogContentProps } from "./createRouteDialog.types";
import { useState } from "react";
import { MapBox } from "@/components";
import { TileLayer } from "react-leaflet";
import { PolylineEditor } from "../polylineEditor";
import { Button } from "primereact/button";
import { ICreateRouteOptions } from "@/features";

export const CreateRouteDialogContent = (
  props: ICreateRouteDialogContentProps
) => {
  const [options, setOptions] = useState<ICreateRouteOptions>({
    name: "",
    positions: [],
  });

  return (
    <div className="flex flex-column gap-2">
      <div>Название</div>
      <InputText
        value={options.name}
        onChange={(e) =>
          setOptions((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <div style={{ width: "800px", height: "600px" }}>
        <MapBox center={[59.938784, 30.314997]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PolylineEditor
            onChange={(args) => {
              setOptions((prev) => ({ ...prev, positions: args.latlngs }));
            }}
          />
        </MapBox>
      </div>
      <div>
        <Button
          label="Сохранить"
          onClick={() => {
            if (props.onClick) {
              props.onClick(options);
            }
          }}
        />
      </div>
    </div>
  );
};

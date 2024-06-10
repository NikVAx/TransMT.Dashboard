import { MapBox } from "@/components";
import { Route, RouteModel, RouteModelStore } from "@/features/maps";
import { StoreProps } from "@/shared/types";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useInterval } from "primereact/hooks";
import { Slider } from "primereact/slider";
import { useEffect, useState } from "react";
import {
  CircleMarker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { CreateRouteDialogContent, RouteSimulationCard } from "./components";
import { getPointOnRoute } from "./utils";
import { InputNumber } from "primereact/inputnumber";

export interface IPropsWithRoute {
  route: Route;
}

export const VehicleTrack = observer(({ store }: StoreProps<RouteModel>) => {
  return store.isHide ? null : (
    <>
      <CircleMarker
        center={store.waypoint.latlng()}
        radius={8}
        color="black"
        fillColor="cyan"
        opacity={1}
        fillOpacity={1}
      />
    </>
  );
});

const routeModelsStore = new RouteModelStore();

export const Actions = observer(({ store }: StoreProps<RouteModel>) => {
  return (
    <div className="flex gap-2">
      <Button
        label={store.isExecuting ? "Пауза" : "Запуск"}
        onClick={() => {
          store.toggleExecuting();
        }}
      />
      <Button
        label={store.isHide ? "Показать" : "Скрыть"}
        onClick={() => {
          store.isHide = !store.isHide;
        }}
      />
      <Button
        label="Удалить"
        onClick={() => {
          routeModelsStore.remove(store.route.id);
        }}
      />
    </div>
  );
});

export const ProgressSlider = observer(({ store }: StoreProps<RouteModel>) => {
  return (
    <div>
      <Slider
        value={store.time}
        max={store.maxTime}
        onChange={(e) => {
          store.setTime(e.value as number);
          const p = getPointOnRoute(store, e.value as number);
          store.setWaypoint(p);
        }}
      />
    </div>
  );
});

export const ModelingPage = observer(() => {
  const [visible, setVisible] = useState(false);
  const [interval, setInterval] = useState(1000);

  useInterval(
    () => {
      routeModelsStore.routes.forEach((routeModel) => {
        if (routeModel.isExecuting) {
          routeModel.addInterval(interval);

          const computedWaypoint = getPointOnRoute(
            routeModel,
            routeModel.time + interval
          );
          routeModel.setWaypoint(computedWaypoint);
          if (routeModel.time + interval >= routeModel.maxTime) {
            routeModel.isExecuting = false;
          }
        }
      });
    },
    interval,
    true
  );

  useEffect(() => {
    routeModelsStore.load();
  }, []);

  return (
    <div className="flex flex-column gap-2 p-3 h-full">
      <div className="flex gap-2" style={{ height: "50px", width: "100%" }}>
        <Button label="Создать маршрут" onClick={() => setVisible(true)} />
        <Button
          label="Сохранить"
          onClick={() => {
            routeModelsStore.save();
          }}
        />
        <Button
          label="Загрузить"
          onClick={() => {
            routeModelsStore.load();
          }}
        />

        <div
          className="flex flex-column gap-2"
          style={{ width: "400px", justifyContent: "center" }}
        >
          <InputNumber
            value={interval}
            onChange={(e) => {
              setInterval(e.value as number);
            }}
            min={1}
            max={10000}
            step={1}
            prefix="Частота обновления 1 раз в "
            suffix=" мс"
            showButtons
          />
        </div>
      </div>

      <div
        className="flex"
        style={{ height: "calc(100% - 50px)", width: "100%" }}
      >
        <div
          className="flex flex-column gap-3"
          style={{
            width: "800px",
            overflow: "auto",
          }}
        >
          {routeModelsStore.routes.map((route) => {
            return <RouteSimulationCard store={route} />;
          })}
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <MapBox center={[59.938784, 30.314997]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {routeModelsStore.routes.map((routeModel) => {
              return (
                <>
                  <Polyline
                    positions={[...routeModel.route.waypoints]}
                    key={routeModel.route.id}
                    pathOptions={{ weight: 14 }}
                  />
                  {routeModel.route.waypoints.map((wp, i) => (
                    <CircleMarker
                      color="red"
                      fillOpacity={1}
                      radius={5}
                      center={wp.latlng()}
                    >
                      <Popup>{i}</Popup>
                    </CircleMarker>
                  ))}
                </>
              );
            })}

            {routeModelsStore.routes.map((routeModel) => {
              return <VehicleTrack store={routeModel} />;
            })}
          </MapBox>
        </div>
      </div>
      <Dialog
        header="Новый маршрут"
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
        draggable={false}
      >
        <CreateRouteDialogContent
          onClick={(options) => {
            routeModelsStore.create(options);
            setVisible(false);
          }}
        />
      </Dialog>
    </div>
  );
});

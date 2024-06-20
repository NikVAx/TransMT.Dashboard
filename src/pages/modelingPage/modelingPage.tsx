import { MapBox } from "@/components";
import { ICreateRouteOptions, Route, RouteModel, RouteModelStore } from "@/features/maps";
import { IStoreProps } from "@/shared/types";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useInterval } from "primereact/hooks";
import { Slider } from "primereact/slider";
import { useEffect, useState } from "react";
import { CircleMarker, FeatureGroup, Polyline, TileLayer } from "react-leaflet";
import { CreateRouteDialogContent, RouteSimulationCard } from "./components";
import { getPointOnRoute } from "./utils";
import { InputNumber } from "primereact/inputnumber";
import { appApiInstance } from "@/shared/api";

export interface IPropsWithRoute {
  route: Route;
}

export const VehicleTrack = observer(({ store }: IStoreProps<RouteModel>) => {
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

export const routeModelsStore = new RouteModelStore();

export const ProgressSlider = observer(({ store }: IStoreProps<RouteModel>) => {
  return (
    <div>
      <Slider
        className="mt-3 mb-3"
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
  const [initialState, setInitialState] = useState<ICreateRouteOptions | null>(null);
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

          appApiInstance.post("/tracking", {
            deviceId: routeModel.route.device.id,
            status: routeModel.status,
            lat: routeModel.waypoint.lat,
            lng: routeModel.waypoint.lng,
            timestamp: new Date().toISOString()
          })

        } else {
          routeModel.setStatus("Нет");
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
        className="flex gap-3"
        style={{ height: "calc(100% - 50px)", width: "100%" }}
      >
        <div
          className="flex flex-column gap-3"
          style={{
            width: "550px",
            overflow: "auto",
          }}
        >
          {routeModelsStore.routes.map((routeModel) => {
            return <RouteSimulationCard key={routeModel.route.id} store={routeModel} onEdit={() => {
              setInitialState({
                delays: routeModel.route.delays,
                speeds: routeModel.route.speeds,
                name: routeModel.route.name,
                positions: routeModel.route.points,
                device: routeModel.route.device,
                type: "edit"
              } as ICreateRouteOptions);
              setVisible(true);
            }}/>;
          })}
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <MapBox center={[59.938784, 30.314997]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {routeModelsStore.routes.map((routeModel) => {
              return routeModel.isHide ? null : (
                <FeatureGroup key={routeModel.route.id}>
                  <Polyline
                    positions={[...routeModel.route.points]}
                    key={"rcm"+routeModel.route.id}
                    pathOptions={{ weight: 14 }}
                  />
                  {routeModel.route.points.map((wp, i) => (
                    <CircleMarker
                      color="red"
                      fillOpacity={1}
                      radius={5}
                      center={wp.latlng()}
                      key={`${routeModel.route.id}-${i}`}
                    />
                  ))}
                </FeatureGroup>
              );
            })}

            {routeModelsStore.routes.map((routeModel) => {
              return <VehicleTrack key={"vt"+routeModel.route.id} store={routeModel} />;
            })}
          </MapBox>
        </div>
      </div>
      <Dialog
        header="Новый маршрут"
        visible={visible}
        onHide={() => {
          setVisible(false);
          setInitialState(null);
        }}
        draggable={false}
      >
        <CreateRouteDialogContent
          initialState={initialState}
          onClick={(options) => {
            routeModelsStore.create(options);

            if (options.type === "create") {
               
            }
            
            setVisible(false);
            setInitialState(null);
          }}
        />
      </Dialog>
    </div>
  );
});

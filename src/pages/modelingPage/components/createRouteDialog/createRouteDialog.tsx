import { InputText } from "primereact/inputtext";
import { ICreateRouteDialogContentProps } from "./createRouteDialog.types";
import { useEffect, useState } from "react";
import { MapBox } from "@/components";
import { CircleMarker, Polygon, Popup, TileLayer } from "react-leaflet";
import { PolylineEditor } from "../polylineEditor";
import { Button } from "primereact/button";
import { ICreateRouteOptions, IGpsDevice } from "@/features";
import { DataTable } from "primereact/datatable";
import { Column, ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useStore } from "@/app/store";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";

const OPERATING_STATUS = {
  DELIVERING: "Транспортировка",
  WAITING: "Ожидание",
  MOVING: "Движение",
  LOADING: "Погрузка",
  UNLOADING: "Разгрузка",
};

const ACTIVE_STATUSES = [OPERATING_STATUS.DELIVERING, OPERATING_STATUS.MOVING];
const PASSIVE_STATUSES = [
  OPERATING_STATUS.WAITING,
  OPERATING_STATUS.LOADING,
  OPERATING_STATUS.UNLOADING,
];

export const CreateRouteDialogContent = (
  props: ICreateRouteDialogContentProps
) => {
  const [options, setOptions] = useState<ICreateRouteOptions>(
    props.initialState ?? {
    name: "",
    positions: [],
    speeds: [],
    delays: [],
    device: null,
    type: "create"
  });

  const { deviceStore, buildingStore, geoZoneStore } = useStore((store) => ({
    deviceStore: store.deviceStore,
    buildingStore: store.buildingStore,
    geoZoneStore: store.geoZoneStore,
  }));

  useEffect(() => {
    const prevPageSize = deviceStore.pagination.pageSize;
    deviceStore.pagination.pageSize = 10000;
    buildingStore.pagination.pageSize = 10000;
    geoZoneStore.pagination.pageSize = 10000;
    buildingStore.getBuildingsPage();
    geoZoneStore.getGeoZonesPage();
    deviceStore.getGpsDevicesPage();
    return () => {
      deviceStore.pagination.pageSize = prevPageSize;
    };
  }, []);

  const editor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        value={options.value}
        min={0}
        step={1}
        showButtons
        onChange={(e) => {
          if (options.editorCallback) {
            options.editorCallback(e.value);
          }
        }}
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  };

  const activeStatusEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={ACTIVE_STATUSES}
        onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
        placeholder="Выберите статус"
      />
    );
  };

  const passiveStatusEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={PASSIVE_STATUSES}
        onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
        placeholder="Выберите статус"
      />
    );
  };

  const onDelayCellEditComplete = (e: ColumnEvent) => {
    let { rowData, newValue, field, originalEvent: event, rowIndex } = e;

    switch (field) {
      case "duration":
        rowData[field] = newValue;
        setOptions((prev) => {
          prev.delays[rowIndex][field] = newValue;
          return prev;
        });
        break;

      case "status":
        rowData[field] = newValue;
        setOptions((prev) => {
          prev.delays[rowIndex][field] = newValue;
          return prev;
        });
        break;

      default:
        event.preventDefault();
        break;
    }
  };

  const onSpeedCellEditComplete = (e: ColumnEvent) => {
    let { rowData, newValue, field, originalEvent: event, rowIndex } = e;

    switch (field) {
      case "speed":
        rowData[field] = newValue;
        setOptions((prev) => {
          prev.speeds[rowIndex].speed = newValue;
          return prev;
        });
        break;

      case "status":
        rowData[field] = newValue;
        setOptions((prev) => {
          prev.speeds[rowIndex].status = newValue;
          return prev;
        });
        break;

      default:
        event.preventDefault();
        break;
    }
  };

  const itemTemplate = (device: IGpsDevice) => {    
    return (
      <div>
        <div>{device.id}</div>
      </div>
    );
  };

  const [deviceSuggestions, setDeviceSuggestions] = useState<IGpsDevice[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    const filtered = deviceStore.devices.filter(
      (x) =>
        x.id.toUpperCase().includes(event.query.toUpperCase()) ||
        x.vehicleId.toUpperCase().includes(event.query.toUpperCase())
    );

    setDeviceSuggestions(filtered);
  };

  return (
    <div className="flex flex-column gap-2">
      <div>Название</div>
      <InputText
        value={options.name}
        onChange={(e) =>
          setOptions((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <div>GPS/ГЛОНАСС Устройство</div>
      <AutoComplete
        dropdown
        field="id"
        suggestions={deviceSuggestions}
        completeMethod={search}
        itemTemplate={itemTemplate}
        forceSelection
        value={options.device}
        onChange={(e) => {
          setOptions((prev) => ({ ...prev, device: e.target.value }))
        }}
      />
      <div style={{ width: "800px", height: "600px" }}>
        <MapBox center={[59.938784, 30.314997]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PolylineEditor
            onChange={(args) => {
              setOptions((prev) => ({
                ...prev,
                positions: args.latlngs,
                delays:
                  args.latlngs.length === prev.delays.length
                    ? prev.delays
                    : [
                        ...prev.delays,
                        {
                          duration: 0,
                          status: OPERATING_STATUS.WAITING,
                        },
                      ],
                speeds:
                  args.latlngs.length < 2 ||
                  args.latlngs.length - 1 === prev.speeds.length
                    ? prev.speeds
                    : [
                        ...prev.speeds,
                        {
                          speed: 10,
                          status: OPERATING_STATUS.MOVING,
                        },
                      ],
              }));
            }}
          />
          {buildingStore.buildings.map((building) => (
            <CircleMarker
              key={building.id}
              center={building.location}
              radius={8}
              fillOpacity={0.5}
              color="#000000"
              fillColor="#000000"
            >
              <Popup>{building.name}</Popup>
            </CircleMarker>
          ))}

          {geoZoneStore.geoZones.map((geoZone) => (
            <Polygon key={geoZone.id} positions={geoZone.points}></Polygon>
          ))}
        </MapBox>
      </div>
      <div className="flex gap-1 p-1">
        <div style={{ width: "400px" }}>
          <DataTable
            showGridlines
            editMode="cell"
            value={[
              ...options.delays.map((delayInfo, i) => ({
                index: i + 1,
                duration: delayInfo.duration,
                status: delayInfo.status,
              })),
            ]}
            scrollHeight="flex"
          >
            <Column header="№" field="index" />
            <Column
              header="Время ожидания"
              field="duration"
              editor={editor}
              onCellEditComplete={onDelayCellEditComplete}
            />
            <Column
              header="Статус"
              field="status"
              editor={passiveStatusEditor}
              onCellEditComplete={onDelayCellEditComplete}
            />
          </DataTable>
        </div>

        <div style={{ width: "400px" }}>
          <DataTable
            editMode="cell"
            showGridlines
            value={[
              ...options.speeds.map((driveInfo, i) => ({
                index: `${i + 1}-${i + 2}`,
                speed: driveInfo.speed,
                status: driveInfo.status,
              })),
            ]}
            scrollHeight="flex"
          >
            <Column header="№" field="index" />
            <Column
              header="Скорость"
              field="speed"
              editor={editor}
              onCellEditComplete={onSpeedCellEditComplete}
            />
            <Column
              header="Статус"
              field="status"
              editor={activeStatusEditor}
              onCellEditComplete={onSpeedCellEditComplete}
            />
          </DataTable>
        </div>
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

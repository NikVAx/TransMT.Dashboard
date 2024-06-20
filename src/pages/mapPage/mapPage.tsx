import { useStore } from "@/app/store";
import { observer } from "mobx-react-lite";
import { TreeNode } from "primereact/treenode";
import { useEffect, useMemo, useState } from "react";
import { CircleMarker, Popup, TileLayer } from "react-leaflet";
import { defaultNodes } from "./mapPage.constants";
import {
  Tree,
  TreeCheckboxSelectionKeys,
  TreeExpandedKeysType,
  TreeNodeTemplateOptions,
} from "primereact/tree";
import {
  MapBox,
  MapBuildingMarker,
  MapGeoZone,
  MapTabControl,
} from "@/components";
import {
  BuildingSideNode,
  GeoZoneSideNode,
  VehicleSideNode,
} from "./components";
import { getChildrenNodes } from "./mapPage.utils";
import { SignalRTrackingContext } from "@/shared/api/websockets";
import { toLatLng } from "@/features";
import { IVehicleProps } from "@/shared/types";

export const VehicleShortCard = observer(({ vehicle }: IVehicleProps) => {
  return (
    <div className="flex flex-column gap-2">
      <span>Номер ТС: {vehicle.number}</span>
      <span>Cтатус: {vehicle.operatingStatus}</span>
    </div>
  );
});

export const VehicleMarker = observer(({ vehicle }: IVehicleProps) => {
  return vehicle.latlng ? (
    <CircleMarker
      radius={8}
      color="black"
      fillColor="cyan"
      opacity={1}
      fillOpacity={1}
      center={toLatLng(vehicle.latlng)}
      key={`${vehicle.id}`}
    >
      <Popup>
        <VehicleShortCard vehicle={vehicle} />
      </Popup>
    </CircleMarker>
  ) : null;
});

export const MapPage = observer(() => {
  const { buildingStore, geoZoneStore, vehicleStore } = useStore((store) => ({
    buildingStore: store.buildingStore,
    geoZoneStore: store.geoZoneStore,
    vehicleStore: store.vehicleStore,
  }));

  const [nodes, setNodes] = useState<TreeNode[]>(defaultNodes);

  const [selectedKeys, setSelectedKeys] =
    useState<TreeCheckboxSelectionKeys | null>(null);

  const [expandedKeys, setExpandedKeys] = useState<TreeExpandedKeysType>({
    root: true,
  });

  const nodeTemplate = (node: TreeNode, _: TreeNodeTemplateOptions) => {
    switch (node.data.entity) {
      case "building":
        return <BuildingSideNode building={node.data} />;
      case "geozone":
        return <GeoZoneSideNode geoZone={node.data} />;
      case "vehicle":
        return <VehicleSideNode vehicle={node.data} />;
      default:
        return <div>{node.label}</div>;
    }
  };

  const setLoadedData = async () => {
    buildingStore.pagination.pageSize = 20000;
    geoZoneStore.pagination.pageSize = 20000;
    vehicleStore.pagination.pageSize = 20000;
    await buildingStore.getBuildingsPage();
    await geoZoneStore.getGeoZonesPage();
    await vehicleStore.getVehiclesPage();

    setNodes((node) => {
      if (node[0].children !== undefined) {
        node[0].children[0].children = getChildrenNodes(
          buildingStore.buildings,
          "building"
        );
        node[0].children[1].children = getChildrenNodes(
          geoZoneStore.geoZones,
          "geozone"
        );
        node[0].children[2].children = getChildrenNodes(
          vehicleStore.vehicles,
          "vehicle"
        );
      }

      return node;
    });
  };

  useEffect(() => {
    setLoadedData();
  }, []);

  SignalRTrackingContext.useSignalREffect(
    "LocationUpdate",
    (data) => {
      vehicleStore.update(data);
      console.log("websockets", data);
    },
    []
  );

  const geoZones = useMemo(() => {
    return [
      geoZoneStore.geoZones
        .filter((geoZone) => {
          return (
            selectedKeys &&
            Object.keys(selectedKeys).some(
              (key) => key === `geozone.${geoZone.id}`
            )
          );
        })
        .map((geoZone) => <MapGeoZone geoZone={geoZone} key={geoZone.id} />),
    ];
  }, [geoZoneStore, geoZoneStore.geoZones, selectedKeys]);

  const buildings = useMemo(() => {
    return [
      buildingStore.buildings
        .filter((x) => {
          return (
            selectedKeys &&
            Object.keys(selectedKeys).some((key) => key === `building.${x.id}`)
          );
        })
        .map((building) => (
          <MapBuildingMarker building={building} key={building.id} />
        )),
    ];
  }, [buildingStore, buildingStore.buildings, selectedKeys]);

  return (
    <MapBox center={[59.938784, 30.314997]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapTabControl>
        <Tree
          filter
          filterMode="lenient"
          filterPlaceholder="Поиск объекта"
          style={{ margin: "10px", border: "none", height: "100%" }}
          value={nodes}
          expandedKeys={expandedKeys}
          onToggle={(e) => {
            setExpandedKeys(e.value);
          }}
          selectionKeys={selectedKeys}
          onSelectionChange={(e) => {
            setSelectedKeys(e.value as TreeCheckboxSelectionKeys);
          }}
          selectionMode="checkbox"
          pt={{
            root: {
              style: {
                padding: "0",
              },
            },
            content: {
              style: {
                padding: "0.05rem",
              },
            },
          }}
          nodeTemplate={nodeTemplate}
        />
      </MapTabControl>
      {buildings}
      {geoZones}
      {vehicleStore.vehicles.map((vehicle, i) => {
        return <VehicleMarker vehicle={vehicle} key={i} />;
      })}
    </MapBox>
  );
});

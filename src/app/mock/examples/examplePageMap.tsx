import { useStore } from "@/app/store";
import { MapBox, MapTabControl } from "@/components";
import { IGeoZone, toLatLng } from "@/features";
import { observer } from "mobx-react-lite";
import { TreeNode } from "primereact/treenode";
import { useEffect, useState } from "react";
import { Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import {
  Tree,
  TreeCheckboxSelectionKeys,
  TreeNodeTemplateOptions,
} from "primereact/tree";
import { latLng } from "leaflet";
import { Button } from "primereact/button";
import { MapConsumer } from "@/shared/utils/leaflet";

export const ExamplePageMap = observer(() => {
  const { buildingStore, geoZoneStore } = useStore((store) => ({
    buildingStore: store.buildingStore,
    geoZoneStore: store.geoZoneStore,
  }));

  const [nodes, setNodes] = useState<TreeNode[]>([
    {
      key: "buildings",
      label: "Здания",
      icon: "pi pi-fw pi-building",
      children: [],
      data: { entity: "group" },
    },
    {
      key: "geozones",
      label: "Геозоны",
      icon: "pi pi-fw pi-building",
      children: [],
      data: { entity: "group" },
    },
    {
      key: "vehicles",
      label: "Транспортные средства",
      icon: "pi pi-fw pi-truck",
      children: [],
      data: { entity: "group" },
    },
  ]);

  const [selectedKeys, setSelectedKeys] =
    useState<TreeCheckboxSelectionKeys | null>(null);

  const nodeTemplate = (node: TreeNode, _options: TreeNodeTemplateOptions) => {
    switch (node.data.entity) {
      case "group":
        return <div>{node.label}</div>;

      case "building":
        return (
          <div className="flex gap-1">
            <div>{node.label}</div>
            <MapConsumer>
              {(map) => (
                <Button
                  style={{ flex: "0 0 2rem", height: "2rem" }}
                  className="ml-auto"
                  icon="pi pi-fw pi-map-marker"
                  outlined
                  text
                  onClick={() => {
                    map.flyTo(toLatLng(node.data.location), 16);
                    //map.setZoom(16);
                  }}
                />
              )}
            </MapConsumer>
          </div>
        );

      case "geozone":
        const geozone = node.data as IGeoZone;
        const [point] = geozone.points;
        return (
          <div className="flex w-full align-items-center">
            <span>{node.label}</span>
            <MapConsumer>
              {(map) => (
                <Button
                  style={{ flex: "0 0 2rem", height: "2rem" }}
                  className="ml-auto"
                  icon="pi pi-fw pi-map-marker"
                  outlined
                  text
                  onClick={() => {
                    map.flyTo([point.lat, point.lng], 15);
                  }}
                />
              )}
            </MapConsumer>
          </div>
        );

      default:
        return <div>{node.label}</div>;
    }
  };

  const setLoadedData = async () => {
    buildingStore.pagination.pageSize = 20000;
    geoZoneStore.pagination.pageSize = 20000;
    await buildingStore.getBuildingsPage();
    await geoZoneStore.getGeoZonesPage();

    setNodes((prev) => {
      const newData = prev;
      newData[0].children = buildingStore.buildings.map((value) => {
        return {
          key: `${value.id}`,
          label: `${value.name}`,
          data: {
            entity: "building",
            ...value,
          },
        };
      });

      newData[1].children = geoZoneStore.geoZones.map((value) => {
        return {
          key: `${value.id}`,
          label: `${value.name}`,
          data: {
            entity: "geozone",
            ...value,
          },
        };
      });

      return newData;
    });
  };

  useEffect(() => {
    setLoadedData();
  }, []);

  return (
    <MapBox center={[59.938784, 30.314997]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapTabControl>
        <Tree
          style={{ margin: "10px", border: "none", height: "100%" }}
          value={nodes}
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
                padding: "0.25rem",
              },
            },
          }}
          nodeTemplate={nodeTemplate}
        />
      </MapTabControl>

      {[
        buildingStore.buildings
          .filter((x) => {
            if (selectedKeys === null || selectedKeys === undefined)
              return false;

            return Object.keys(selectedKeys).some((key) => key === x.id);
          })
          .map((building) => (
            <Marker position={toLatLng(building.location)} key={building.id}>
              <Popup>
                <div>
                  <div>Название: {building.name}</div>
                  <div>Тип: {building.type}</div>
                  <div>Адрес: {building.address}</div>
                  <div>ID: {building.id}</div>
                </div>
              </Popup>
            </Marker>
          )),
      ]}

      {[
        geoZoneStore.geoZones
          .filter((x) => {
            if (selectedKeys === null || selectedKeys === undefined)
              return false;

            return Object.keys(selectedKeys).some((key) => key === x.id);
          })
          .map((zone) => (
            <Polygon
              positions={zone.points.map((coords) =>
                latLng(coords.lat, coords.lng)
              )}
              key={zone.id}
              pathOptions={{ color: zone.color }}
            >
              <Popup>
                <div>
                  <div>Название: {zone.name}</div>
                  <div>Тип: {zone.type}</div>
                  <div>ID: {zone.id}</div>
                </div>
              </Popup>
            </Polygon>
          )),
      ]}
    </MapBox>
  );
});

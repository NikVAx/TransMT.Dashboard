import { useStore } from "@/app/store";
import { observer } from "mobx-react-lite";
import { TreeNode } from "primereact/treenode";
import { useEffect, useMemo, useState } from "react";
import { TileLayer } from "react-leaflet";
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
import { BuildingSideNode, GeoZoneSideNode } from "./components";
import { getChildrenNodes } from "./mapPage.utils";

export const MapPage = observer(() => {
  const { buildingStore, geoZoneStore } = useStore((store) => ({
    buildingStore: store.buildingStore,
    geoZoneStore: store.geoZoneStore,
  }));

  const [nodes, setNodes] = useState<TreeNode[]>(defaultNodes);

  const [selectedKeys, setSelectedKeys] =
    useState<TreeCheckboxSelectionKeys | null>(null);

  const [expandedKeys, setExpandedKeys] = useState<TreeExpandedKeysType>({
    root: true,
  });

  const nodeTemplate = (node: TreeNode, _options: TreeNodeTemplateOptions) => {
    switch (node.data.entity) {
      case "building":
        return <BuildingSideNode building={node.data} />;
      case "geozone":
        return <GeoZoneSideNode geoZone={node.data} />;
      default:
        return <div>{node.label}</div>;
    }
  };

  const setLoadedData = async () => {
    buildingStore.pagination.pageSize = 20000;
    geoZoneStore.pagination.pageSize = 20000;
    await buildingStore.getBuildingsPage();
    await geoZoneStore.getGeoZonesPage();

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
      }

      return node;
    });
  };

  useEffect(() => {
    setLoadedData();
  }, []);

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
    </MapBox>
  );
});

import { PageWrapper } from "@/components";
import { appApiInstance } from "@/shared/api";
import { useLoading } from "@/shared/hooks";
import { IDuration, IStatusDuration } from "@/shared/types";
import { Column } from "primereact/column";
import { TreeNode } from "primereact/treenode";
import { TreeTable } from "primereact/treetable";
import { useEffect, useState } from "react";
import { toTimeString } from "../reportByVehiclePage";

export interface IReportVehicle extends IDuration {
  id: string;
  number: string;
  type: string;
  statuses: IStatusDuration[];
}

export interface IReportGeoZone extends IDuration {
  id: string;
  name: string;
  type: string;
  vehicles: IReportVehicle[];
  statuses: IStatusDuration[];
}

export interface IReportByGeoZoneDto extends IDuration {
  statuses: string[];
  geoZones: IReportGeoZone[];
}

export function mapStatusDurationObject(items: IStatusDuration[]) {
  return {
    ...Object.fromEntries(
      new Map<string, any>(
        items.map((obj) => [obj.status, obj.duration])
      ).entries()
    ),
  };
}

export const ReportByGeoZonePage = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  const [statuses, setStatuses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useLoading();

  async function loadPage() {
    const response = await appApiInstance.get<IReportByGeoZoneDto>(
      "/reports/by-geozones"
    );

    if (response.status) {
      const data = response.data;

      console.log(data);
      setStatuses(data.statuses);

      setNodes(
        data.geoZones.map(
          (geoZone) =>
            ({
              key: geoZone.id,
              data: {
                id: geoZone.id,
                name: geoZone.name,
                type: geoZone.type,
                duration: geoZone.duration,
                ...mapStatusDurationObject(geoZone.statuses),
              },
              children: geoZone.vehicles.map((vehicle) => {
                return {
                  key: vehicle.id,
                  data: {
                    id: vehicle.id,
                    name: vehicle.number,
                    type: vehicle.type,
                    duration: vehicle.duration,
                    ...mapStatusDurationObject(vehicle.statuses),
                  },
                };
              }),
              style: {
                fontWeight: "bold",
                fontStyle: "italic",
              },
            } as TreeNode)
        )
      );
    }
  }

  const beginLoadPage = async () => {
    setIsLoading(true);
    await loadPage();
    setIsLoading(false);
  };

  useEffect(() => {
    beginLoadPage();
  }, []);

  return (
    <PageWrapper>
      <div>
        <TreeTable
          showGridlines
          value={nodes}
          tableStyle={{ minWidth: "50rem" }}
          reorderableColumns
          loading={isLoading}
        >
          {/* <Column field="id" header="ID" expander /> */}
          <Column field="name" header="Наименование" expander sortable />
          <Column field="type" header="Тип" sortable />
          <Column
            field="duration"
            header="Время в зоне"
            style={{ width: "200px" }}
            sortable
            body={(node) => {
              return toTimeString(node.data.duration);
            }}
          />

          {statuses.map((status) => (
            <Column
              style={{ width: "220px" }}
              key={status}
              field={status}
              header={status}
              body={(item, _options) => {
                const statusDuration = (item.data[status] ?? 0) as number;
                  return (
                    ((statusDuration * 100) / item.data.duration).toFixed(2) +
                    "%"
                  );
              }}
              sortable
            />
          ))}
        </TreeTable>
      </div>
    </PageWrapper>
  );
};

/*
{
    "key": "ed1c954f-0b56-43e0-892e-72c87b89fe02",
    "data": {
        "id": "ed1c954f-0b56-43e0-892e-72c87b89fe02",
        "name": "Территория дамба Гребёнка",
        "type": "Зона хранения",
        "duration": 5899.154,
        "vehicles": [
            {
                "id": "f9581ea1-8c16-4426-91e0-3c0067b9b25c",
                "type": "Грузовой автомобиль",
                "number": "B123AC",
                "deviceId": "45876549",
                "duration": 1044.024,
                "statuses": [
                    {
                        "status": "Движение",
                        "duration": 1044.024
                    }
                ]
            },
            {
                "id": "150a687a-40fd-4c71-98f2-4a33ae8226cc",
                "type": "Контейнеровоз",
                "number": "A221KM",
                "deviceId": "81237264",
                "duration": 4855.13,
                "statuses": [
                    {
                        "status": "Движение",
                        "duration": 37.192
                    },
                    {
                        "status": "Разгрузка",
                        "duration": 2103.902
                    },
                    {
                        "status": "Транспортировка",
                        "duration": 2714.036
                    }
                ]
            }
        ]
    },
    "children": [
        {
            "key": "f9581ea1-8c16-4426-91e0-3c0067b9b25c",
            "data": {
                "Движение": 1044.024,
                "id": "f9581ea1-8c16-4426-91e0-3c0067b9b25c",
                "name": "B123AC",
                "type": "Грузовой автомобиль",
                "duration": 1044.024
            }
        },
        {
            "key": "150a687a-40fd-4c71-98f2-4a33ae8226cc",
            "data": {
                "Движение": 37.192,
                "Разгрузка": 2103.902,
                "Транспортировка": 2714.036,
                "id": "150a687a-40fd-4c71-98f2-4a33ae8226cc",
                "name": "A221KM",
                "type": "Контейнеровоз",
                "duration": 4855.13
            }
        }
    ],
    "style": {
        "fontWeight": "bold",
        "fontStyle": "italic"
    }
}


*/

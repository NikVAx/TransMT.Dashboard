import { PageWrapper } from "@/components";
import { appApiInstance } from "@/shared/api";
import { useLoading } from "@/shared/hooks";
import { IDuration, IStatusDuration } from "@/shared/types";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

export function toTimeString(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const m = String(minutes).padStart(2, "0");
  const h = String(hours).padStart(2, "0");
  const s = seconds.toFixed(0).padStart(2, "0");
  return h + ":" + m + ":" + s
}

export interface ReportByVehicleItemDto extends IDuration {
  deviceId: string;
  vehicleId: string;
  vehicleNumber: string;
  vehicleType: string;
  statuses: IStatusDuration[];
}

export const ReportByVehiclePage = () => {
  const [rows, setRows] = useState<any[]>();
  const [statuses, setStatuses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useLoading();

  async function loadPage() {
    const response = await appApiInstance.get<ReportByVehicleItemDto[]>(
      "/reports/by-vehicle"
    );

    if (response.status) {
      const data = response.data;

      const listOfMaps: Map<string, string | number>[] = [];
      const setOfStatuses = new Set<string>();

      data.forEach((item) => {
        item.statuses.forEach((group) => {
          setOfStatuses.add(group.status);
        });
      });

      data.forEach((item) => {
        const map = new Map<string, string | number>();

        setOfStatuses.forEach(status => map.set(status, 0));

        item.statuses.forEach((group) => {
          map.set(group.status, (group.duration / item.duration) * 100);
        });
        map.set("deviceId", item.deviceId);
        map.set("duration", item.duration);
        map.set("vehicleNumber", item.vehicleNumber);
        map.set("vehicleType", item.vehicleType);
        console.log(item);
        listOfMaps.push(map);
      });

      setStatuses(Array.from(setOfStatuses));

      const objects = listOfMaps.map((map) => {
        return Object.fromEntries(map.entries());
      });

      setRows(objects);
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
        <DataTable
          sortMode="multiple"
          stripedRows
          showGridlines
          value={rows}
          size="small"
          tableStyle={{ minWidth: "50rem" }}
          reorderableColumns
          loading={isLoading}
        >
          <Column field="deviceId" header="ID Устройства" />
          <Column field="vehicleNumber" header="Номер ТС" />
          <Column field="vehicleType" header="Тип ТС" />
          <Column field="duration" header="Время в пути" sortable body={(row) => {
            return toTimeString(row.duration)
          }} />
          {statuses.map((status) => (
            <Column
              key={status}
              field={status}
              header={status}
              body={(item) => {
                return (item[status] as number).toFixed(2) + "%";
              }}
              sortable
            />
          ))}
        </DataTable>
      </div>
    </PageWrapper>
  );
};

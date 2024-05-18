import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "@/app/store";
import { CrudDataTable, PageWrapper } from "@/components";
import { getPaginatorProps } from "@/shared/utils";
import { actionBodyTemplate } from "./components/actionBodyTemplate";
import { Header } from "./components/header";

export const GpsDeviceListPage = observer(() => {
  const { deviceStore } = useStore((store) => ({ deviceStore: store.deviceStore }));

  useEffect(() => {
    deviceStore.getGpsDevicesPage();
  }, []);

  return (
    <PageWrapper>
      <CrudDataTable
        {...getPaginatorProps(deviceStore.pagination)}
        onPage={(event) => {
          deviceStore.pagination.pageSize = event.rows;
          deviceStore.pagination.pageIndex = event.page ?? 0;
          deviceStore.getGpsDevicesPage();
        }}
        header={<Header />}
        size="large"
        value={deviceStore.devices}
        loading={deviceStore.isLoading}
      >
        <Column field="id" header="ID" resizeable={false}/>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          frozen={true}
          alignFrozen="right"
          style={{ width: "100px", padding: "0.5rem" }}
        />
      </CrudDataTable>
    </PageWrapper>
  );
});

import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "@/app/store";
import { CrudDataTable, PageWrapper } from "@/components";
import { getPaginatorProps } from "@/shared/utils";
import { actionBodyTemplate } from "./components/actionBodyTemplate";
import { Header } from "./components/header";

export const VehicleListPage = observer(() => {
  const { vehicleStore } = useStore((store) => ({
    vehicleStore: store.vehicleStore,
  }));

  useEffect(() => {
    vehicleStore.getVehiclesPage();
  }, []);

  return (
    <PageWrapper>
      <CrudDataTable
        {...getPaginatorProps(vehicleStore.pagination)}
        onPage={(event) => {
          vehicleStore.pagination.pageSize = event.rows;
          vehicleStore.pagination.pageIndex = event.page ?? 0;
          vehicleStore.getVehiclesPage();
        }}
        header={<Header />}
        size="large"
        value={vehicleStore.vehicles}
        loading={vehicleStore.isLoading}
      >
        <Column field="id" header="ID" />
        <Column field="number" header="Номер ТС" />
        <Column field="type" header="Тип" resizeable={false} />
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

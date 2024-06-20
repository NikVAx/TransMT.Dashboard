import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "@/app/store";
import { CrudDataTable, PageWrapper } from "@/components";
import { getPaginatorProps } from "@/shared/utils";
import { actionBodyTemplate } from "./components/actionBodyTemplate";
import { Header } from "./components/header";

export const BuildingListPage = observer(() => {
  const { buildingStore } = useStore((store) => ({ buildingStore: store.buildingStore }));

  useEffect(() => {
    buildingStore.getBuildingsPage();
  }, []);

  return (
    <PageWrapper>
      <CrudDataTable
        {...getPaginatorProps(buildingStore.pagination)}
        onPage={(event) => {
          buildingStore.pagination.pageSize = event.rows;
          buildingStore.pagination.pageIndex = event.page ?? 0;
          buildingStore.getBuildingsPage();
        }}
        header={<Header />}
        size="large"
        value={buildingStore.buildings}
        loading={buildingStore.isLoading}
      >
        <Column field="id" header="ID" />
        <Column field="name" header="Наименование" />
        <Column field="address" header="Адрес" />
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

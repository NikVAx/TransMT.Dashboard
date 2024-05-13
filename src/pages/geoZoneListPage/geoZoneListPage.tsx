import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "@/app/store";
import { CrudDataTable, PageWrapper } from "@/components";
import { getPaginatorProps } from "@/shared/utils";
import { Header } from "./components/header";
import { actionBodyTemplate } from "./components/actionBodyTemplate";

export const GeoZoneListPage = observer(() => {
  const { geoZoneStore } = useStore((store) => ({ geoZoneStore: store.geoZoneStore }));
  useEffect(() => {
    geoZoneStore.getGeoZonesPage();
  }, []);

  return (
    <PageWrapper>
      <CrudDataTable
        {...getPaginatorProps(geoZoneStore.pagination)}
        onPage={(event) => {
          geoZoneStore.pagination.pageSize = event.rows;
          geoZoneStore.pagination.pageIndex = event.page ?? 0;
          geoZoneStore.getGeoZonesPage();
        }}
        header={<Header />}
        size="large"
        value={geoZoneStore.geoZones}
        loading={geoZoneStore.isLoading}
      >
        <Column field="id" header="ID" />
        <Column field="name" header="Название" resizeable={false} />
        <Column
          body={actionBodyTemplate}
          exportable={false}
          frozen={true}
          alignFrozen="right"
          style={{ width: "96px" }}
        />
      </CrudDataTable>
    </PageWrapper>
  );
});

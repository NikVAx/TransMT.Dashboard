import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "@/app/store";
import { PageWrapper } from "@/components";
import { ConfirmPopup } from "primereact/confirmpopup";
import { defaultDataTableProps, getPaginatorProps } from "@/shared/utils";
import { Header } from "./components/header";
import { actionBodyTemplate } from "./components/actionBodyTemplate";

export const RoleListPage = observer(() => {
  const { roleStore } = useStore((store) => ({ roleStore: store.roleStore }));
  useEffect(() => {
    roleStore.getRolesPage();
  }, []);

  return (
    <PageWrapper>
      <ConfirmPopup />
      <DataTable
        {...defaultDataTableProps}
        {...getPaginatorProps(roleStore.pagination)}
        onPage={(event) => {
          roleStore.pagination.pageSize = event.rows;
          roleStore.pagination.pageIndex = event.page ?? 0;
          roleStore.getRolesPage();
        }}
        header={<Header />}
        size="large"
        value={roleStore.roles}
        loading={roleStore.isLoading}
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
      </DataTable>
    </PageWrapper>
  );
});

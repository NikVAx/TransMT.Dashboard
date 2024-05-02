import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { useStore } from "@/app/store";
import { View } from "@/components";
import { IRole, PaginationStore } from "@/features";
import { useNavigate } from "react-router-dom";

export const RoleListPage = observer(() => {
  const { roleStore } = useStore((store) => ({ roleStore: store.roleStore }));
  const navigate = useNavigate();
  useEffect(() => {
    roleStore.getRolesPage();
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="flex flex-wrap gap-2">
        <Button label="Создать" icon="pi pi-plus" severity="success" onClick={() => {
          navigate("/identity/roles/create")
        }}/>
      </div>
      <span className="text-xl text-900 font-bold">Роли</span>
    </div>
  );

  const actionBodyTemplate = (data: IRole) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => {
            console.log("edit", data)
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => {}}
        />
      </div>
    );
  };

  const getPageProps = (paginationStore: PaginationStore) => {
    return {
      paginator: true,
      first: paginationStore.first,
      rows: paginationStore.pageSize,
      //rowsPerPageOptions: paginationStore.pageSizeOptions,
      totalRecords: paginationStore.totalCount
    }
  }

  return (
    <View style={{height: "100%", padding: "2rem"}}>
      <DataTable
        scrollable
        scrollHeight="flex"
        header={header}
        size="large"
        stripedRows
        value={roleStore.roles}
        loading={roleStore.isLoading}
        showGridlines
        resizableColumns
        lazy
        {...getPageProps(roleStore.pagination)}
        onPage={(event) => {
            roleStore.pagination.pageSize = event.rows;
            roleStore.pagination.pageIndex = event.page ?? 0;
            roleStore.getRolesPage();
        }}
      >
        <Column field="id" header="ID" />
        <Column field="name" header="Название" />
        <Column body={actionBodyTemplate} exportable={false} frozen={true} alignFrozen="right"/>
      </DataTable>
    </View>
  );
});

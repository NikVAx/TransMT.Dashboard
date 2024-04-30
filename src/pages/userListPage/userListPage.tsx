import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { useStore } from "@/app/store";
import { View } from "@/components";
import { IUser, PaginationStore } from "@/features";
import { useNavigate } from "react-router-dom";

export const UserListPage = observer(() => {
  const { userStore } = useStore((store) => ({ userStore: store.userStore }));
  const navigate = useNavigate();
  useEffect(() => {
    userStore.getUsersPage();
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="flex flex-wrap gap-2">
        <Button label="Создать" icon="pi pi-plus" severity="success" onClick={() => {
          navigate("/identity/users/create")
        }}/>
      </div>
      <span className="text-xl text-900 font-bold">Пользователи</span>
    </div>
  );

  const actionBodyTemplate = (data: IUser) => {
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
      rowsPerPageOptions: paginationStore.pageSizeOptions,
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
        value={userStore.users}
        loading={userStore.isLoading}
        showGridlines
        resizableColumns
        lazy
        {...getPageProps(userStore.pagination)}
        onPage={(event) => {
          userStore.pagination.pageSize = event.rows;
          userStore.pagination.pageIndex = event.page ?? 0;
          userStore.getUsersPage();
        }}
      >
        <Column field="id" header="ID" />
        <Column field="username" header="Имя пользователя" />
        <Column field="email" header="Электронная почта" />
        <Column body={actionBodyTemplate} exportable={false} frozen={true} alignFrozen="right"/>
      </DataTable>
    </View>
  );
});

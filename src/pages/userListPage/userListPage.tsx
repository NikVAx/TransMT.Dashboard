import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { useStore } from "@/app/store";

export const UserListPage = observer(() => {
  const { userStore } = useStore((store) => ({ userStore: store.userStore }));

  useEffect(() => {
    userStore.getUsersPage();
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">Пользователи</span>
    </div>
  );

  const actionBodyTemplate = () => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => {}}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => {}}
        />
      </>
    );
  };

  return (
    <DataTable
      scrollable
      scrollHeight="flex"
      
      header={header}
      size="large"
      stripedRows
      pt={
        {
          root: {
            style: {height: "100%"}
          }
        }
      }
      value={userStore.users}
      loading={userStore.isLoading}

      lazy
      paginator
      first={userStore.pagination.first}
      rows={userStore.pagination.pageSize}
      rowsPerPageOptions={userStore.pagination.pageSizeOptions}
      totalRecords={userStore.pagination.totalCount}
      onPage={(event) => {
        userStore.pagination.pageSize = event.rows;
        userStore.pagination.pageIndex = event.page ?? 0;
        userStore.getUsersPage();
      }}
    >
      <Column field="id" header="ID" />
      <Column field="username" header="Имя пользователя" />
      <Column field="email" header="Электронная почта" />
      <Column body={actionBodyTemplate} exportable={false} />
    </DataTable>
  );
});

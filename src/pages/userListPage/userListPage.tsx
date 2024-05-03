import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "@/app/store";
import { PageWrapper } from "@/components";
import { STATES } from "@/shared/constants";
import { defaultDataTableProps, getPaginatorProps } from "@/shared/utils";
import { actionBodyTemplate } from "./components/actionBodyTemplate";
import { Header } from "./components/header";

export const UserListPage = observer(() => {
  const { userStore } = useStore((store) => ({ userStore: store.userStore }));

  useEffect(() => {
    userStore.getUsersPage();
  }, []);

  useEffect(() => {
    if (userStore.state === STATES.DONE) {
      userStore.state = STATES.INITIAL;
    }
  }, [userStore.state]);

  return (
    <PageWrapper>
      <DataTable
        {...defaultDataTableProps}
        {...getPaginatorProps(userStore.pagination)}
        onPage={(event) => {
          userStore.pagination.pageSize = event.rows;
          userStore.pagination.pageIndex = event.page ?? 0;
          userStore.getUsersPage();
        }}
        header={<Header />}
        size="large"
        value={userStore.users}
        loading={userStore.isLoading}
      >
        <Column field="id" header="ID" />
        <Column field="username" header="Имя пользователя" />
        <Column field="email" header="Электронная почта" resizeable={false} />
        <Column
          body={actionBodyTemplate}
          exportable={false}
          frozen={true}
          alignFrozen="right"
          style={{ width: "150px" }}
        />
      </DataTable>
    </PageWrapper>
  );
});

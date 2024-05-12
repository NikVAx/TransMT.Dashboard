import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "@/app/store";
import { CrudDataTable, PageWrapper } from "@/components";
import { getPaginatorProps } from "@/shared/utils";
import { actionBodyTemplate } from "./components/actionBodyTemplate";
import { Header } from "./components/header";

export const OperatorListPage = observer(() => {
  const { operatorStore } = useStore((store) => ({
    operatorStore: store.operatorStore,
  }));

  useEffect(() => {
    operatorStore.getOperatorsPage();
  }, []);

  return (
    <PageWrapper>
      <CrudDataTable
        {...getPaginatorProps(operatorStore.pagination)}
        onPage={(event) => {
          operatorStore.pagination.pageSize = event.rows;
          operatorStore.pagination.pageIndex = event.page ?? 0;
          operatorStore.getOperatorsPage();
        }}
        header={<Header />}
        size="large"
        value={operatorStore.operators}
        loading={operatorStore.isLoading}
      >
        <Column field="id" header="ID" />
        <Column
          header="ФИО"
          body={(item) =>
            `${item.lastName} ${item.firstName} ${item.middleName}`
          }
          resizeable={false}
        />
        <Column
          body={actionBodyTemplate}
          exportable={false}
          frozen={true}
          alignFrozen="right"
          style={{ width: "150px" }}
        />
      </CrudDataTable>
    </PageWrapper>
  );
});

import { useStore } from "@/app/store";
import { View } from "@/components";
import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from "react";

const formatDate = (value: Date) => {
  return value.toLocaleDateString() + " - " + value.toLocaleTimeString();
};

export const SessionsSection = observer(() => {
  const { sessionStore } = useStore((store) => ({
    sessionStore: store.sessionStore,
  }));

  useEffect(() => {
    sessionStore.getSessions();
  }, []);

  return (
    <View>
      <DataTable
        value={sessionStore.sessions}
        tableStyle={{ minWidth: "50rem" }}
        loading={sessionStore.isLoading}
      >
        <Column
          field="createdAt"
          header="Создана"
          dataType="date"
          body={(s) => formatDate(s.createdAt)}
        />
        <Column
          field="expiredAt"
          header="Истекает"
          dataType="date"
          body={(s) => formatDate(s.expiredAt)}
        />
        <Column
          field="isBlocked"
          header="Заблокирована"
          body={(s) => (s.isBlocked ? "Да" : "Нет")}
        />
      </DataTable>
    </View>
  );
});

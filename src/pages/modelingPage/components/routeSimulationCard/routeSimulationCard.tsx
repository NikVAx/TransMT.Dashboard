import { RouteModel } from "@/features";
import { StoreProps } from "@/shared/types";
import { observer } from "mobx-react-lite";
import { ProgressSlider, routeModelsStore } from "../../modelingPage";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";

const CardButtons = observer(({ store }: StoreProps<RouteModel>) => {
  return (
    <div className="flex align-items-center gap-2">
      <Button
        text
        rounded
        onClick={() => {
          store.toggleExecuting();
          console.log(store.route.speeds)
        }}
        icon={store.isExecuting ? "pi pi-pause" : "pi pi-play"}
      />
      <Button
        text
        rounded
        onClick={() => {
          store.toggleHide();
        }}
        icon={store.isHide ? "pi pi-eye-slash" : "pi pi-eye"}
      />
      <Button
        rounded
        icon="pi pi-trash"
        severity="danger"
        onClick={() => {
          routeModelsStore.remove(store.route.id);
        }}
      />
    </div>
  );
});

export const RouteSimulationCard = observer(
  ({ store }: StoreProps<RouteModel>) => {
    
    const footerTemplate = (options: any) => {
      const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

      return (
        <div className={className}>
          <CardButtons store={store}/>
          <span className="p-text-secondary">Updated 2 hours ago</span>
        </div>
      );
    };

    return (
      <Panel
        header={`${store.route.id} - ${
          store.route.name.length > 0 ? store.route.name : "Без имени"
        }`}
        key={store.route.id}
        toggleable
        footerTemplate={footerTemplate}
      >
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <div className="flex flex-column gap-2">
            <span>ID: {store.route.id}</span>
            <span>Наименование: {store.route.name}</span>
            <span>Скорость: {store.speed} м/с</span>
            <span>Время симуляции: {store.time.toFixed()}</span>
            <span>Статус работы: {store.status}</span>
            <span>
              Состояние: {store.isExecuting ? "выполняется" : "пауза"}
            </span>
          </div>
        </div>
        <ProgressSlider store={store} />
      </Panel>
    );
  }
);

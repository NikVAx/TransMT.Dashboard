import { View } from "@/components";
import { RouteModel } from "@/features";
import { StoreProps } from "@/shared/types";
import { observer } from "mobx-react-lite";
import { Actions, ProgressSlider } from "../../modelingPage";
import { InputTextarea } from "primereact/inputtextarea";

export const RouteSimulationCard = observer(({ store }: StoreProps<RouteModel>) => {
    return (
      <View
        className="flex flex-column gap-2"
        style={{ padding: "10px", marginRight: "10px" }}
        key={store.route.id}
      >
        <span>ID: {store.route.id}</span>
        <span>Наименование: {store.route.name}</span>
        <span>Скорость: {store.speed} м/с</span>
        <span>Момент симуляции: {store.time}</span>
        <span>
          Состояние симуляции: {store.isExecuting ? "выполняется" : "пауза"}
        </span>
        <span>
          <InputTextarea autoResize value={store.message}  rows={9} cols={50} />
       
        </span>
        <Actions store={store} />
        <ProgressSlider store={store} />
      </View>
    );
  });
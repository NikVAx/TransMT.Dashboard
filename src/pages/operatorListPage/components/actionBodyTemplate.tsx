import { useStore } from "@/app/store";
import { CrudDeleteEntityButton, CrudEditEntityButton } from "@/components";
import { IOperator } from "@/features/entities/operator";

export const actionBodyTemplate = (data: IOperator) => {
  const { operatorStore } = useStore((store) => ({
    operatorStore: store.operatorStore,
  }));

  return (
    <div>
      <CrudEditEntityButton to={`/entities/operators/${data.id}/edit`} />
      <CrudDeleteEntityButton
        message="Вы уверены, что хотите удалить оператора ТС?"
        data={data}
        onAccept={(arg) => {
          operatorStore.deleteOperators({ keys: [arg.id] });
        }}
      />
    </div>
  );
};

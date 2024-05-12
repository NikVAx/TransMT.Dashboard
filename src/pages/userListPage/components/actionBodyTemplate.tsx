import { useStore } from "@/app/store";
import { CrudDeleteEntityButton, CrudEditEntityButton } from "@/components";
import { IUser } from "@/features";

export const actionBodyTemplate = (data: IUser) => {
  const { userStore } = useStore((store) => ({
    userStore: store.userStore,
  }));

  return (
    <div>
      <CrudEditEntityButton to={"/not-implemented"} />
      <CrudDeleteEntityButton
        message="Вы уверены, что хотите удалить здание?"
        data={data}
        onAccept={(arg) => {
          userStore.deleteUsers({ keys: [arg.id] });
        }}
      />
    </div>
  );
};

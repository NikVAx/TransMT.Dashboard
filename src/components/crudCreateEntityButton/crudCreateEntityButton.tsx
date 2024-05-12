import { NavigationLink } from "../navigationLink";

export const CrudCreateEntityButton = ({ to }: { to: string }) => {
  return (
    <NavigationLink
      className="p-button p-component p-button-success"
      to={to}
    >
      <span className="p-button-icon p-c p-button-icon-left pi pi-plus" />
      <span className="p-button-label p-c">Создать</span>
    </NavigationLink>
  );
};

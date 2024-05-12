import { CrudEditEntityButtonProps } from "./crudEditEntityButton.types";
import { NavigationLink } from "../navigationLink";

export const CrudEditEntityButton = ({ to }: CrudEditEntityButtonProps) => {
  return (
    <NavigationLink
      className="mr-2 p-button p-component p-button-icon-only p-button-outlined p-button-rounded"
      to={to}
    >
      <i className="pi pi-pencil" />
    </NavigationLink>
  );
};

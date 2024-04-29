import { useFormContext } from "react-hook-form";
import { FormInputErrorMessageProps } from "./formInputErrorMessage.types";

export const FormInputErrorMessage = ({
  name,
  root = false,
}: FormInputErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (!root && (!errors[name] || !errors[name]?.message)) {
    return null;
  }
  if (
    root &&
    (!errors.root || !errors.root[name] || !errors.root[name].message)
  ) {
    return null;
  }

  return (
    <small className="p-error" style={{ paddingLeft: "0.8rem" }}>
      {root && errors.root !== undefined
        ? (errors.root[name]?.message as string)
        : (errors[name]?.message as string)}
    </small>
  );
};

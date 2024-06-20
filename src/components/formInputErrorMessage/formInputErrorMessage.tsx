import { useFormContext } from "react-hook-form";
import { FormInputErrorMessageProps } from "./formInputErrorMessage.types";
import { getNestedValue } from "@/shared/utils";

export const FormInputErrorMessage = ({
  name,
  root = false,
  style,
}: FormInputErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (Object.keys(errors).length === 0) {
    return null;
  }
  const nested = getNestedValue(errors, name);

  if (!root && (!nested || !nested?.message)) {
    return null;
  }
  if (
    root &&
    (!errors.root || !errors.root[name] || !errors.root[name].message)
  ) {
    return null;
  }

  return (
    <small className="p-error" style={style}>
      {root && errors.root !== undefined
        ? (errors.root[name]?.message as string)
        : (nested?.message as string)}
    </small>
  );
};

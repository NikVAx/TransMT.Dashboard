import { useFormContext } from "react-hook-form";
import { FormInputErrorMessageProps } from "./formInputErrorMessage.types";

export const FormInputErrorMessage = ({ name }: FormInputErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (errors[name] === undefined || errors[name]?.message === undefined) {
    return null;
  } else {
    return <small className="p-error">{errors[name]?.message as string}</small>;
  }
};

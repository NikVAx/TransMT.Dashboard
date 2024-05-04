import { classNames } from "primereact/utils";
import { FormInputTextProps } from "../formInputText";
import { InputText } from "primereact/inputtext";
import { Label } from "../label";
import styles from "./variantInputText.module.css";

export const VariantInputText = ({
  name,
  label,
  invalid,
  labelType = "fixed",
  ...props
}: FormInputTextProps) => {
  return (
    <span
      className={classNames({
        "p-float-label mb-3": labelType === "float",
        [styles.spanFixed]: labelType === "fixed",
      })}
    >
      <InputText
        {...props}
        id={name}
        autoFocus
        className={classNames({
          "p-invalid": invalid,
          "w-full": labelType === "float",
        })}
      />
      <Label htmlFor={name} invalid={invalid}>
        {label}
      </Label>
    </span>
  );
};

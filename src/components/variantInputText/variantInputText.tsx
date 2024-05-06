import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Label } from "../label";
import styles from "./variantInputText.module.css";
import { VariantInputTextProps } from "./variantInputText.types";
import { forwardRef } from "react";

export const VariantInputText = forwardRef<
  HTMLInputElement,
  VariantInputTextProps
>(
  (
    {
      name,
      label,
      invalid,
      labelType = "fixed",
      className,
      ...props
    }: VariantInputTextProps,
    ref
  ) => {
    return (
      <span
        className={classNames({
          "p-float-label mb-3": labelType === "float",
          [styles.spanFixed]: labelType === "fixed",
        })}
      >
        <InputText
          {...props}
          ref={ref}
          id={name}
          autoFocus
          className={classNames(className, {
            "p-invalid": invalid,
            "w-full": labelType === "float",
          })}
        />
        <Label htmlFor={name} invalid={invalid}>
          {label}
        </Label>
      </span>
    );
  }
);

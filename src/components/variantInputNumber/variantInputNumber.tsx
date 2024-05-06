import { classNames } from "primereact/utils";
import { Label } from "../label";
import styles from "./variantInputNumber.module.css";
import { VariantInputNumberProps } from "./variantInputNumber.types";
import { forwardRef } from "react";
import { InputNumber } from "primereact/inputnumber";

export const VariantInputNumber = forwardRef<
  InputNumber,
  VariantInputNumberProps
>(
  (
    {
      name,
      label,
      invalid,
      labelType = "fixed",
      className,
      ...props
    }: VariantInputNumberProps,
    ref
  ) => {
    return (
      <span
        className={classNames({
          "p-float-label mb-3": labelType === "float",
          [styles.spanFixed]: labelType === "fixed",
        })}
      >
        <InputNumber
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

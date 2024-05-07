import { IAs, IVariantLabel } from "@/shared/types";
import { classNames } from "primereact/utils";
import { ComponentPropsWithRef, ElementType, forwardRef } from "react";
import { Label } from "../label";
import styles from "./genericVariantInput.module.css";

export const GenericVariantInput = forwardRef(
  <T extends ElementType>(
    {
      as,
      name,
      className,
      invalid,
      labelType,
      label,
      ...props
    }: IAs<T> & IVariantLabel & ComponentPropsWithRef<T>,
    ref: any
  ) => {
    const Component = as;

    const computedClassName = classNames(className, {
      "p-invalid": invalid,
      "w-full": labelType === "float",
    });

    return (
      <span
        className={classNames({
          "p-float-label mb-3": labelType === "float",
          [styles.spanFixed]: labelType === "fixed",
        })}
      >
        <Component
          {...props}
          id={name}
          className={computedClassName}
          ref={ref}
        />
        <Label htmlFor={name} invalid={invalid}>
          {label}
        </Label>
      </span>
    );
  }
);

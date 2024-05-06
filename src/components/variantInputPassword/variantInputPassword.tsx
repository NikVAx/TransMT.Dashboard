import { Password } from "primereact/password";
import { Label } from "../label";
import styles from "./variantInputPassword.module.css";
import { classNames } from "primereact/utils";
import { VariantInputPasswordProps } from "./variantInputPassword.types";
import { ForwardedRef, forwardRef } from "react";

export const VariantInputPassword = forwardRef(
  ({
    name,
    label,
    invalid,
    labelType = "fixed",
    className,
    feedback = false,
    ...props
  }: VariantInputPasswordProps, ref: ForwardedRef<Password>) => {
    return (
      <span
        className={classNames({
          "p-float-label mb-3": labelType === "float",
          [styles.spanFixed]: labelType === "fixed",
        })}
      >
        <Password
          {...props}
          ref={ref}
          id={name}
          pt={{
            input: {
              style: {
                width: "100%",
              },
            },
          }}
          className={classNames(className, {
            "p-invalid": invalid,
            "w-full": labelType === "float",
          })}
          feedback={feedback}
          title={label}
        />
        <Label htmlFor={name} invalid={invalid}>
          {label}
        </Label>
      </span>
    );
  }
);

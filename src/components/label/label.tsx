import { classNames } from "primereact/utils";
import { LabelProps } from "./label.types";

export const Label = ({
  className,
  children,
  invalid,
  ...props
}: LabelProps) => {
  return (
    <label
      {...props}
      className={classNames(
        {
          "p-error": invalid,
        },
        className
      )}
    >
      {children}
    </label>
  );
};

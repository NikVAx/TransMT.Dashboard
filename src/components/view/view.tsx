import { classNames } from "primereact/utils";
import styles from "./view.module.css";
import { ViewProps } from "./view.types";

export const View = ({
  className,
  children,
  variant = "section",
}: ViewProps) => {
  return (
    <div className={classNames(className, styles.view)} data-variant={variant}>
      {children}
    </div>
  );
};

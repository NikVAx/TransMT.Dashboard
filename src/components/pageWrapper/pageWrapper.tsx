import { classNames } from "primereact/utils";
import styles from "./pageWrapper.module.css";
import { PropsWithChildren } from "react";

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return <div className={classNames(styles.pageWrapper)}>{children}</div>;
};

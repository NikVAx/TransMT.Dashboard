import { classNames } from "primereact/utils";
import { View } from "../view";
import styles from "./panelV.module.css";
import {
  PanelVContentProps,
  PanelVHeaderProps,
  PanelVProps,
} from "./panelV.types";
import {
  Children,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  isValidElement,
} from "react";

export const PanelVHeader = ({
  children,
  className,
  ...props
}: PanelVHeaderProps) => {
  const computedClassName = classNames(className, styles.header);

  return (
    <div className={computedClassName} {...props}>
      <span className={styles.headerText}>{children}</span>
    </div>
  );
};

export const PanelVContent = ({
  children,
  className,
  ...props
}: PanelVContentProps) => {
  const computedClassName = classNames(className, styles.content);
  return (
    <div className={computedClassName} {...props}>
      {children}
    </div>
  );
};

export const PanelV = ({ children }: PanelVProps) => {
  const childrenArray = Children.toArray(children);

  const elements = {
    header: null as unknown as
      | ReactPortal
      | ReactElement<unknown, string | JSXElementConstructor<any>>,
    content: [] as ReactNode[],
  };

  childrenArray.forEach((child) => {
    if (!isValidElement(child)) {
      elements.content.push(child);
      return;
    }

    if (child.type === PanelVHeader) {
      elements.header ||= child;
      return;
    }

    

    elements.content.push(child);
  });

  return (
    <View className={styles.wrapper}>
      {elements.header}
      {elements.content}
    </View>
  );
};

PanelV.Header = PanelVHeader;
PanelV.Content = PanelVContent;






/*
export const PanelV = ({ children }: PanelVProps) => {
  const childrenArray = Children.toArray(children);

  const elements = {
    header: null as unknown as
      | ReactPortal
      | ReactElement<unknown, string | JSXElementConstructor<any>>,
    content: [] as ReactNode[],
  };

  childrenArray.forEach((child) => {
    if (!isValidElement(child)) {
      elements.content.push(child);
      return;
    }

    if (child.type === PanelVHeader) {
      elements.header = child;
      return;
    }

    elements.content.push(child);
  });

  return (
    <View className={styles.wrapper}>
      {elements.header}
      <div className={styles.content}>{elements.content}</div>
    </View>
  );
};

*/
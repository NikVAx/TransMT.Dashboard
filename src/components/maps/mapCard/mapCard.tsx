import { classNames } from "primereact/utils";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export const MapCard = ({
  children,
  className,
  ...props
}: PropsWithChildren & ComponentPropsWithoutRef<"div">) => {
  const computedClassName = classNames("flex flex-column gap-3", className);
  return (
    <div {...props} className={computedClassName}>
      {children}
    </div>
  );
};

MapCard.Header = ({ children }: PropsWithChildren) => {
  return <div style={{ fontWeight: "bold" }}>{children}</div>;
};

MapCard.Content = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-column gap-1">{children}</div>;
};

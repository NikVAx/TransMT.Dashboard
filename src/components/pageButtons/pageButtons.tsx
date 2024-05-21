import { PropsWithChildren } from "react";

export const PageButtons = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="flex flex-row-reverse gap-2"
      style={{
        paddingBottom: "20px",
      }}
    >
      {children}
    </div>
  );
};

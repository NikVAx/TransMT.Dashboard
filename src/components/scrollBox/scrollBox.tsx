import { View } from "../view";
import { ScrollBoxProps } from "./scrollBox.types";

export const ScrollBox = ({ children, autoScroll = false }: ScrollBoxProps) => {
  return (
    <View
      style={{
        height: "100%",
        overflow: autoScroll ? "auto" : "hidden",
      }}
    >
      {children}
    </View>
  );
};

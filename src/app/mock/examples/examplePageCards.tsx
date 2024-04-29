import { ScrollBox } from "@/components";
import { mock } from "../mock";

export const ExamplePageCards = () => {
  return <ScrollBox autoScroll>{mock.cards(70)}</ScrollBox>;
};

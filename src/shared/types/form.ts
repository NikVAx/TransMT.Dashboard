import { FieldValues, RegisterOptions } from "react-hook-form";

export type FormRule = Omit<
  RegisterOptions<FieldValues, string>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

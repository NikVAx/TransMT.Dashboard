import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";

export interface FormWrapperProps
  extends Omit<
    React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    "onSubmit" | "onError"
  > {
  defaultValues: any;
  onSubmit: SubmitHandler<any>;
  onError?: SubmitErrorHandler<any>;
}

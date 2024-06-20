import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

export interface FormWrapperProps
  extends Omit<
    React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    "onSubmit" | "onError"
  > {
  onSubmit: SubmitHandler<any>;
  onError?: SubmitErrorHandler<any>;
  methods: UseFormReturn<any, any, undefined>;
}

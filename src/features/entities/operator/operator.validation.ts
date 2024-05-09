import * as yup from "yup";
import { ICreateOperatorDto } from "./operator.types";

export const getOperatorValidationSchema =
  (): yup.ObjectSchema<ICreateOperatorDto> =>
    yup
      .object()
      .shape({})
      .required();

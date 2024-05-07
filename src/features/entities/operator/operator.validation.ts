import * as yup from "yup";
import { ICreateOperatorDto } from "./operator.types";

export const getBuildingValidationSchema =
  (): yup.ObjectSchema<ICreateOperatorDto> =>
    yup
      .object()
      .shape({})
      .required();

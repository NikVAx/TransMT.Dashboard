import * as yup from "yup";
import { ICreateGpsDeviceDto } from "./gpsDevice.types";

export const getGpsDeviceValidationSchema =
  (): yup.ObjectSchema<ICreateGpsDeviceDto> =>
    yup
      .object()
      .shape({

      })
      .required();

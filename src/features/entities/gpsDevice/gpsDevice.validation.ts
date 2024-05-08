import * as yup from "yup";
import { ICreateGpsDeviceDto } from "./gpsDevice.types";

export const getBuildingValidationSchema =
  (): yup.ObjectSchema<ICreateGpsDeviceDto> =>
    yup
      .object()
      .shape({

      })
      .required();

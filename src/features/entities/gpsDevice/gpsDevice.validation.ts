import * as yup from "yup";
import { getVehicleValidationSchema } from "../vehicle";

export const getGpsDeviceValidationSchema = () =>
  yup
    .object()
    .shape({
      deviceId: yup.string().required(),
      vehicle: getVehicleValidationSchema()
        .shape({
          id: yup.string().uuid().required(),
        })
        .label("Транспортное средство")
        .required(),
    })
    .required();

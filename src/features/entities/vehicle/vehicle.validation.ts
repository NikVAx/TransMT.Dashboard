import * as yup from "yup";
import { getBuildingValidationSchema } from "../building";

export const getVehicleValidationSchema =
  () =>
    yup
      .object()
      .shape({
        number: yup.string().label("Номер ТС"),
        type: yup.string().required().label("Тип здания"),
        storageArea: getBuildingValidationSchema().label("Зона хранения")
      })
      .required();

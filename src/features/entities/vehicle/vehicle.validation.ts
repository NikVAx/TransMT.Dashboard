import * as yup from "yup";
import { getBuildingValidationSchema } from "../building";

export const getVehicleValidationSchema = () =>
  yup
    .object()
    .shape({
      number: yup.string().required().label("Номер ТС"),
      type: yup.string().required().label("Тип здания"),
      operatingStatus: yup.string().required().label("Статус"),
      storageArea: 
        getBuildingValidationSchema()
        .shape({
          id: yup.string().uuid().required()
        })
        .label("Зона хранения")
        .required(),
    })
    .required();

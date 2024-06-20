import { ILatLng } from "@/shared/types";
import * as yup from "yup";
import { ICreateBuildingDto } from "./building.types";

export const getGeoPointSchema = (): yup.ObjectSchema<ILatLng> =>
  yup.object().shape({
    lat: yup.number().min(-90).max(90).required().label("Широта"),
    lng: yup.number().min(-180).max(180).required().label("Долгота"),
  });

export const getBuildingValidationSchema =
  (): yup.ObjectSchema<ICreateBuildingDto> =>
    yup
      .object()
      .shape({
        address: yup.string().label("Адрес"),
        name: yup.string().required().label("Наименование"),
        type: yup.string().required().label("Тип здания"),
        location: getGeoPointSchema().label("Координаты"),
      })
      .required();

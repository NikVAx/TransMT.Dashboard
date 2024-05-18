import * as yup from "yup";

export const getGeoZoneValidationSchema = () =>
  yup
    .object()
    .shape({
      name: yup.string().required().label("Наименование"),
      type: yup.string().required().label("Тип геозоны"),
      color: yup.string().required().label("Цвет геозоны"),
    })
    .required();

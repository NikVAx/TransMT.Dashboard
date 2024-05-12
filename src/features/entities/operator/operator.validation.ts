import * as yup from "yup";

export const getOperatorValidationSchema =
  () =>
    yup
      .object()
      .shape({
        firstName: yup.string().required().label("Имя"),
        lastName: yup.string().required().label("Фамилия"),
        middleName: yup.string().notRequired().label("Отчество"),
      })
      .required();

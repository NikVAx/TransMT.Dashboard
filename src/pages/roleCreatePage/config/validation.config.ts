import { object, string } from "yup";

export const getRoleValidationSchema = () =>
  object()
    .shape({
      name: string().required().label("Название"),
      description: string().label("Описание"),
    })
    .required();

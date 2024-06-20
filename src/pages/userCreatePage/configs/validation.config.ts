import { object, string } from "yup";

export const getUserValidationSchema = () =>
  object()
    .shape({
      username: string().required().label("Имя пользователя"),
      email: string().email().required().label("Электронная почта"),
      password: string().required().label("Пароль"),
      firstName: string().required().label("Имя"),
      lastName: string().required().label("Фамилия"),
      middleName: string().optional().label("Отчество"),
    })
    .required();

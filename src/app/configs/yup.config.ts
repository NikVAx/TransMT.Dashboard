import { LocaleObject } from "yup";

export const yupLocaleConfig: LocaleObject = {
  mixed: {
    required: ({ path, label }) => {
      return `${label ?? path} - обязательное для заполнения поле`;
    },
  },
  string: {
    email: ({ path, label }) => {
      return `${label ?? path} должна быть корректной (например, example@ex.com)`;
    },
  }
};

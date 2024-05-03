import { LocaleObject } from "yup";

export const yupLocaleConfig: LocaleObject = {
  mixed: {
    required: ({ path, label }) => {
      return `${label ?? path} - обязательное для заполнения поле.`;
    },
  },
};

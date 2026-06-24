import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .max(64, "Пошта має мати 64 символи")
    .required(`Поле пошта не може бути пустою`),
  password: Yup.string()
    .min(8, "Пароль має мати мінімум 8 символів")
    .max(64, "Пароль має мати мінімум 64 символа")
    .required("Поле пароль не може бути пустим"),
});
export const registerSchema = loginSchema.shape({
  name: Yup.string()
    .min(2, "Ім'я має мати мінімум 2 символи")
    .max(32, "Ім'я має мати максимум 32 символи")
    .required("Поле імʼя не може бути пустим"),
});

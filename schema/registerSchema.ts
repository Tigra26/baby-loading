import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має бути мінімум 2 символи")
    .max(32, "Ім'я має бути максимум 32 символи")
    .required(),
  email: Yup.string().email().max(64, "Email має бути 64 символи").required(),
  password: Yup.string()
    .min(8, "Пароль має бути мінімум 8 символів")
    .max(64, "Пароль має бути мінімум 64 символа")
    .required(),
});

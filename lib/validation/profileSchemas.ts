import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має мати мінімум 2 символи")
    .max(32, "Ім'я має мати максимум 32 символи")
    .required("Поле імʼя не може бути порожнім"),
  email: Yup.string()
    .email("Введіть правильну електронну пошту")
    .max(64, "Пошта має мати максимум 64 символи")
    .required("Поле email не може бути порожнім"),
  babyGender: Yup.string().required("Оберіть стать дитини"),
  dueDate: Yup.string().required("Оберіть планову дату пологів"),
});

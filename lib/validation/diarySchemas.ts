import * as Yup from "yup";

export const diaryFormSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required("Обов'язкове поле"),
  content: Yup.string().max(1000),
  emotions: Yup.array()
    .min(1, "Оберіть хоча б одну категорію")
    .required("Оберіть категорію"),
});

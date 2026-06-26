import * as Yup from "yup";

export const diaryFormSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(1000),
});

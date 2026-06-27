import * as Yup from "yup";

const taskFormSchema = Yup.object({
  name: Yup.string().required("Назва завдання є обовʼязковою").max(100),

  date: Yup.date()
    .required("Дата завдання є обовʼязковою")
    .min(new Date(), "Дата завдання не може бути в минулому"),
});

export default taskFormSchema;

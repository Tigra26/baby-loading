import * as Yup from "yup";
import { startOfDay } from "date-fns";

const today = startOfDay(new Date());

const taskFormSchema = Yup.object({
  name: Yup.string().required("Назва завдання є обовʼязковою").max(100),

  date: Yup.date()
    .required()
    .min(today, "Дата завдання не може бути в минулому"),
});

export default taskFormSchema;

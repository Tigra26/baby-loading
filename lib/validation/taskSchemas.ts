import * as Yup from "yup";

const taskFormSchema = Yup.object({
  name: Yup.string().required("Task is required").max(100),

  date: Yup.date().required("Date is required"),
});

export default taskFormSchema;

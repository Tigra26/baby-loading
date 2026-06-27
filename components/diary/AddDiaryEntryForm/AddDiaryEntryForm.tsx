import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import { DiaryFormValues } from "@/types/diary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { diaryFormSchema } from "@/lib/validation/diarySchemas";
import { createDiaryNote, getEmotions } from "@/lib/api/diaryApi";
import css from "./AddDiaryEntryForm.module.css";
import EmotionSelect from "../EmotionSelect/EmotionSelect";

interface DiaryFormProps {
  onClose: () => void;
}

type MutationVariables = {
  values: DiaryFormValues;
  actions: FormikHelpers<DiaryFormValues>;
};

const initialValues: DiaryFormValues = {
  title: "",
  description: "",
  emotions: [],
};

const AddDiaryEntryForm = ({ onClose }: DiaryFormProps) => {
  const { data } = useQuery({
    queryKey: ["emotions"],
    queryFn: getEmotions,
  });

  const emotions = data?.emotions ?? [];

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ values }: MutationVariables) => createDiaryNote(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      variables.actions.resetForm();
      // toast.success("Note added successfully!");
      onClose();
    },
    onError: () => {
      // toast.error("Oops, something went wrong. Note not added");
    },
  });

  function handleSubmit(
    values: DiaryFormValues,
    actions: FormikHelpers<DiaryFormValues>
  ) {
    mutate({ values, actions });
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={diaryFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title" className={css.label}>
            Заголовок
          </label>
          <Field
            id="title"
            type="text"
            name="title"
            className={css.input}
            placeholder="Введіть заголовок запису"
          />
          <ErrorMessage name="title" component={"span"} className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="emotions" className={css.label}>
            Категорії
          </label>
          <EmotionSelect emotions={emotions} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content" className={css.label}>
            Запис
          </label>
          <Field
            as="textarea"
            id="description"
            name="description"
            rows={8}
            className={css.textarea}
            placeholder="Запишіть, як ви себе відчуваєте"
          />
          <ErrorMessage
            name="description"
            component={"span"}
            className={css.error}
          />
        </div>
        <button type="submit" className={css.submitBtn} disabled={false}>
          Зберегти
        </button>
      </Form>
    </Formik>
  );
};

export default AddDiaryEntryForm;

import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import { DiaryFormValues } from "@/types/diary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { diaryFormSchema } from "@/lib/validation/diarySchemas";
import {
  createDiaryNote,
  getEmotions,
  updateDiaryNote,
} from "@/lib/api/diaryApi";
import css from "./AddDiaryEntryForm.module.css";
import EmotionSelect from "../EmotionSelect/EmotionSelect";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DiaryFormProps {
  initialValues?: DiaryFormValues;
  noteId?: string;
  onClose: () => void;
}

type MutationVariables = {
  values: DiaryFormValues;
  actions: FormikHelpers<DiaryFormValues>;
};

export const defaultValues: DiaryFormValues = {
  title: "",
  description: "",
  emotions: [],
};

const AddDiaryEntryForm = ({
  initialValues,
  noteId,
  onClose,
}: DiaryFormProps) => {
  const { data } = useQuery({
    queryKey: ["emotions"],
    queryFn: getEmotions,
  });

  const emotions = data?.emotions ?? [];

  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ values }: MutationVariables) => {
      if (noteId) {
        return updateDiaryNote(noteId, values);
      }

      return createDiaryNote(values);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      variables.actions.resetForm();
      router.refresh();
      toast.success(
        noteId ? "Запис успішно оновлено!" : "Нотатку успішно додано!"
      );
      onClose();
    },
    onError: () => {
      toast.error("Ой, щось пішло не так. Нотатку не додано.");
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
      initialValues={initialValues ?? defaultValues}
      onSubmit={handleSubmit}
      validationSchema={diaryFormSchema}
      enableReinitialize
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

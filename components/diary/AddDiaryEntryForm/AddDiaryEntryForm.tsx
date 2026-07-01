import {
  Formik,
  Form,
  Field,
  type FormikHelpers,
  ErrorMessage,
  FieldProps,
} from "formik";
import { DiaryFormValues } from "@/types/diary";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { diaryFormSchema } from "@/lib/validation/diarySchemas";
import {
  createDiaryNote,
  getEmotions,
  updateDiaryNote,
} from "@/lib/api/clientApi";
import css from "./AddDiaryEntryForm.module.css";
import EmotionSelect from "../EmotionSelect/EmotionSelect";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import clsx from "clsx";

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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["emotions"],
      queryFn: ({ pageParam = 1 }) => getEmotions(pageParam, 10),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
    });
  const emotions = data?.pages.flatMap((page) => page.emotions) ?? [];

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
          <Field name="title">
            {({ field, meta }: FieldProps) => (
              <input
                {...field}
                id="title"
                type="text"
                placeholder="Введіть заголовок запису"
                className={clsx(
                  css.input,
                  meta.touched && meta.error && css.inputError
                )}
              />
            )}
          </Field>
          <ErrorMessage name="title" component={"span"} className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="emotions" className={css.label}>
            Категорії
          </label>
          <EmotionSelect
            emotions={emotions}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
          <ErrorMessage
            name="emotions"
            component={"span"}
            className={css.error}
          />
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

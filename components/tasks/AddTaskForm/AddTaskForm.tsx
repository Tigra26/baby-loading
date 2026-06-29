"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, TaskCreationProps } from "@/lib/api/tasksApi";
import { useState } from "react";
import taskFormSchema from "@/lib/validation/taskSchemas";

import css from "./AddTaskForm.module.css";
import { CustomDatePicker } from "@/components/shared/Calendar/CustomDatePicker";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";

interface AddTaskFormProps {
  onClose: () => void;
}

const AddTaskForm = ({ onClose }: AddTaskFormProps) => {
  const [draft, setDraft] = useState<TaskCreationProps>({
    name: "",
    date: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["createTask"],
    mutationFn: createTask,
    onSuccess: () => {
      setDraft({ name: "", date: "" });
      toast.success("Завдання успішно створено!");

      queryClient.invalidateQueries({
        queryKey: ["getTasks"],
      });
    },
    onError: () => {
      toast.error("Помилка створення завдання!");
    },
  });

  const handleSubmit = async (values: TaskCreationProps) => {
    await mutation.mutateAsync(values);

    setDraft({ name: "", date: "" });

    onClose();
  };

  return (
    <div className={css.taskDiv}>
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Закрити вікно"
      >
        <SvgIcon name="close" size={24} className={css.closeIcon} />
      </button>

      <h2 className={css.title}>Нове завдання</h2>

      <Formik
        initialValues={draft}
        onSubmit={handleSubmit}
        validationSchema={taskFormSchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Назва завдання
            <Field
              name="name"
              className={css.input}
              type="text"
              as="input"
              placeholder="Прийняти вітаміни"
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </label>

          <label className={css.label}>
            Дата
            <Field name="date">
              {({ field, form, meta }: FieldProps) => (
                <CustomDatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => {
                    form.setFieldValue(
                      "date",
                      date ? format(date, "yyyy-MM-dd") : ""
                    );
                  }}
                  error={meta.touched && meta.error ? true : false}
                  className={`${css.input} ${css.dateInput}`}
                  placeholderText={format(new Date(), "dd.MM.yyyy")}
                  id="date"
                  showIcon={false}
                />
              )}
            </Field>
            <ErrorMessage name="date" component="span" className={css.error} />
          </label>

          <button className={css.button} type="submit">
            Зберегти
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTaskForm;

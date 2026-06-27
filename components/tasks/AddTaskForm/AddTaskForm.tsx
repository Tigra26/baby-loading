"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, TaskCreationProps } from "@/lib/api/tasksApi";
import { useState } from "react";
import taskFormSchema from "@/lib/validation/taskSchemas";

import css from "./AddTaskForm.module.css";

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
    <>
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
            <Field as="input" className={css.input} name="date" type="date" />
            <ErrorMessage name="date" component="span" className={css.error} />
          </label>

          <button className={css.button} type="submit">
            Зберегти
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default AddTaskForm;

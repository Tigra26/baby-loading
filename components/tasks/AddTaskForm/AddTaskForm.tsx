"use client";

import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import css from "./AddTaskForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createTask, TaskCreationProps } from "@/lib/api/tasksApi";
import { useState } from "react";
import taskFormSchema from "@/lib/validation/taskSchemas";

interface AddTaskFormProps {
  onClose: () => void;
}

const AddTaskForm = ({ onClose }: AddTaskFormProps) => {
  const [draft, setDraft] = useState<TaskCreationProps>({
    name: "",
    date: "",
  });

  const mutation = useMutation({
    mutationKey: ["addTask"],
    mutationFn: createTask,
    onSuccess: () => {
      setDraft({ name: "", date: "" });
      toast.success("Task created");
    },
    onError: () => {
      toast.error("Error creating task");
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
          </label>

          <label className={css.label}>
            Дата
            <Field as="input" className={css.input} name="date" type="date" />
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

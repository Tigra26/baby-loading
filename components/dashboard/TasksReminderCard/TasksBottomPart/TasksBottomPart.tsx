"use client";

import { useState } from "react";
import AddTaskForm from "@/components/tasks/AddTaskForm/AddTaskForm";
import Modal from "@/components/shared/Modal/Modal";

import css from "./TasksBottomPart.module.css";

const TasksBottomPart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTask = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <p className={css.textFirst}>Наразі немає жодних завдань</p>
        <p className={css.textSecond}>Створіть мершій нове завдання</p>
      </div>

      <button onClick={handleAddTask} className={css.button}>
        Створити завдання
      </button>

      {isOpen && (
        <Modal onClose={handleModalClose}>
          <AddTaskForm onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
};

export default TasksBottomPart;

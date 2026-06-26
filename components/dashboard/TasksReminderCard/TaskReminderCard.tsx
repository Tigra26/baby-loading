"use client";

import { useState } from "react";

import Modal from "@/components/shared/Modal/Modal";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import AddTaskForm from "@/components/tasks/AddTaskForm/AddTaskForm";

import css from "./TaskReminderCard.module.css";

const TaskReminderCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTask = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={css.upperPart}>
        <h2 className={css.title}>Важливі завдання</h2>

        <button onClick={handleAddTask} className={css.taskBtn}>
          <SvgIcon name="add_circle_icon" size={24} className={css.icon} />
        </button>
      </div>

      <div>
        <p className={css.textFirst}>Наразі немає жодних завдань</p>
        <p className={css.textSecond}>Створіть мершій нове завдання</p>
      </div>

      <button onClick={handleAddTask} className={css.button}>
        Створити завдання
      </button>

      {isOpen && (
        <Modal onClose={handleModalClose}>
          <AddTaskForm />
        </Modal>
      )}
    </div>
  );
};

export default TaskReminderCard;

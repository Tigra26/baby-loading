"use client";

import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import css from "./TaskReminderCard.module.css";
import Modal from "@/components/shared/Modal/Modal";
import AddTaskForm from "@/components/tasks/AddTaskForm/AddTaskForm";
import { useState } from "react";

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

      {/* <ul>
        <li>
          <input type="checkbox" />
        </li>
      </ul> */}

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

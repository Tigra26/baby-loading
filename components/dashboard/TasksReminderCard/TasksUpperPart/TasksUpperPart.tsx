"use client";

import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import { useState } from "react";
import AddTaskForm from "@/components/tasks/AddTaskForm/AddTaskForm";
import Modal from "@/components/shared/Modal/Modal";

import css from "./TasksUpperPart.module.css";

const TasksUpperPart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTask = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.upperPart}>
      <h2 className={css.title}>Важливі завдання</h2>

      <button onClick={handleAddTask} className={css.taskBtn}>
        <SvgIcon name="add_circle_icon" size={24} className={css.icon} />
      </button>

      {isOpen && (
        <Modal onClose={handleModalClose}>
          <AddTaskForm onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
};

export default TasksUpperPart;

"use client";

import { useState } from "react";
import AddTaskForm from "@/components/tasks/AddTaskForm/AddTaskForm";
import Modal from "@/components/shared/Modal/Modal";

import css from "./TasksBottomPart.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

const TasksBottomPart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const handleAddTask = () => {
    if (user) {
      setIsOpen(true);
    } else {
      router.push("/auth/register");
    }
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

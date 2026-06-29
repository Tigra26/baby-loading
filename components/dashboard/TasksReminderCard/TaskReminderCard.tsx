"use client";

import css from "./TaskReminderCard.module.css";
import TasksUpperPart from "./TasksUpperPart/TasksUpperPart";
import TasksBottomPart from "./TasksBottomPart/TasksBottomPart";
import TasksList from "./TasksList/TasksList";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasksApi";
import { useEffect } from "react";

const TaskReminderCard = () => {
  const { data } = useQuery({
    queryKey: ["getTasks"],
    queryFn: () => getTasks(),
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={css.container}>
      <TasksUpperPart />

      {data && data.length === 0 ? (
        <TasksBottomPart />
      ) : (
        <TasksList task={data} />
      )}
    </div>
  );
};

export default TaskReminderCard;

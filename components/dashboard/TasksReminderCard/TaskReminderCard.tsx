"use client";

import css from "./TaskReminderCard.module.css";
import TasksUpperPart from "./TasksUpperPart/TasksUpperPart";
import TasksBottomPart from "./TasksBottomPart/TasksBottomPart";
import TasksList from "./TasksList/TasksList";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasksApi";

const TaskReminderCard = () => {
  const { data } = useQuery({
    queryKey: ["getTasks"],
    queryFn: () => getTasks(),
  });

  return (
    <div className={css.container}>
      <TasksUpperPart />

      {(data && data.length === 0) || !data ? (
        <TasksBottomPart />
      ) : (
        <TasksList task={data} />
      )}
    </div>
  );
};

export default TaskReminderCard;

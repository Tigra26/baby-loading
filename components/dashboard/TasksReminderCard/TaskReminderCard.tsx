"use client";

import css from "./TaskReminderCard.module.css";
import TasksUpperPart from "./TasksUpperPart/TasksUpperPart";
import TasksBottomPart from "./TasksBottomPart/TasksBottomPart";
import TasksList from "./TasksList/TasksList";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasksApi";
import { useAuthStore } from "@/lib/store/authStore";

const TaskReminderCard = () => {
  const user = useAuthStore((state) => state.user);

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
    enabled: !!user,
  });

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

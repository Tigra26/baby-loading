"use client";

import css from "./TaskReminderCard.module.css";
import TasksUpperPart from "./TasksUpperPart/TasksUpperPart";
import TasksBottomPart from "./TasksBottomPart/TasksBottomPart";
import TasksList from "./TasksList/TasksList";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasksApi";

type Props = { className?: string };

const TaskReminderCard = ({ className }: Props) => {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  return (
    <div
      className={className ? `${css.container} ${className}` : css.container}
    >
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

"use client";

import { Task } from "@/types/task";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";

import css from "./TasksList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/lib/api/tasksApi";

interface TasksListProps {
  task: Task[] | undefined;
}

const TasksList = ({ task }: TasksListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTasks"],
      });
    },
  });

  const handleStatusChange = (task: Task) => {
    mutation.mutate({
      taskId: task._id,
      isDone: !task.isDone,
    });
  };

  return (
    <ul className={css.list}>
      {task &&
        task.map((task) => (
          <li key={task._id}>
            <p className={css.date}>
              {task.date.split("-").reverse().slice(0, 2).join(".")}
            </p>

            <label className={css.task}>
              <input
                className={css.checkboxInput}
                type="checkbox"
                checked={task.isDone}
                disabled={mutation.isPending}
                onChange={() => handleStatusChange(task)}
              />

              <span className={css.checkbox}>
                <SvgIcon name="checkbox" size={13} className={css.icon} />
              </span>

              <p className={css.name}>{task.name}</p>
            </label>
          </li>
        ))}
    </ul>
  );
};

export default TasksList;

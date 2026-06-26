import { Task } from "@/types/task";

import css from "./TasksList.module.css";

interface TasksListProps {
  task: Task[];
}

const TasksList = ({ task }: TasksListProps) => {
  return (
    <ul className={css.list}>
      {task.map((task) => (
        <li key={task._id}>
          <p className={css.date}>
            {task.date.split("-").reverse().slice(0, 2).join(".")}
          </p>

          <div className={css.task}>
            <input className={css.checkbox} type="checkbox" />
            <p className={css.name}>{task.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;

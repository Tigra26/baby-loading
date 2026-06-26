import css from "./TaskReminderCard.module.css";
import TasksUpperPart from "./TasksUpperPart/TasksUpperPart";
import TasksBottomPart from "./TasksBottomPart/TasksBottomPart";
import { serverGetTasks } from "@/lib/api/serverApi";
import TasksList from "./TasksList/TasksList";

const TaskReminderCard = async () => {
  const getTasks = await serverGetTasks();

  return (
    <div className={css.container}>
      <TasksUpperPart />

      {getTasks.tasks.length === 0 ? (
        <TasksBottomPart />
      ) : (
        <TasksList task={getTasks.tasks} />
      )}
    </div>
  );
};

export default TaskReminderCard;

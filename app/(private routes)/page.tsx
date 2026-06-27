import TaskReminderCard from "@/components/dashboard/TasksReminderCard/TaskReminderCard";
import DashboardClient from "./DashboardClient";
const HomePage = () => {
  return (
    <>
      <DashboardClient />
      <TaskReminderCard />
    </>
  );
};

export default HomePage;

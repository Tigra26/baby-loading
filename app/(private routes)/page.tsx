import TaskReminderCard from "@/components/dashboard/TasksReminderCard/TaskReminderCard";
import DashboardClient from "./DashboardClient";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-4 pl-5 pr-5">
        <DashboardClient />

        <div className="flex flex-col gap-8">
          <TaskReminderCard />

          <FeelingCheckCard />
        </div>
      </div>
    </>
  );
};

export default HomePage;

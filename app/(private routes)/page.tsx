import TaskReminderCard from "@/components/dashboard/TasksReminderCard/TaskReminderCard";
import DashboardClient from "./DashboardClient";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col pl-5 pr-5 ">
        <GreetingBlock />

        <div className="flex flex-col gap-8 min-[1440px]:flex-row">
          <DashboardClient />

          <div className="flex flex-col gap-8">
            <TaskReminderCard />

            <FeelingCheckCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

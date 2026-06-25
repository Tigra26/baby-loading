import { Task } from "@/types/diary";

interface DiaryEntryCardProps {
  task: Task;
}

const DiaryEntryCard = ({ task }: DiaryEntryCardProps) => {
  return (
    <>
      <div>
        <h3>{task.title}</h3>
        <p>{task.date}</p>
        <div>
          {task.emotions.map((emotion) => (
            <p key={emotion._id}>{emotion.title}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default DiaryEntryCard;

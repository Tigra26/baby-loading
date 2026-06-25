import { DiaryProps } from "@/types/diary";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";

interface DiaryListProps {
  diary: DiaryProps;
}

const DiaryList = ({ diary }: DiaryListProps) => {
  return (
    <>
      <div>
        <h2>Ваші записи</h2>
        <div>
          <p>Новий запис</p>
          <button type="submit">+</button>
        </div>
        <ul>
          {diary.tasks.map((task) => (
            <li key={task._id}>
              <DiaryEntryCard task={task} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DiaryList;

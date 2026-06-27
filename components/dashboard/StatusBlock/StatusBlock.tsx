import css from "./StatusBlock.module.css";

interface StatusBlockProps {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
}

const StatusBlock = ({
  curWeekToPregnant,
  daysBeforePregnant,
}: StatusBlockProps) => {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <h3 className={css.header}>Тиждень</h3>
        <p className={css.descr}>{curWeekToPregnant}</p>
      </li>
      <li className={css.item}>
        <h3 className={css.header}>Днів до зустрічі</h3>
        <p className={css.descr}>~{daysBeforePregnant}</p>
      </li>
    </ul>
  );
};

export default StatusBlock;

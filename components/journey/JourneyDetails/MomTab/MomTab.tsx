import { WeekMom } from "@/types/journey";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import { getComfortIcon } from "@/lib/utils/comfortTipIcon";
import TaskReminderCard from "@/components/dashboard/TasksReminderCard/TaskReminderCard";
import css from "./MomTab.module.css";

type Props = { data: WeekMom };

export default function MomTab({ data }: Props) {
  return (
    <div className={css.container}>
      <div className={css.card}>
        <div className={css.innerBlock}>
          <h2 className={css.title}>Як ви можете почуватись</h2>
          <div className={css.chips}>
            {data.feelings.states.map((state) => (
              <span key={state} className={css.chip}>
                {state}
              </span>
            ))}
          </div>
          <p className={css.descr}>{data.feelings.sensationDescr}</p>
        </div>
      </div>

      <div className={css.card}>
        <h2 className={css.title}>Поради для вашого комфорту</h2>
        <div className={css.tipsRows}>
          {data.comfortTips.map((t, i) => (
            <div key={i} className={css.tipRow}>
              <SvgIcon name={getComfortIcon(t.category)} size={24} />
              <div className={css.tipRight}>
                <p className={css.tipCategory}>{t.category}</p>
                <p className={css.tipText}>{t.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TaskReminderCard className={css.taskCard} />
    </div>
  );
}

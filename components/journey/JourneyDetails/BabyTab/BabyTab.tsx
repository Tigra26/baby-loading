import Image from "next/image";
import { WeekBaby } from "@/types/journey";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import css from "./BabyTab.module.css";

type Props = { data: WeekBaby };

export default function BabyTab({ data }: Props) {
  return (
    <div className={css.card}>
      <div className={css.group}>
        <div className={css.imageWrapper}>
          <Image
            src={data.image}
            alt={data.analogy}
            fill
            sizes="(max-width:768px) 100vw, 700px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className={css.analogy}>{data.analogy}</p>
      </div>
      <div className={css.group}>
        <div className={css.descriptions}>
          {data.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className={css.factBox}>
          <div className={css.factHeader}>
            <SvgIcon name="star" size={24} />
            <span className={css.factTitle}>Цікавий факт тижня</span>
          </div>
          <p className={css.factText}>{data.interestingFact}</p>
        </div>
      </div>
    </div>
  );
}

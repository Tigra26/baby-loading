import Image from "next/image";
import { BabyToday } from "@/types/dashboard";
import css from "./BabyTodayCard.module.css";

interface BabyTodayCardProps {
  babyToday: BabyToday;
}

const BabyTodayCard = ({ babyToday }: BabyTodayCardProps) => {
  const { image, babyDevelopment, babyWeight, babySize, babyActivity } =
    babyToday;

  return (
    <div className={css.container}>
      <h2 className={css.header}>Малюк сьогодні</h2>
      <div className={css.imgListContainer}>
        <Image
          className={css.img}
          src={image}
          alt={babyDevelopment}
          width={287}
          height={216}
        />
        <ul className={css.list}>
          <li className={css.item}>
            <p className={css.listDescr}>
              {" "}
              <span className={css.listSpan}>Розмір: </span>
              Приблизно {babySize}см
            </p>
          </li>
          <li className={css.item}>
            <p className={css.listDescr}>
              {" "}
              <span className={css.listSpan}>Вага: </span>
              Близько {babyWeight} грамів
            </p>
          </li>
          <li className={css.item}>
            <p className={css.listDescr}>
              {" "}
              <span className={css.listSpan}>Активність: </span>
              {babyActivity}
            </p>
          </li>
        </ul>
      </div>
      <p className={css.cardDescr}>{babyDevelopment}</p>
    </div>
  );
};

export default BabyTodayCard;

import Link from "next/link";
import css from "./not-found.module.css";

const NotFound = () => {
  return (
    <main className={css.page}>
      <div className={css.card}>
        <p className={css.code}>404</p>

        <h1 className={css.title}>Сторінку не знайдено</h1>

        <p className={css.text}>
          Схоже, ця сторінка загубилася дорогою. Але Лелека допоможе повернутися
          назад.
        </p>

        <Link href="/" className={css.link}>
          Повернутися на головну
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

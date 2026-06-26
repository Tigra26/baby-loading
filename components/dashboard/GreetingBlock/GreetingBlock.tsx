"use client";

import css from "./GreetingBlock.module.css";
import { useAuthStore } from "@/lib/store/authStore";

const GreetingBlock = () => {
  const name = useAuthStore((state) => state.user?.name);

  const hour = new Date().getHours();
  let greeting = "Доброго вечора";
  if (hour >= 5 && hour < 12) {
    greeting = "Доброго ранку";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Доброго дня";
  }

  return (
    <h1 className={css.greeting}>
      {greeting}, {name ?? "майбутня мама"}!
    </h1>
  );
};

export default GreetingBlock;

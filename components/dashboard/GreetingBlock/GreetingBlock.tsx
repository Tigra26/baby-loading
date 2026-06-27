"use client";
import css from "./GreetingBlock.module.css";

import { useAuthStore } from "@/lib/store/authStore";

const GreetingBlock = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <h1 className={css.greating}>Вітаю{user?.name ? `, ${user.name}` : ""}!</h1>
  );
};

export default GreetingBlock;

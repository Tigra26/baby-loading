"use client";

import { useEffect, useState } from "react";
import css from "./GreetingBlock.module.css";
import { useAuthStore } from "@/lib/store/authStore";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Доброго ранку";
  if (hour >= 12 && hour < 18) return "Доброго дня";

  return "Доброго вечора";
};

const GreetingBlock = () => {
  const name = useAuthStore((state) => state.user?.name);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  if (!greeting) {
    return null;
  }

  return (
    <h1 className={css.greeting}>
      {greeting}, {name ?? "майбутня мама"}!
    </h1>
  );
};

export default GreetingBlock;

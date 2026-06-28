"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function BodyTheme() {
  const gender = useAuthStore((state) => state.user?.babyGender);

  useEffect(() => {
    document.body.classList.remove("boy", "girl", "unknown");

    if (gender) {
      document.body.classList.add(gender);
    }
  }, [gender]);

  return null;
}

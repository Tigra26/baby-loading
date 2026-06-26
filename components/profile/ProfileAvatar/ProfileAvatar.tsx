"use client";

import { useRef } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "@/lib/store/authStore";
import { updateAvatar } from "@/lib/api/userApi";
import styles from "./ProfileAvatar.module.css";

export const ProfileAvatar = () => {
  const { user, updateUserFields } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (updatedUser) => {
      updateUserFields({ avatarUrl: updatedUser.avatarUrl });
      toast.success("Аватар успішно оновлено!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("Файл занадто великий. Максимальний розмір — 1 МБ");
      return;
    }

    mutation.mutate(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.avatarSection}>
      <div className={styles.avatarWrapper}>
        <Image
          src={user?.avatarUrl || "/images/common/women-default-avatar.jpg"}
          alt={user?.name || "User Avatar"}
          fill
          className={styles.avatar}
          priority
          unoptimized
        />
      </div>

      <div className={styles.userInfo}>
        <h2 className={styles.userName}>{user?.name || ""}</h2>
        <p className={styles.userEmail}>{user?.email || ""}</p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className={styles.hiddenInput}
      />

      <button
        type="button"
        className={styles.uploadBtn}
        onClick={handleButtonClick}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Завантаження..." : "Завантажити нове фото"}
      </button>
    </div>
  );
};

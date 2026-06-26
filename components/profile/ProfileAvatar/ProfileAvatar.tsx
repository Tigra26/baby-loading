"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { uploadImage } from "@/lib/api/userApi";
import { toast } from "react-toastify";
import styles from "./ProfileAvatar.module.css";

type Props = {
  profilePhotoUrl?: string;
};

export const ProfileAvatar = ({ profilePhotoUrl }: Props) => {
  const { user, updateUserFields } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [localPreview, setLocalPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Можно завантажувати лише зображення");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      toast.error("Файл занадто великий. Максимальний розмір — 1 МБ");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);

      const updatedUser = await uploadImage(file);

      updateUserFields(updatedUser);
      toast.success("Фото профілю успішно оновлено!");

      setLocalPreview("");
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        err.response?.data?.message || err.message || "Не вдалося зберегти фото"
      );
      setLocalPreview("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = localPreview || profilePhotoUrl;

  return (
    <div className={styles.avatarSection}>
      <div className={styles.avatarWrapper}>
        {displayImage ? (
          <Image
            src={displayImage}
            alt={user?.name || "User Avatar"}
            fill
            className={styles.avatar}
            priority
            unoptimized
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
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
        disabled={isUploading}
      />

      <button
        type="button"
        className={styles.uploadBtn}
        onClick={handleButtonClick}
        disabled={isUploading}
      >
        {isUploading ? "Збереження..." : "Завантажити нове фото"}
      </button>
    </div>
  );
};

"use client";

import { ProfileAvatar } from "@/components/profile/ProfileAvatar/ProfileAvatar";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm/ProfileEditForm";
import css from "./profilePage.module.css";

const ProfilePage = () => {
  return (
    <main className={`container ${css.profilePageMain}`}>
      <ProfileAvatar />
      <ProfileEditForm />
    </main>
  );
};

export default ProfilePage;

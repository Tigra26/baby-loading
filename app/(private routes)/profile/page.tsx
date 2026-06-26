"use client";

import { ProfileEditForm } from "@/components/profile/ProfileEditForm/ProfileEditForm";
import css from "./profilePage.module.css";

const ProfilePage = () => {
  return (
    <main className={`container ${css.profilePageMain}`}>
      <ProfileEditForm />
    </main>
  );
};

export default ProfilePage;

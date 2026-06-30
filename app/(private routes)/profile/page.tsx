"use client";

import { ProfileEditForm } from "@/components/profile/ProfileEditForm/ProfileEditForm";
import css from "./profilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/userApi";
import { useEffect } from "react";

const ProfilePage = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,

    retry: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <main className={css.profilePageMain}>
      <ProfileEditForm />
    </main>
  );
};

export default ProfilePage;

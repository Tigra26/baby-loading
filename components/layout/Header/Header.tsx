"use client";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import css from "./Header.module.css";
import Logo from "@/components/shared/Logo/Logo";
import { useSideBarStore } from "@/lib/store/sideBarStore";

export default function Header() {
  const { openSideBar } = useSideBarStore();
  const handleOnButtonOpenSideBar = () => {
    openSideBar();
  };
  return (
    <header className={css.header}>
      <div className={"container " + css.headerContainer}>
        <Logo />

        <button
          type="button"
          className={css.menuButton}
          onClick={handleOnButtonOpenSideBar}
        >
          <SvgIcon name="menu" />
        </button>
      </div>
    </header>
  );
}

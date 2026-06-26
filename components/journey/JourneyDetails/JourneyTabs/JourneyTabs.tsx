"use client";

import css from "./JourneyTabs.module.css";

type Props = {
  activeTab: "baby" | "mom";
  onChange: (tab: "baby" | "mom") => void;
};

export default function JourneyTabs({ activeTab, onChange }: Props) {
  return (
    <div className={css.container}>
      <button
        type="button"
        className={`${css.tab}${activeTab === "baby" ? ` ${css.active}` : ""}`}
        aria-pressed={activeTab === "baby"}
        onClick={() => onChange("baby")}
      >
        Розвиток малюка
      </button>
      <button
        type="button"
        className={`${css.tab}${activeTab === "mom" ? ` ${css.active}` : ""}`}
        aria-pressed={activeTab === "mom"}
        onClick={() => onChange("mom")}
      >
        Тіло мами
      </button>
    </div>
  );
}

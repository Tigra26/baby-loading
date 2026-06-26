"use client";

import { MoonLoader, PulseLoader } from "react-spinners";
import css from "./Loader.module.css";

type LoaderVariant = "global" | "private";

type LoaderProps = {
  text?: string;
  variant?: LoaderVariant;
};

const Loader = ({
  text = "Завантажуємо...",
  variant = "global",
}: LoaderProps) => {
  const isPrivate = variant === "private";

  return (
    <div
      className={`${css.loaderWrapper} ${
        isPrivate ? css.privateWrapper : css.globalWrapper
      }`}
      role="status"
      aria-live="polite"
    >
      <div className={isPrivate ? css.privateLoaderBox : css.globalLoaderBox}>
        {isPrivate ? (
          <PulseLoader
            color="var(--color-scheme-accent)"
            size={10}
            speedMultiplier={0.8}
            aria-label="Завантаження"
          />
        ) : (
          <MoonLoader
            color="var(--color-scheme-accent)"
            size={38}
            speedMultiplier={0.8}
            aria-label="Завантаження"
          />
        )}
      </div>

      <p className={css.text}>{text}</p>
    </div>
  );
};

export default Loader;

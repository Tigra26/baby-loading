"use client";

import { useState } from "react";
import { useField } from "formik";
import { Emotion } from "@/types/diary";
import css from "./EmotionSelect.module.css";
import { SvgIcon } from "../../shared/SvgIcon/SvgIcon";

interface EmotionSelectProps {
  emotions: Emotion[];
}

export default function EmotionSelect({ emotions }: EmotionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [field, , helpers] = useField<string[]>("emotions");

  const toggleEmotion = (id: string) => {
    if (field.value.includes(id)) {
      helpers.setValue(field.value.filter((item) => item !== id));
    } else {
      helpers.setValue([...field.value, id]);
    }
  };

  const emotionsMap = Object.fromEntries(
    emotions.map((emotion) => [emotion._id, emotion.title])
  );

  return (
    <div className={css.select}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${css.trigger} ${isOpen ? css.open : ""}`}
        aria-expanded={isOpen}
      >
        {field.value.length === 0 ? (
          <span>Оберіть категорію</span>
        ) : (
          <div className={css.tags}>
            {field.value.map((id) => (
              <span key={id} className={css.tag}>
                {emotionsMap[id]}
              </span>
            ))}
          </div>
        )}
        <SvgIcon
          name={isOpen ? "arrowUp" : "arrowDown"}
          size={24}
          className={css.arrow}
        />
      </button>

      {isOpen && (
        <div className={css.dropdown}>
          {emotions.map((emotion) => (
            <label key={emotion._id} className={css.option}>
              <input
                type="checkbox"
                checked={field.value.includes(emotion._id)}
                onChange={() => toggleEmotion(emotion._id)}
                className={css.checkbox}
              />
              <span className={css.checkmark}>
                {field.value.includes(emotion._id) && (
                  <SvgIcon name="checkbox" size={13} className={css.icon} />
                )}
              </span>
              <span className={css.optionTitle}>{emotion.title}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

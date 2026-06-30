"use client";

import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { uk } from "date-fns/locale/uk";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import css from "./CustomDatePicker.module.css";
import ArrowDownIcon from "@/assets/icons/keyboard_arrow_down.svg";

registerLocale("uk", uk);

type CustomDatePickerProps = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  id?: string;
  className?: string;
  error?: boolean;
  showIcon?: boolean;
  minDate?: Date;
};

export const CustomDatePicker = ({
  selected,
  onChange,
  placeholderText = "Оберіть дату",
  id,
  className = "",
  error = false,
  showIcon = true,
  minDate,
}: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ignoreClass = "ignore-datepicker-toggle-click";

  const handleToggleCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={css.datePickerContainer}>
      <DatePicker
        selected={selected}
        onChange={(date: Date | null) => {
          onChange(date);
          setIsOpen(false);
        }}
        minDate={minDate}
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholderText}
        id={id}
        autoComplete="off"
        locale="uk"
        className={`${css.input} ${error ? css.inputError : ""} ${className}`}
        open={isOpen}
        onInputClick={() => setIsOpen(true)}
        onClickOutside={() => setIsOpen(false)}
        focusSelectedMonth={false}
        outsideClickIgnoreClass={ignoreClass}
        showPopperArrow={false}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => {
          const monthYearString = format(date, "LLLL yyyy", { locale: uk });

          return (
            <div className={css.customHeader}>
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className={css.headerBtn}
                aria-label="Попередній місяць"
              >
                <span className={css.arrowLeft}></span>
              </button>

              <span className={css.headerTitle}>{monthYearString}</span>

              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className={css.headerBtn}
                aria-label="Наступний місяць"
              >
                <span className={css.arrowRight}></span>
              </button>
            </div>
          );
        }}
      />

      {showIcon && (
        <div
          className={`${css.iconWrapper} ${isOpen ? css.active : ""} ${ignoreClass}`}
          onClick={handleToggleCalendar}
        >
          <ArrowDownIcon className={css.selectIcon} />
        </div>
      )}
    </div>
  );
};

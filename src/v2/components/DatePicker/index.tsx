import React from "react";
import { Calendar } from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import arabic from "react-date-object/calendars/arabic";
import { arabic_ar, gregorian_ar } from "./customLocales";
import TextInput, { DGA_TextInputProps } from "../TextInput";
import Menu from "../Menu";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import rightIcon from "./right.png";
import leftIcon from "./left.png";

type Props = {
  hijri?: boolean;
  range?: boolean;
  minYear?: number;
  maxYear?: number;
  onChange?: (dateObject: DateObject) => void;
  onRangeChange?: (datesObject: DateObject[]) => void;
  value?: DateObject | DateObject[];
  withTextInput?: boolean;
  textInputProps?: DGA_TextInputProps;
  closeOnSelect?: boolean;
  rangeSeparator?: string;
  minDate?: DateObject;
  maxDate?: DateObject;
};

const DatePicker: React.FC<Props> = ({
  hijri = false,
  range = false,
  minYear,
  maxYear,
  minDate,
  maxDate,
  onChange,
  onRangeChange,
  value,
  withTextInput = true,
  textInputProps,
  closeOnSelect = true,
  rangeSeparator = " - ",
}) => {
  const theme = useTheme();
  const [date, setDate] = React.useState<DateObject | DateObject[]>();
  const [dateText, setDateText] = React.useState("");
  const [yearsList, setYearsList] = React.useState<number[]>([]);
  const [yearDisplayValue, setYearDisplayValue] = React.useState(0);
  const calendarRef = React.useRef();

  const isRangeAndOnlyOneSelected =
    range && Array.isArray(date) && date.length === 1;

  const onChangeHandler = (date: DateObject) => {
    setDate(date);

    if (range && onRangeChange && Array.isArray(date)) {
      onRangeChange(date);
    } else {
      date && onChange && onChange(date);
    }

    if (closeOnSelect) {
      if (range && Array.isArray(date) && date.length > 1) {
        document.body.click();
      } else if (!range) {
        document.body.click();
      }
    }
  };

  const onYearChangedDropdown = (v: number) => {
    setDate(undefined);
    (calendarRef?.current as any)?.set("year", v);
    setYearDisplayValue(v);
  };

  React.useEffect(() => {
    let minYearDefault = 0;
    let maxYearDefault = 0;
    if (hijri) {
      minYearDefault = minDate ? minDate.year : minYear || 1300;
      maxYearDefault = maxDate ? maxDate.year : maxYear || 1500;
    } else {
      minYearDefault = minDate ? minDate.year : minYear || 1900;
      maxYearDefault = (maxDate ? maxDate.year : maxYear || 2100) + 1;
    }

    let newYearsList: number[] = [];

    // If invalid range
    if (minYearDefault >= maxYearDefault) {
      newYearsList = Array(200)
        .fill(0)
        .map((_, index) => index + 1900);
      setYearsList(newYearsList);
      return;
    }

    if (minYearDefault && maxYearDefault) {
      newYearsList = Array(maxYearDefault - minYearDefault)
        .fill(0)
        .map((_, index) => index + minYearDefault);
    } else if (minYearDefault && !maxYearDefault) {
      newYearsList = Array(200)
        .fill(0)
        .map((_, index) => index + minYearDefault);
    } else if (!minYearDefault && maxYearDefault) {
      newYearsList = Array(200)
        .fill(0)
        .map((_, index) => index + (hijri ? 1300 : 1900));
    } else {
      if (hijri) {
        newYearsList = Array(200)
          .fill(0)
          .map((_, index) => index + 1300);
      } else {
        newYearsList = Array(200)
          .fill(0)
          .map((_, index) => index + 1900);
      }
    }
    setYearsList(newYearsList);
  }, [minYear, maxYear, minDate, maxDate, hijri]);

  React.useEffect(() => {
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth() + 1;

    if (hijri) {
      setYearDisplayValue(gregoreanYearToHijriYear(thisYear, thisMonth));
    } else {
      setYearDisplayValue(thisYear);
    }
  }, [hijri]);

  React.useEffect(() => {
    if (!range) {
      setDate(undefined);
    }
  }, [range]);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  React.useEffect(() => {
    let newDateText = "";
    if (range && Array.isArray(date) && date.length === 2) {
      newDateText = `${formatDate(date[0])}${rangeSeparator}${formatDate(
        date[1]
      )}`;
    } else if (date && !Array.isArray(date)) {
      newDateText = formatDate(date);
    }
    setDateText(newDateText);
  }, [date, range]);

  const calendar = (
    <Calendar
      ref={calendarRef}
      value={value || date}
      range={range}
      calendar={hijri ? arabic : gregorian}
      onMonthChange={(e) => setYearDisplayValue(e.year)}
      // When overriding the default locale using spread operator "..." then override only digits, we faced an issue when value is set.
      // And when overriding the locale using object it works fine, so we used the object to override the locale.
      locale={
        hijri ? arabic_ar : theme.direction === "rtl" ? gregorian_ar : undefined
      }
      weekStartDayIndex={hijri ? 1 : 0} // As arabic calendar starts in Saturday and I want to unify the start day to be in Sunday
      weekDays={
        hijri
          ? ["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"]
          : theme.direction === "rtl"
          ? ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"]
          : undefined
      }
      onChange={onChangeHandler}
      format="YYYY/MM/DD"
      showOtherDays
      monthYearSeparator=" "
      minDate={minDate}
      maxDate={maxDate}
    >
      <div className="yearsSelect">
        <select
          value={yearDisplayValue}
          onChange={(e) => onYearChangedDropdown(+e.target.value)}
        >
          {yearsList.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
    </Calendar>
  );

  return (
    <StyledComponent
      className={
        "dgaui" + (isRangeAndOnlyOneSelected ? " rangeOnlyOneSelected" : "")
      }
      $theme={theme}
    >
      {!withTextInput && calendar}
      {withTextInput && (
        <Menu menuItems={calendar} keepOpenOnItemsClicked>
          <TextInput
            value={textInputProps?.value || dateText}
            readOnly
            {...textInputProps}
          />
        </Menu>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{ $theme: Theme }>`
  .rmdp-top-class {
    width: 424px;
    display: block !important;

    .rmdp-calendar {
      padding: 16px;
    }

    .rmdp-day-picker {
      padding: 0;
      display: block !important;
    }
  }

  .rmdp-header {
    margin: 0;
    div:first-child {
      button {
        width: 40px;
        height: 40px;
        &:hover {
          background-color: ${(p) => p.$theme.palette.neutral[100]} !important;
        }
        &:active {
          background-color: ${(p) => p.$theme.palette.neutral[200]} !important;
        }

        i {
          display: none;
        }
      }

      .rmdp-right {
        background-image: url(${rightIcon});
        background-repeat: no-repeat;
      }
      .rmdp-left {
        position: absolute;
        inset-inline-end: 48px;
        inset-inline-start: auto;
        background-image: url(${leftIcon});
        background-repeat: no-repeat;
      }
      .rmdp-header-values {
        flex: 1;
        font-size: 16px !important;
        font-weight: 500;
        display: flex;
        justify-content: flex-start;
        margin: 0;

        span:last-child {
          visibility: hidden;
        }
      }
    }
  }

  .rmdp-week-day {
    width: 56px;
    height: 48px;
    font-size: 16px !important;
    color: ${(p) => p.$theme.palette.neutral[500]};
  }

  .rmdp-day {
    margin: 0;
    box-sizing: border-box;
    border: 2px solid transparent;
    width: 56px;
    height: 56px;

    span {
      font-size: 16px !important;
    }

    &.rmdp-deactive {
      color: ${(p) => p.$theme.palette.neutral[400]} !important;
    }

    &:hover span {
      background-color: ${(p) => p.$theme.palette.neutral[200]} !important;
      color: ${(p) => p.$theme.textColor};
    }
    &:active span {
      background-color: ${(p) => p.$theme.palette.neutral[300]} !important;
    }

    &:focus {
      border: 2px solid ${(p) => p.$theme.textColor} !important;
      border-radius: 6px !important;
    }

    &.rmdp-selected {
      span {
        background-color: ${(p) => p.$theme.palette.primary[600]} !important;
        color: #fff !important;
      }
      &:hover {
        span {
          background-color: ${(p) => p.$theme.palette.primary[700]} !important;
          color: #fff !important;
        }
      }
      &:active {
        span {
          background-color: ${(p) => p.$theme.palette.primary[900]} !important;
          color: #fff !important;
        }
      }
    }
  }
  .rmdp-week {
    .rmdp-day {
      &.rmdp-disabled {
        pointer-events: none;
      }
    }
  }
  .rmdp-today {
    &:hover {
      background-color: transparent !important;
      span {
        background-color: transparent !important;
        color: ${(p) => p.$theme.palette.primary[600]} !important;
      }
    }

    span {
      box-shadow: none;
      background-color: transparent !important;
      border: 2px solid ${(p) => p.$theme.palette.primary[600]} !important;
      color: ${(p) => p.$theme.palette.primary[600]} !important;
      font-weight: 700 !important;

      &:hover {
        background-color: ${(p) => p.$theme.palette.primary[100]} !important;
        color: ${(p) => p.$theme.palette.primary[600]} !important;
      }
      &:active {
        background-color: ${(p) => p.$theme.palette.primary[200]} !important;
        color: ${(p) => p.$theme.palette.primary[600]} !important;
      }
    }
  }

  .rmdp-range {
    box-shadow: none;
    position: relative;

    background-color: transparent;
    color: ${(p) => p.$theme.textColor} !important;

    &:hover,
    &:hover span {
      background-color: transparent !important;
    }

    &::before {
      background-color: ${(p) => p.$theme.palette.primary[100]} !important;
      content: "";
      display: block;
      position: absolute;
      width: 108%;
      height: 92%;
      z-index: -1;
      top: 2px;
      inset-inline-end: -6px;
    }

    &.start {
      span {
        background-color: transparent;
        background-color: ${(p) => p.$theme.palette.primary[600]} !important;
        color: #fff;
      }
      border-bottom-left-radius: unset !important;
      border-top-left-radius: unset !important;
      border-radius: 50% !important;

      &::before {
        background-color: ${(p) => p.$theme.palette.primary[100]} !important;
        border-start-start-radius: 50%;
        border-end-start-radius: 50%;
        content: "";
        display: block;
        position: absolute;
        width: 107%;
        height: 92%;
        z-index: -1;
        top: 2px;
        inset-inline-end: -6px;
      }
    }
    &.end {
      span {
        background-color: ${(p) => p.$theme.palette.primary[600]} !important;
        color: #fff;
      }

      border-bottom-left-radius: unset !important;
      border-top-left-radius: unset !important;
      border-radius: 50% !important;

      &::before {
        background-color: ${(p) => p.$theme.palette.primary[100]} !important;
        border-start-end-radius: 50%;
        border-end-end-radius: 50%;
        content: "";
        display: block;
        position: absolute;
        width: 107%;
        height: 92%;
        z-index: -1;
        top: 2px;
        inset-inline-start: -6px;
      }
      &.start {
        &::before {
          display: none;
        }
      }
    }
  }

  &.rangeOnlyOneSelected {
    .rmdp-range {
      &::before {
        display: none;
      }
    }
  }

  .rmdp-shadow {
    ${(p) => p.$theme.elevation.shadows["2xl"]}
  }

  .yearsSelect {
    position: absolute;
    top: 28px;
    left: 120px;
    z-index: 0;
    display: flex;
    justify-content: flex-start;

    select {
      outline: none;
      border: none;
      margin-top: 6px;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .rmdp-rtl {
    .rmdp-header {
      div:first-child {
        .rmdp-right {
          background-image: url(${leftIcon});
          background-repeat: no-repeat;
        }
        .rmdp-left {
          background-image: url(${rightIcon});
          background-repeat: no-repeat;
        }
      }
    }
  }

  .rmdp-wrapper {
    position: relative;
  }

  &:has(.rmdp-rtl) {
    .yearsSelect {
      left: auto;
      right: 110px;
    }
  }

  .menueItemsContainer {
    max-height: unset;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    .rmdp-wrapper {
      width: 100%;
    }
    .rmdp-top-class .rmdp-calendar {
      padding: 0;
    }
    .rmdp-top-class {
      width: 100%;
    }
    .rmdp-day {
      width: 40px;
      height: 40px;
    }
    .rmdp-day {
      span {
        font-size: 14px !important;
      }
    }
    .yearsSelect {
      top: 10px;
    }
  }
`;

export default DatePicker;

function gregoreanYearToHijriYear(
  gregorianYear: number,
  gregorianMonth: number
) {
  // Subtract 622 from the Gregorian year, then divide by 0.970224
  let hijriYear = (gregorianYear - 622) / 0.970224;

  // If the month is after roughly October (when the Hijri year might have turned), add 1 year to the result
  if (gregorianMonth >= 9) {
    hijriYear += 1;
  }

  return Math.floor(hijriYear); // Round down to get the whole Hijri year
}

const padStartZero = (text: number | string) =>
  text?.toString().padStart(2, "0");

const formatDate = (date: DateObject) => {
  return `${padStartZero(date.day)}/${padStartZero(date.month.number)}/${
    date.year
  }`;
};

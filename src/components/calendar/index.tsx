import { CSSProperties, ReactNode, useState } from "react";
import cs from "classnames";
import dayjs, { Dayjs, locale } from "dayjs";
import MonthCalendar from "./MonthCaledndar.tsx/MonthCalendar";
import Header from "./Header/Header";
import LocaleContext from "./LocaleContext";

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  dateRender?: (currentDate: Dayjs) => ReactNode; // 定制日期显示内容（会完全覆盖单元格）
  dateInnerContent?: (currentDate: Dayjs) => ReactNode; // 定制日期单元格，在日期数字下加一些内容
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

const Calendar = (props: CalendarProps) => {
  const { value, style, className, locale, onChange } = props;

  const [curDate, setCurDate] = useState<Dayjs>(value);
  const [curMonth, setCurMonth] = useState<Dayjs>(value);

  // 合并类名
  const classNames = cs("calendar", className);

  const handleSeclectDate = (value: Dayjs) => {
    setCurDate(value);
    onChange?.(value);
  };
  const handlePrevMonth = () => {
    setCurMonth(curMonth.subtract(1, "month"));
  };
  const handleNextMonth = () => {
    setCurMonth(curMonth.add(1, "month"));
  };
  const handleToday = () => {
    const date = dayjs(Date.now());

    setCurDate(date);
    setCurMonth(date);
    onChange?.(date);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || navigator.language,
      }}
    >
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          handleToday={handleToday}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
        <MonthCalendar
          {...props}
          value={curDate}
          curMonth={curMonth}
          selectDate={handleSeclectDate}
        />
      </div>
    </LocaleContext.Provider>
  );
};

export default Calendar;

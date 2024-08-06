import { CSSProperties, ReactNode } from "react";
import cs from "classnames";
import { Dayjs } from "dayjs";
import MonthCalendar from "./MonthCaledndar.tsx/MonthCalendar";
import Header from "./Header/Header";

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
  const { value, style, className } = props;

  // 合并类名
  const classNames = cs("calendar", className);

  return (
    <div className={classNames} style={style}>
      <Header />
      <MonthCalendar {...props} />
    </div>
  );
};

export default Calendar;

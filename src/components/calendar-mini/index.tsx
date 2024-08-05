import React, { useImperativeHandle, useState } from "react";
import { useControllableValue } from "ahooks";
import { monthNames } from "./constant";
import "./index.less";

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

export interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const Calendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (
  props,
  ref
) => {
  const { defaultValue = new Date(), onChange } = props;

  // const [date, setDate] = useState(defaultValue);

  // 受控模式
  const [date, setDate] = useControllableValue<Date>(props, {
    defaultValue: new Date(),
  });

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      },
    };
  });

  const handlePreMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    setDate(new Date(year, date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    setDate(new Date(year, date.getMonth() + 1, 1));
  };

  const daysOfMount = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const days = [];

    const daysCount = daysOfMount(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const handleDateClick = () => {
        // 拿到这一年这一月的第i天
        const curDate = new Date(date.getFullYear(), date.getMonth(), i);
        setDate(curDate);
        // onChange是暴露在外面的回调函数，用于通知外部组件日期变更; 如果是受控模式，这里不需要调用onChange
        // onChange && onChange(curDate);
      };
      if (i === date.getDate()) {
        days.push(
          <div
            key={i}
            className="day selected"
            onClick={() => handleDateClick()}
          >
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={() => handleDateClick()}>
            {i}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePreMonth}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;

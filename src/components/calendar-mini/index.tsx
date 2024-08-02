import React, { useState } from "react";
import { monthNames } from "./constant";
import "./index.less";

interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = () => {
  const [date, setDate] = useState(new Date());

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
      days.push(
        <div key={i} className="day">
          {i}
        </div>
      );
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

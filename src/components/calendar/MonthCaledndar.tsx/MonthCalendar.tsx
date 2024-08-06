import { Dayjs } from "dayjs";
import { weekList } from "../constant";
import { CalendarProps } from "../index";
import "./MonthCalendar.less";

interface MonthCaledndarProps extends CalendarProps {}

const getAllDays = (date: Dayjs) => {
  const daysInMonth = date.daysInMonth();
  const startDate = date.startOf("month");
  const day = startDate.day();

  const daysInfo = new Array<{ date: Dayjs; isCurrentMonth: boolean }>(6 * 7);
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      isCurrentMonth: false,
    };
  }
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");
    daysInfo[i] = {
      date: calcDate,
      isCurrentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
};

const renderDays = (
  days: ReturnType<typeof getAllDays>,
  dateRender: MonthCaledndarProps["dateRender"],
  dateInnerContent: MonthCaledndarProps["dateInnerContent"]
) => {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j];
      row[j] = (
        <div
          key={item.date.date().toString()}
          className={
            "calendar-month-body-cell" +
            (item.isCurrentMonth ? "" : " calendar-month-body-cell-not-current")
          }
        >
          {dateRender ? (
            dateRender(item.date)
          ) : (
            <div className="calendar-month-body-cell-date">
              <div className="calendar-month-body-cell-date-value">
                {item.date.date()}
              </div>
              <div className="calendar-month-body-cell-date-content">
                {dateInnerContent?.(item.date)}
              </div>
            </div>
          )}
        </div>
      );
    }
    rows.push(row);
  }

  return rows.map((row, index) => (
    <div key={index} className="calendar-month-body-row">
      {row}
    </div>
  ));
};

const MonthCalendar = (props: MonthCaledndarProps) => {
  const { value, dateRender, dateInnerContent } = props;

  const allDays = getAllDays(value);

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {week}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {/* 日期渲染 */}
        {renderDays(allDays, dateRender, dateInnerContent)}
      </div>
    </div>
  );
};

export default MonthCalendar;

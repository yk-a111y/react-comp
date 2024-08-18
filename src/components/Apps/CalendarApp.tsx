import React, { useRef, useEffect, useState } from "react";
import { CalendarRef } from "@/components/calendar-mini/index";
// import Calendar from "@/components/calendar-mini/index";
import Calendar from "@/components/calendar/index";
import dayjs from "dayjs";

// const CalendarMini = React.forwardRef(Calendar);

function CalendarApp() {
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef<CalendarRef>(null);

  // useEffect(() => {
  // console.log(calendarRef.current?.getDate().toLocaleDateString());

  // 外部调用组件内部方法
  // setTimeout(() => {
  //   calendarRef.current?.setDate(new Date(2024, 3, 1));
  // }, 3000);
  // }, []);

  // const handleDateChange = (value: Date) => {
  //   console.log("🚀 ~ handleDateChange ~ value:", value);
  //   setDate(value);
  // };

  return (
    <div className="App">
      {/* <CalendarMini ref={calendarRef} defaultValue={new Date()} />
      <CalendarMini
        ref={calendarRef}
        value={date}
        onChange={handleDateChange}
      /> */}
      <Calendar value={dayjs("2024-7-13")} locale="en-US" />
    </div>
  );
}

export default CalendarApp;

import React, { useRef, useEffect, useState } from "react";
import { CalendarRef } from "./components/calendar-mini/index";
import Calendar from "@/components/calendar-mini/index";

const CalendarMini = React.forwardRef(Calendar);

function App() {
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());

    // 外部调用组件内部方法
    // setTimeout(() => {
    //   calendarRef.current?.setDate(new Date(2024, 3, 1));
    // }, 3000);
  }, []);

  const handleDateChange = (value: Date) => {
    console.log("🚀 ~ handleDateChange ~ value:", value);
    setDate(value);
  };

  return (
    <div className="App">
      {/* <CalendarMini ref={calendarRef} value={date} /> */}
      <CalendarMini
        ref={calendarRef}
        value={date}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default App;

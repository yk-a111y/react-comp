import React, { useRef, useEffect } from "react";
import { CalendarRef } from "./components/calendar-mini/index";
import Calendar from "@/components/calendar-mini/index";

const CalendarMini = React.forwardRef(Calendar);

function App() {
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());

    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1));
    }, 3000);
  }, []);

  return (
    <div className="App">
      <CalendarMini ref={calendarRef} />
    </div>
  );
}

export default App;

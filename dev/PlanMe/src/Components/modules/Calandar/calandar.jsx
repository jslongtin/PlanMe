import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//ref : https://www.npmjs.com/package/react-calendar
//ref : https://fullcalendar.io/docs/react
function Calendrier() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
export default Calendrier;

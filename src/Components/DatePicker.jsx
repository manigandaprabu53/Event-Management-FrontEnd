import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';

 export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);

  // ... calendar rendering and event handling logic ...

  return (
    <div ref={calendarRef} className="custom-datepicker">
      <Form.Control
        type="date"
        value={selectedDate.toISOString().slice(0, 10)}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
      />
      {/* Calendar elements */}
    </div>
  );
}

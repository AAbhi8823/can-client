import * as React from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ResponsiveDatePickers() {
  const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DemoItem label="">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(props) => <input {...props} />}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
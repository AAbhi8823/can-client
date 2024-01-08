import React, { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'

const SingleLineCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [];

  const startOffset = Math.max(currentDate - 1, 1);
  const endOffset = Math.min(currentDate + 7, daysInMonth);
  const startDate = Math.max(startOffset, );
  const endDate = Math.min(endOffset, daysInMonth);

  // Populate the dates
  for (let i = startDate; i <= endDate; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const day = daysOfWeek[date.getDay()];
    dates.push({ day, date: i });
  }

  const goToPrevDate = () => {
    if (currentDate === 1) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
      setCurrentDate(new Date(currentYear, currentMonth - 1, 0).getDate());
    } else {
      setCurrentDate(currentDate - 1);
    }
  };

  const goToNextDate = () => {
    if (currentDate === daysInMonth) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
      setCurrentDate(1);
    } else {
      setCurrentDate(currentDate + 1);
    }
  };

  return (
    <div className="flex flex-col m-auto p-2  ">
      <div className="flex flex-row w-full items-center justify-between  ">

        <div className="text-[14px] font-bold">
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-500 hover:text-black" onClick={goToPrevDate}>
          <AiOutlineLeft size={15}/>
          </button>

          <button className="text-sm text-gray-500 hover:text-black" onClick={goToNextDate}>
            
            <AiOutlineRight size={15} />
          </button>
        </div>


      </div>

      <div className="flex items-center   mt-6 w-fit">
        {dates.slice(0,7).map((dateObj, index) => (
          <div
            key={index}
            className={`text-center flex flex-col items-center cursor-pointer justify-center rounded-md w-10  h-14 ${dateObj.date === today.getDate() ? 'bg-[#eac83f7b] text-black font-semibold' : ''
              }`}
          >
            <div className="text-[12px] cursor-pointer text-[#7E7E7E] font-semibold">{dateObj.day}</div>
            <div className='text-[12px] cursor-pointer font-semibold text-black'>{dateObj.date === today.getDate() ? today.getDate() : dateObj.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleLineCalendar;

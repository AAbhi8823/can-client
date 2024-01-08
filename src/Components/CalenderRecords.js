import React, { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const CalenderRecords = () => {
    const today = new Date();
    const [new_date,setnew_date]=useState(today.getDate())
    const [currentDate, setCurrentDate] = useState(today.getDate());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = [];
    const navigate=useNavigate()

    const startOffset = Math.max(currentDate - 3, 1);
    const endOffset = Math.min(currentDate + 3, daysInMonth);
    const startDate = Math.max(startOffset, 1);
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
      <div className="flex flex-col items-start space-y-2   justify-center">
        <div className="flex items-center justify-between  ">
          {/* <div className="text-lg font-semibold">
                    {new Date(currentYear, currentMonth).toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </div> */}
        </div>

        <div className="flex items-center  space-x-5 ">
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={goToPrevDate}
          >
            <AiOutlineLeft />
          </button>
          {dates.map((dateObj, index) => (
            <div
              key={index}
              className={`text-center cursor-pointer flex lg:text-[1.3vw]   flex-col justify-center rounded-full w-[50px] md:w-[7vw] lg:w-[7vw] h-[6vh] md:h-[7vh] lg:h-[10vh] ${
                dateObj.date === new_date
                  ? "  bg-[#C31A7F] text-white"
                  : "text-black  bg-[#FDF6FA]"
              }`}
              onClick={() => {
                console.log(
                  dateObj,
                  today.getFullYear() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    dateObj.date
                );
                let dt =
                  dateObj.date.toString().length == 1
                    ? 0 + dateObj.date.toString()
                    : dateObj.date;
                setnew_date(dateObj.date);
                if (window.location.pathname == "/appointment1") {
                  navigate({
                    pathname: "/appointment1",
                    search: `date=${
                      today.getFullYear() +
                      "-" +
                      (today.getMonth() + 1) +
                      "-" +
                      dt
                    }`,
                  });
                } else {
                  navigate({
                    pathname: "/Medicine1",
                    search: `date=${
                      today.getFullYear() +
                      "-" +
                      (today.getMonth() + 1) +
                      "-" +
                      dt
                    }`,
                  });
                }
              }}
            >
              <div className="text-sm">{dateObj.day}</div>
              <div>
                {dateObj.date === today.getDate()
                  ? today.getDate()
                  : dateObj.date}
              </div>
            </div>
          ))}
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={goToNextDate}
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
    );
};

export default CalenderRecords;
import React, { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { baseurl } from '../Api/baseUrl';
import Cookies from "js-cookie";
const VerticalAppointment = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [appointments, setAppointments] = useState([]);
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [];

  const token = Cookies.get("token");

  useEffect(() => {
    // Fetch data from the API
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${baseurl}/appointment/get-next-seven-days-appointments`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log("response::>>>>",response.json())
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("data:>>>>>>>>",data.resData.data);
        setAppointments(data.resData.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [token]);

  const startOffset = Math.max(currentDate, 1);
  const endOffset = Math.min(currentDate + 3, daysInMonth);
  const startDate = Math.max(startOffset, 1);
  const endDate = Math.min(endOffset, daysInMonth);

  // Populate the dates
  for (let i = startDate; i <= endDate; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const day = daysOfWeek[date.getDay()];
    const appointmentForDate = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === i &&
        appointmentDate.getMonth() === currentMonth &&
        appointmentDate.getFullYear() === currentYear
      );
    });
    dates.push({ day, date: i, appointments: appointmentForDate });
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
    <div className="flex flex-col space-y-2 w-[100%] ">
      <div className="flex flex-col justify-between w-[100%] gap-7 ">
        {dates.slice(0, 3).map((dateObj, index) => (
          <div key={index} className={`flex gap-4 rounded-lg w-[100%] h-12`}>
            <div className="text-center w-[20%] mt-2">
              <div className="text-[12px] ml-5 text-[#7E7E7E] font-semibold">{dateObj.day}</div>
              <div className='text-[12px] ml-5 font-semibold text-black'>{dateObj.date === today.getDate() ? today.getDate() : dateObj.date}</div>
            </div>
            <div className={`flex flex-col`}>
              <div className={`pr-14 p-4 h-14 flex items-center rounded-md flex-row gap-2 transition-all duration-500 ${dateObj.date === today.getDate() ? 'text-black bg-[#F5F5F5]' : 'text-black bg-[#F5F5F5]'} `}>
                <div className='font-bold bg-[#C31A7F] h-[40px] w-[3px] inline-block text-[20px]'></div>
                {dateObj.appointments.length > 0 ? dateObj.appointments.map((appointment, index) => (
                  <div key={index} className='flex flex-col gap-1'>
                    <p className='text-[14px] font-bold'>{appointment.title}</p>
                    <div className='flex flex-row items-center text-[12px] text-[#7E7E7E] font-semibold'>
                      <div className='flex flex-row items-center gap-1'>
                        <span>{new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>{new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit' }).includes('AM') ? 'AM' : 'PM'}</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className='text-[14px] font-bold'>No Appointments</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalAppointment;

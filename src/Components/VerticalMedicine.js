import React, { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { baseurl } from '../Api/baseUrl';
import Cookies from "js-cookie";

const VerticalMedicine = () => {
  const today = new Date();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [medicines, setMedicines] = useState([]);
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [];
  const token = Cookies.get("token");

  useEffect(() => {
    fetchMedicines();
  }, []);
  
  const fetchMedicines = async () => {
    try {
      const response = await fetch(`${baseurl}/medicine/get-medicine-next-seven-days`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMedicines(data?.resData?.data || []);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  // Populate the dates for the next seven days
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = daysOfWeek[date.getDay()];
    const medicinesForDate = medicines.flatMap(item => item.medicines).filter(medicine => {
      const medicineStartDate = new Date(medicine.medicine_start_date);
      const medicineStopDate = new Date(medicine.medicine_stop_date);
      return (
        date >= medicineStartDate &&
        date <= medicineStopDate
      );
    });
    dates.push({ day, date: date.getDate(), month: date.getMonth(), year: date.getFullYear(), medicines: medicinesForDate });
  }

  const goToPrevDate = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextDate = () => {
    if (currentIndex < 6) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentDay = dates[currentIndex];

  return (
    <div className="flex flex-col space-y-2 w-[100%]">
      <div className="flex justify-between">
        <AiOutlineLeft onClick={goToPrevDate} />
        <AiOutlineRight onClick={goToNextDate} />
      </div>
      <div className="flex flex-col justify-between w-[100%] gap-7">
        {currentDay.medicines.length > 0 ? currentDay.medicines.map((medicine, index) => (
          <div key={index} className={`flex gap-4 rounded-lg w-[100%] h-12`}>
            <div className="text-center w-[20%] mt-2">
              <div className="text-[12px] ml-5 text-[#7E7E7E] font-semibold">{currentDay.day}</div>
              <div className='text-[12px] ml-5 font-semibold text-black'>{currentDay.date}</div>
            </div>
            <div className={`flex flex-col`}>
              <div className={`pr-14 p-4 h-14 flex items-center rounded-md flex-row gap-2 transition-all duration-500 ${currentDay.date === today.getDate() ? 'text-black bg-[#F5F5F5]' : 'text-black bg-[#F5F5F5]'} `}>
                <div className='font-bold bg-[#C31A7F] h-[40px] w-[3px] inline-block text-[20px]'></div>
                <div className='flex flex-col gap-1'>
                  <p className='text-[14px] font-bold'>{medicine.medicine_name}</p>
                  <div className='flex flex-row items-center text-[12px] text-[#7E7E7E] font-semibold'>
                    <div className='flex flex-row items-center gap-1'>
                      <span>{medicine.time_for_reminder}</span>
                      {/* <span>{medicine.time_for_reminder.includes('AM') ? 'AM' : 'PM'}</span> */}
                    </div>
                    <div className='flex flex-row gap-3 text-[12px]'>
                      <span>  </span>
                      <span>{medicine.medicine_dosage}</span>
                      <span>{medicine.meal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className={`flex gap-4 rounded-lg w-[100%] h-12`}>
            <div className="text-center w-[20%] mt-2">
              <div className="text-[12px] ml-5 text-[#7E7E7E] font-semibold">{currentDay.day}</div>
              <div className='text-[12px] ml-5 font-semibold text-black'>{currentDay.date}</div>
            </div>
            <div className={`flex flex-col`}>
              <div className={`pr-14 p-4 h-14 flex items-center rounded-md flex-row gap-2 transition-all duration-500 ${currentDay.date === today.getDate() ? 'text-black bg-[#F5F5F5]' : 'text-black bg-[#F5F5F5]'} `}>
                <div className='font-bold bg-[#C31A7F] h-[40px] w-[3px] inline-block text-[20px]'></div>
                <p className='text-[14px] font-bold'>No Medicines</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalMedicine;

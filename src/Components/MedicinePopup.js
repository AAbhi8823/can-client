import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Select from 'react-select';
import axios from 'axios';
import Cookies from 'js-cookie';
import apis from '../Api/baseUrl';

const MedicinePopup = ({ toggleMedicine, getMedicines }) => {
  const [validationError, setValidationError] = useState(false);
  const [medicineData, setMedicineData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [medicineCount, setMedicineCount] = useState(1);
  const [reminderTime, setReminderTime] = useState(false);
  const [medicDate, setMedicDate] = useState({ startFrom: '', stopOn: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSelectClicked, setIsSelectClicked] = useState(false);

  const mealOptions = [
    { value: 'Before Breakfast', label: 'Before Breakfast' },
    { value: 'After Breakfast', label: 'After Breakfast' },
    { value: 'Before Lunch', label: 'Before Lunch' },
    { value: 'After Lunch', label: 'After Lunch' },
    { value: 'Before Meal', label: 'Before Meal' },
    { value: 'After Meal', label: 'After Meal' },
  ];

  const validateForm = () => {
    let isValid = true;

    for (let i = 0; i < medicineCount; i++) {
      const medicineName = medicineData[`medicineName${i}`];
      const medicineType = medicineData[`medicine_type${i}`];
      const dose = medicineData[`dose${i}`];
      const unit = medicineData[`unit${i}`];
      const meal = medicineData[`meal${i}`];
      const medicineTime = medicineData[`medicineTime${i}`];

      if (!medicineName || !medicineType || !dose || !unit || !meal || !medicineTime) {
        isValid = false;
        break;
      }
    }

    if (!medicDate.startFrom || !medicDate.stopOn) {
      isValid = false;
    }

    setValidationError(!isValid);
    return isValid;
  };

  const handleSelectClick = () => {
    setIsSelectClicked(true);
  };

  const handleReminder = () => {
    setReminderTime(!reminderTime);
  };

  const convertTo12HourTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hoursNumber = parseInt(hours);
    const period = hoursNumber >= 12 ? 'PM' : 'AM';
    const hours12 = hoursNumber % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const handleAddMedicine = () => {
    setMedicineCount(medicineCount + 1);
  };

  const handleChange = (e, index, select) => {
    if (select) {
      setMedicineData({ ...medicineData, [`meal${index}`]: e.value });
    } else {
      setMedicineData({ ...medicineData, [`${e.target.name}${index}`]: e.target.value });
    }
  };

  const createMedicine = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const creator = localStorage.getItem('active_user');
      const allMedicines = [];
      for (let i = 0; i < medicineCount; i++) {
        const medicine = {
          medicine_name: medicineData[`medicineName${i}`] || '',
          medicine_type: medicineData[`medicine_type${i}`] || '',
          medicine_dosage: medicineData[`dose${i}`] || '',
          unit: medicineData[`unit${i}`] || '',
          meal: medicineData[`meal${i}`] || '',
          isReminderSet: reminderTime,
          time_for_reminder: convertTo12HourTime(medicineData[`medicineTime${i}`]) || '',
          medicine_start_date: medicDate.startFrom,
          medicine_stop_date: medicDate.stopOn,
        };
        allMedicines.push(medicine);
      }
      const token = Cookies.get('token');
      const response = await axios.post(
        `${apis.CREATE_MEDICINE}`,
        {
          creater_Id: creator,
          medicines: allMedicines,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.resData?.status === true) {
        getMedicines();
        toggleMedicine();
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: '#EFC31968',
        color: 'white',
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: '70%',
      zIndex: '20',
    }),
    control: (provided) => ({
      ...provided,
      width: '100%',
      padding: '4px',
      border: '2px solid #D1D5DB',
      borderRadius: '20px',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      position: 'relative',
    }),
    placeholder: (provided, state) => ({
      position: 'absolute',
      left: '3px',
      fontSize: '14px',
      color: '#7C7C7C',
      transform: state.isFocused ? 'translateY(-20px) scale(0)' : 'translateY(0) scale(1)',
      transition: 'transform 0.2s',
      padding: '4px 4px',
    }),
  };

  return (
    <div className="fixed inset-0 flex md:items-center items-start justify-center bg-black bg-opacity-40 z-50 overflow-y-scroll px-5 py-[90px]">
      <div className="flex flex-col bg-white rounded-[40px] lg:md:w-auto w-full max-h-fit px-10">
        <div className="flex flex-row py-4 justify-between items-center w-full">
          <h1 className="text-[22px] font-[500]">Add Medicines</h1>
          <RxCross2 className="lg:md:ml-80 cursor-pointer" onClick={toggleMedicine} />
        </div>
        <div className="flex flex-col">
          <form>
            {[...Array(medicineCount)].map((_, index) => (
              <div key={index}>
                <label className="text-[16px] font-[500]"> Medicine {index + 1} </label>
                <div className="flex sm:flex-row lg:flex-row md:flex-row flex-col py-2 gap-6">
                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="medicineName"
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      onChange={(e) => handleChange(e, index)}
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Medicine {index + 1}
                      </p>
                    </label>
                  </div>
                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="medicine_type"
                      onChange={(e) => handleChange(e, index)}
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Medicine Type
                      </p>
                    </label>
                  </div>
                </div>
                <div className="flex sm:flex-row lg:flex-row md:flex-row flex-col gap-6">
                  <div className="relative z-0 lg:w-1/4 w-full mb-4 group">
                    <input
                      type="text"
                      name="dose"
                      onChange={(e) => handleChange(e, index)}
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Dosage</p>
                    </label>
                  </div>
                  <div className="relative z-0 lg:w-1/4 w-full mb-4 group">
                    <input
                      type="text"
                      name="unit"
                      onChange={(e) => handleChange(e, index)}
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Unit</p>
                    </label>
                  </div>
                  <div className="relative z-0 lg:w-1/4 w-full mb-4 group">
                    <input
                      type="time"
                      name="medicineTime"
                      onChange={(e) => handleChange(e, index)}
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Time</p>
                    </label>
                  </div>
                  <div className="relative z-0 lg:w-1/4 w-full mb-4 group">
                    <Select
                      styles={customStyles}
                      options={mealOptions}
                      name={`meal${index}`}
                      onChange={(e) => handleChange(e, index, true)}
                      placeholder={isSelectClicked ? '' : 'Select an option'}
                      onFocus={handleSelectClick}
                      className="rounded-[20px]"
                    />
                  </div>
                </div>
              </div>
            ))}

            {validationError && (
              <p className="text-sm text-red-600">All fields are required. Please fill out all fields before submitting.</p>
            )}

            <div className="flex flex-row">
              <div className="flex flex-row mt-4 mb-6">
                <input type="checkbox" onChange={handleReminder} />
                <p className="mx-2 text-[16px] font-[500]"> Set Reminder </p>
              </div>
            </div>

            <div className="flex sm:flex-row lg:flex-row md:flex-row flex-col gap-6">
              <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                <input
                  type="date"
                  name="startFrom"
                  onChange={(e) => setMedicDate({ ...medicDate, startFrom: e.target.value })}
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent"> Start From </p>
                </label>
              </div>
              <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                <input
                  type="date"
                  name="stopOn"
                  onChange={(e) => setMedicDate({ ...medicDate, stopOn: e.target.value })}
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent"> Stop On </p>
                </label>
              </div>
            </div>

            <div className="flex justify-between mt-3 mb-6 w-full">
              <div className="flex flex-row">
                <button
                  className="text-[#EFC319] font-[600] text-[18px] bg-white border border-[#EFC319] py-3 rounded-[20px] w-[120px] hover:bg-[#EFC319] hover:text-white hover:scale-90 duration-300 ease-in-out"
                  type="button"
                  onClick={handleAddMedicine}
                >
                  Add More
                </button>
              </div>
              <div className="flex flex-row">
                <button
                  type="button"
                  className="text-[#EFC319] font-[600] text-[18px] bg-white border border-[#EFC319] py-3 rounded-[20px] w-[120px] hover:bg-[#EFC319] hover:text-white hover:scale-90 duration-300 ease-in-out"
                  onClick={toggleMedicine}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="text-white font-[600] text-[18px] bg-[#EFC319] py-3 rounded-[20px] w-[120px] ml-4 hover:bg-[#EFC319] hover:scale-90 duration-300 ease-in-out"
                  onClick={createMedicine}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicinePopup;

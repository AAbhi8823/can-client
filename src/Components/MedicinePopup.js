import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Select, { defaultTheme } from 'react-select'
import axios from 'axios';
import apis from '../Api/baseUrl';
import Cookies from 'js-cookie';


const MedicinePopup = ({ toggleMedicine, getMedicines }) => {
  const [validationError, setValidationError] = useState(false);

  const [medicine_Data, setmedicine_Data] = useState({})
  const [error, seterror] = useState(false)
  //   const [medicine, setMedicine]=useState(true);
  // const toggleMedicine= ()=>{
  //   setMedicine(!medicine);
  // }
  const [selectedOption, setSelectedOption] = useState(null);
  const [medicineCount, setMedicineCount] = useState(1);
  const [deleteMedicine, setDeleteMedicine] = useState(false);
  const [time, setTime] = useState();
  const [reminderTime, setReminderTime] = useState(false);

  const [medicDate, setmedicDate] = useState({
    startFrom: "",
    stopOn: ""
  })
  const validateForm = () => {
    let isValid = true;

    for (let i = 0; i < medicineCount; i++) {
      const medicineName = medicine_Data[`medicineName${i}`];
      const medicineType = medicine_Data[`medicine_type${i}`];
      const dose = medicine_Data[`dose${i}`];
      const unit = medicine_Data[`unit${i}`];
      const meal = medicine_Data[`meal${i}`];
      const medicineTime = medicine_Data[`medicineTime${i}`];

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
  const handleTimeChange = (value) => {
    setTime(value && value.format("hh:mm A"));
  };
  const mealOptions = [
    { value: "Before Breakfast", label: "Before Breakfast" },
    { value: "After Breakfast", label: "After Breakfast" },
    { value: "Before Lunch", label: "Before Lunch" },
    { value: "After Lunch", label: "After Lunch" },
    { value: "Before Dinner", label: "Before Dinner" },
    { value: "After Dinner", label: "After Dinner" },
  ];
  const handleAddMedicine = () => {
    setMedicineCount(medicineCount + 1);
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white",

      color: "black",
      "&:hover": {
        backgroundColor: "#EFC31968",
        color: "white",
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: "70%", // Set your desired width here
      zIndex: "20",
    }),
    control: (provided, state) => ({
      ...provided,
      width: "100%", // Adjust the width to your desired value (e.g., '50%' for half width)
      padding: "4px",

      border: "2px solid #D1D5DB", // Customize the border style here
      borderRadius: "20px", // Customize the border radius here
      backgroundColor: "transparent",
      boxShadow: "none",
      position: "relative",
    }),
    placeholder: (provided, state) => ({
      position: "absolute",
      left: "3px",
      fontSize: "14px",
      color: "#7C7C7C",
      transform: state.isFocused
        ? "translateY(-20px) scale(0)"
        : "translateY(0) scale(1)", // Apply the transform property here
      transition: "transform 0.2s", // Add transition for smooth animation
      // backgroundColor: '#FFFFFF', // Adjust the background color based on focus state
      padding: '4px 4px', // Add padding to adjust the spacing around the placeholder
    }),

  };


  function convertTo12HourTime(time24) {
    // Split the time string into hours and minutes
    const [hours, minutes] = time24.split(':');
  
    // Convert the hours to a number
    const hoursNumber = parseInt(hours);
  
    // Determine if it's AM or PM
    const period = hoursNumber >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    const hours12 = hoursNumber % 12 || 12;
  
    // Create the formatted time string
    const time12 = `${hours12}:${minutes} ${period}`;
  
    return time12;
  }
  
  
  


  const handleReminder = () => {
    setReminderTime(!reminderTime);
  }
  let token = Cookies.get("token")

  const [isSubmitting, setIsSubmitting] = useState()

  const createMedicine = async (e) => {
    setIsSubmitting(true)
    e.preventDefault();
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    } else{
      
    }
    try {
      const creator = localStorage.getItem("active_user")
      const allMedicines = [];

      for (let i = 0; i < medicineCount; i++) {
        const medicine = {
          medicineName: medicine_Data[`medicineName${i}`] || '',
          medicine_type: medicine_Data[`medicine_type${i}`] || '',
          dose: medicine_Data[`dose${i}`] || '',
          unit: medicine_Data[`unit${i}`] || '',
          medicine_meal: medicine_Data[`meal${i}`] || '',
          remainder_time: convertTo12HourTime(medicine_Data[`medicineTime${i}`]) || '',
        };
        allMedicines.push(medicine);
      }
      if (!validationError) {
        const data = await axios.post(`${apis.CREATE_MEDICINE}?token=${token}`, { creater_Id: creator, medicine: allMedicines, startfrom: medicDate.startFrom, stopOn: medicDate.stopOn })
        console.log(data, "ressssssss");
        if (data.data.status === true) {
          getMedicines()
          toggleMedicine()
          setIsSubmitting(false)
        } else{
          setIsSubmitting(false)
        }
      } else{
        setIsSubmitting(false);
      }

      console.log("hellobrother", allMedicines, medicDate);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    } 
  };


  const handleDeleteMedicine = () => {
    setDeleteMedicine(true);
  };
  const [isSelectClicked, setIsSelectClicked] = useState(false);

  const handleSelectClick = () => {
    setIsSelectClicked(true);
  };

  const handelchange = (e, index, select) => {
    if (select) {
      setmedicine_Data({ ...medicine_Data, ["meal" + index]: e.value });
    } else {
      setmedicine_Data({ ...medicine_Data, [e.target.name + index]: e.target.value });
      console.log(selectedOption)
    }

  }


  return (
    <>
      <div className="fixed inset-0 flex lg:items-end md:items-center items-start justify-center bg-black bg-opacity-40 z-50 overflow-y-scroll lg:pt-0  px-5  py-[90px] ">
        <div className=" flex flex-col bg-white rounded-[40px] lg:md:w-auto  w-full max-h-fit px-10 ">
          <div className="flex flex-row py-4 justify-between items-center w-full">
            <h1 className="text-[22px] font-[500]">Add Medicines</h1>
            <RxCross2
              className=" lg:md:ml-80 cursor-pointer"
              onClick={toggleMedicine}
            />
          </div>
          <div className="flex flex-col">
            <form>
              {[...Array(medicineCount)].map((_, index) => (
                <div key={index}>
                  <label className="text-[16px] font-[500]">
                    {" "}
                    Medicine {index + 1}{" "}
                  </label>
                  <div className="flex sm:flex-row  lg:flex-row md:flex-row flex-col py-2 gap-6">
                    <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                      <input
                        type="text"
                        name="medicineName"
                        id="medicine"
                        className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        onChange={(e) => {
                          handelchange(e, index);
                        }}
                        placeholder=" "
                      />

                      <label
                        for="medicine"
                        name="medicine_type"
                        className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Medicine {index + 1}
                        </p>
                      </label>
                    </div>
                    <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                      <input
                        type="text"
                        name="medicine_type"
                        onChange={(e) => {
                          handelchange(e, index);
                        }}
                        id="type"
                        className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        placeholder=" "
                      />

                      <label
                        for="type"
                        className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Type
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="flex sm:flex-row  lg:flex-row md:flex-row  flex-col py-2 gap-6">
                    <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                      <input
                        type="text"
                        name="dose"
                        id="dose"
                        onChange={(e) => {
                          handelchange(e, index);
                        }}
                        className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        placeholder=" "
                      />

                      <label
                        for="dose"
                        className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Dose
                        </p>
                      </label>
                    </div>
                    <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                      <input
                        type="text"
                        name="unit"
                        id="unit"
                        onChange={(e) => {
                          handelchange(e, index);
                        }}
                        className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        placeholder=" "
                      />

                      <label
                        for="unit"
                        className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Unit
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="flex sm:flex-row  lg:flex-row md:flex-row  flex-col py-2 gap-6">
                    <div className="relative  lg:w-1/2 w-full mb-4 group">
                      <Select
                        options={mealOptions}
                        name="meal"
                        className="border-0 z-10000"
                        placeholder={"Meal"}
                        styles={customStyles}
                        onFocus={handleSelectClick}
                        Value={selectedOption}
                        onChange={(e) => {
                          handelchange(e, index, true);
                        }}
                      />
                      {/* <TimePicker onChange={handleTimeChange} showSecond={false} defaultValue={time} */}
                      <label
                        htmlFor="mealOptions"
                        className={`absolute px-2 lg:md:text-sm text-xs flex-nowrap text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-20 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                          isSelectClicked ? "visible" : "hidden"
                        }`}
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Meal
                        </p>
                      </label>
                    </div>
                    {/* format="hh:mm A" className='border rounded-[20px] w-1/2' placeholder='Meal time' appearance='none' style={{ appearance:'none', width: '50%', outline:'none', borderRadius:'20px'}}/> */}
                    <div className="relative lg:w-1/2 w-full mb-4 group">
                      <input
                        type="text"
                        name="medicineTime"
                        onChange={(e) => {
                          handelchange(e, index);
                          console.log("samesame", e.target.value);
                        }}
                        onFocus={(e) => {
                          e.target.type = "time";
                        }}
                        id="medicineTime"
                        className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        placeholder=" "
                      />
                      <label
                        for="medicineTime"
                        className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs flex-nowrap text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Time for reminder
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <label className="text-[16px] font-[500]">Select Date</label>
              <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col py-2 gap-6">
                <div className="relative  lg:w-1/2 w-full mb-4 group">
                  <input
                    type="text"
                    name="startFrom"
                    onChange={(e) => {
                      setmedicDate({ ...medicDate, startFrom: e.target.value });
                    }}
                    onFocus={(e) => {
                      e.target.type = "date";
                    }}
                    id="startFrom"
                    className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                    placeholder=" "
                  />
                  <label
                    for="startFrom"
                    className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-1 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                  >
                    <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                      Start from
                    </p>
                  </label>
                </div>

                <div className="relative  lg:w-1/2 w-full mb-4 group">
                  <input
                    type="text"
                    name="startfrom"
                    onChange={(e) => {
                      setmedicDate({ ...medicDate, stopOn: e.target.value });
                    }}
                    onFocus={(e) => {
                      e.target.type = "date";
                    }}
                    id="stopOn"
                    className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                    placeholder=" "
                  />
                  <label
                    for="stopOn"
                    className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                  >
                    <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                      Stop On
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex flex-row gap-0 lg:gap-6 py-2">
                <input
                  type="checkbox"
                  className="appearance-none w-4 h-4 border-2 border-pink-500 rounded-sm bg-white mt-1 shrink-0 checked:bg-pink-500 checked:border-pink-500"
                  onChange={handleReminder}
                />
                Remind me to take medicine
              </div>
              {reminderTime && (
                <div className=" flex flex-col py-2 w-full">
                  <div className="relative z-0 w-full mb-4 group">
                    <input
                      type="text"
                      onFocus={(e) => {
                        e.target.type = "time";
                      }}
                      id="medicineTime"
                      className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label
                      for="medicineTime"
                      className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Time{" "}
                      </p>
                    </label>
                  </div>
                </div>
              )}
              <div className="flex flex-row py-2 gap-4 justify-end">
                {validationError && (
                  <span className="text-xs text-red-700">
                    All fields required
                  </span>
                )}
                {/* <button className='border px-6 py-2 rounded-[15px]' onClick={handleDeleteMedicine}>Cancel</button> */}

                <button
                  className=" px-6 py-2 rounded-[15px] text-[#fff] bg-[#C31A7F]"
                  onClick={createMedicine}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicinePopup;

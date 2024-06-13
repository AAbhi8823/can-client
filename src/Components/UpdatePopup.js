import React,{useEffect} from "react";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import  { baseurl } from "../Api/baseUrl";
import Cookies from "js-cookie";

const UpdatePopup = ({ toggleMedicine, data, getMedicines }) => {
    let token = Cookies.get("token");
  const [medicine_Data, setmedicine_Data] = useState({ ...data?.it });
  console.log("updadteeeee", data);
  console.log("getMedicines::>>>", getMedicines);
  console.log("medicine_Data::>>>",  medicine_Data);
 
  const [selectedOption, setSelectedOption] = useState(null);

  const [reminderTime, setReminderTime] = useState(false);
  const [error, setError] = useState(false);
  const mealOptions = [
    { value: "Before Breakfast", label: "Before Breakfast" },
    { value: "After Breakfast", label: "After Breakfast" },
    { value: "Before Lunch", label: "Before Lunch" },
    { value: "After Lunch", label: "After Lunch" },
    { value: "Before Dinner", label: "Before Dinner" },
    { value: "After Dinner", label: "After Dinner" },
  ];
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
      padding: "4px 4px", // Add padding to adjust the spacing around the placeholder
    }),
  };
  const info = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const updateMedicine = async (e) => {
    e.preventDefault();
    setError(false);
    console.log("hellobrother",);
    const updateData = {
      medicine_id: data?._id,
      medicine_name: medicine_Data?.medicine_name,
      medicine_dosage: medicine_Data?.medicine_dosage,
    };
    try {
      const res = await axios.put(`${baseurl}/medicine/update-medicine`, updateData, info);
      console.log("ressssss", res);
      if (res?.data?.resData?.status === true) {
        toggleMedicine();
        getMedicines();
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  

  const [isSelectClicked, setIsSelectClicked] = useState(false);

  const handleSelectClick = () => {
    setIsSelectClicked(true);
  };

  const handelchange = (e, select) => {
    if (select) {
      setmedicine_Data({ medicine_meal: e.value });
      console.log(selectedOption);
    } else {
      setmedicine_Data({[e.target.name]: e.target.value });
      console.log(selectedOption);
    }

    console.log("medicine_Data", medicine_Data);
  };

  const getdata=async()=>{
    try{
      const responce=await axios.get(`${baseurl}/medicine/get-medicine-by-id/${data?._id}`,info)
      setmedicine_Data(responce?.data?.resData?.data?.medicines)
      console.log("medicine::>>",responce?.data?.resData?.data?.medicines)
    }
    catch(err){
      console.log("Error", err);
    }
  }
  
  useEffect(()=>{
    getdata();
  },[])
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-y-scroll lg:pt-0 pt-56 ">
        <div className=" flex flex-col bg-white rounded-[40px] lg:md:w-auto lg:md:h-auto w-full max-h-fit px-10 ">
          <div className="flex flex-row py-4 justify-between items-center w-full">
            <h1 className="text-[22px] font-[500]">Update Medicine</h1>
            <RxCross2
              className=" lg:md:ml-80 cursor-pointer"
              onClick={toggleMedicine}
            />
          </div>
          <div className="flex flex-col">
            <form>
              <div>
                <label className="text-[16px] font-[500]"> Medicine </label>
                <div className="flex lg:flex-row flex-col py-2 gap-6">
                  {console.log("sdssdljvhbdsvvbhvjhbver::>>",medicine_Data)}
                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="medicineName"
                      id="medicine"
                      className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      value={medicine_Data?.medicineName}
                      onChange={(e) => {
                        handelchange(e);
                      }}
                      placeholder=" "
                    />

                    <label
                      htmlFor="medicine"
                      name="medicine_type"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Medicine{" "}
                      </p>
                    </label>
                  </div>

                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="medicine_type"
                      onChange={(e) => {
                        handelchange(e);
                      }}
                      value={medicine_Data.medicine_type}
                      id="type"
                      className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />

                    <label
                      htmlFor="type"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Type
                      </p>
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col py-2 gap-6">
                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="dose"
                      id="dose"
                      value={medicine_Data.dose}
                      onChange={(e) => {
                        handelchange(e);
                      }}
                      className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />

                    <label
                      htmlFor="dose"
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
                      value={medicine_Data.unit}
                      onChange={(e) => {
                        handelchange(e);
                      }}
                      className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />

                    <label
                      htmlFor="unit"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Unit
                      </p>
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col py-2 gap-6">
                  <div className="relative  lg:w-1/2 w-full mb-4 group">
                    <Select
                      options={mealOptions}
                      name="medicine_meal"
                      className="border-0 z-10000"
                      placeholder={medicine_Data?.medicine_meal}
                      styles={customStyles}
                      onFocus={handleSelectClick}
                      Value={medicine_Data?.medicine_meal}
                  
                      onChange={(e) => {
                        handelchange(e, true);
                      }}
                    />
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
                      value={medicine_Data?.remainder_time}
                      name="medicineTime"
                      onChange={(e) => {
                        handelchange(e);
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
                      htmlFor="medicineTime"
                      className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs flex-nowrap text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Time for reminder
                      </p>
                    </label>
                  </div>
                </div>
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
                      htmlFor="medicineTime"
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
                {error && (
                  <span className="text-sm text-red-700">
                    All fields required
                  </span>
                )}

                <button
                  className=" px-6 py-2 rounded-[15px] text-[#fff] bg-[#C31A7F]"
                  onClick={updateMedicine}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePopup;

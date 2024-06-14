import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookies from "js-cookie";

const UpdatePopup = ({ toggleMedicine, data, getMedicines }) => {
  let token = Cookies.get("token");
  const [medicineData, setMedicineData] = useState({ ...data?.it });
  const [selectedOption, setSelectedOption] = useState(null);
  const [reminderTime, setReminderTime] = useState(false);
  const [error, setError] = useState(false);
  const [isSelectClicked, setIsSelectClicked] = useState(false);

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
      width: "70%",
      zIndex: "20",
    }),
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: "4px",
      border: "2px solid #D1D5DB",
      borderRadius: "20px",
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
        : "translateY(0) scale(1)",
      transition: "transform 0.2s",
      padding: "4px 4px",
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
    const updateData = {
      medicine_id: data?._id,
      medicine_name: medicineData?.medicineName,
      medicine_dosage: medicineData?.dose,
      medicine_meal: medicineData?.medicine_meal,
      remainder_time: medicineData?.remainder_time,
      medicine_type: medicineData?.medicine_type,
      dose: medicineData?.dose,
      unit: medicineData?.unit,
    };
    console.log("================================",updateData)
    console.log("medicineData>>>>>",medicineData)
    try {
      const res = await axios.put(`${baseurl}/medicine/update-medicine`, updateData, info);
      if (res?.data?.resData?.status === true) {
        toggleMedicine();
        getMedicines();
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleSelectClick = () => {
    setIsSelectClicked(true);
  };

  const handleChange = (e, select) => {
    if (select) {
      setMedicineData({ ...medicineData, medicine_meal: e.value });
    } else {
      setMedicineData({ ...medicineData, [e.target.name]: e.target.value });
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${baseurl}/medicine/get-medicine-by-id/${data?._id}`, info);
      setMedicineData(response?.data?.resData?.data?.medicines);
    } catch (err) {
      console.log("Error", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-y-scroll lg:pt-0 pt-56">
        <div className="flex flex-col bg-white rounded-[40px] lg:md:w-auto lg:md:h-auto w-full max-h-fit px-10">
          <div className="flex flex-row py-4 justify-between items-center w-full">
            <h1 className="text-[22px] font-[500]">Update Medicine</h1>
            <RxCross2 className="lg:md:ml-80 cursor-pointer" onClick={toggleMedicine} />
          </div>
          <div className="flex flex-col">
            <form>
              <div>
                <label className="text-[16px] font-[500]"> Medicine </label>
                <div className="flex lg:flex-row flex-col py-2 gap-6">
                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="medicineName"
                      id="medicine"
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      value={medicineData?.medicineName}
                      onChange={(e) => handleChange(e)}
                      placeholder=" "
                    />
                    <label
                      htmlFor="medicine"
                      name="medicine_type"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Medicine</p>
                    </label>
                  </div>

                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="medicine_type"
                      onChange={(e) => handleChange(e)}
                      value={medicineData?.medicine_type}
                      id="type"
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="type"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Type</p>
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col py-2 gap-6">
                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="dose"
                      id="dose"
                      value={medicineData?.dose}
                      onChange={(e) => handleChange(e)}
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="dose"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Dose</p>
                    </label>
                  </div>
                  <div className="relative z-0 lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      name="unit"
                      id="unit"
                      value={medicineData?.unit}
                      onChange={(e) => handleChange(e)}
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="unit"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Unit</p>
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col py-2 gap-6">
                  <div className="relative lg:w-1/2 w-full mb-4 group">
                    <Select
                      options={mealOptions}
                      name="medicine_meal"
                      className="border-0 z-10000"
                      placeholder={medicineData?.medicine_meal}
                      styles={customStyles}
                      onFocus={handleSelectClick}
                      value={mealOptions.find(option => option.value === medicineData?.medicine_meal)}
                      onChange={(e) => handleChange(e, true)}
                    />
                    <label
                      htmlFor="mealOptions"
                      className={`absolute px-2 lg:md:text-sm text-xs flex-nowrap text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-20 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                        isSelectClicked ? "visible" : "hidden"
                      }`}
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Meal</p>
                    </label>
                  </div>
                  <div className="relative lg:w-1/2 w-full mb-4 group">
                    <input
                      type="text"
                      value={medicineData?.remainder_time}
                      name="remainder_time"
                      onChange={(e) => handleChange(e)}
                      onFocus={(e) => {
                        e.target.type = "time";
                      }}
                      id="remainder_time"
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="remainder_time"
                      className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs flex-nowrap text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Time for reminder</p>
                    </label>
                  </div>
                </div>
              </div>

              {reminderTime && (
                <div className="flex flex-col py-2 w-full">
                  <div className="relative z-0 w-full mb-4 group">
                    <input
                      type="text"
                      onFocus={(e) => {
                        e.target.type = "time";
                      }}
                      id="medicineTime"
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="medicineTime"
                      className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">Time</p>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex flex-row py-2 gap-4 justify-end">
                {error && <span className="text-sm text-red-700">All fields required</span>}
                <button className="px-6 py-2 rounded-[15px] text-[#fff] bg-[#C31A7F]" onClick={updateMedicine}>
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

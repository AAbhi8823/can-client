import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import apis from "../Api/baseUrl";
import Cookies from "js-cookie";

const MedicinePopup = ({ toggleMedicine, getMedicines }) => {
  const [validationError, setValidationError] = useState(false);
  const [medicineData, setMedicineData] = useState({});
  const [medicineCount, setMedicineCount] = useState(1);
  const [deleteMedicine, setDeleteMedicine] = useState(false);
  const [reminderTime, setReminderTime] = useState(false);
  const [reminderTimeValue, setReminderTimeValue] = useState(""); // State for reminder time

  const [medicDate, setMedicDate] = useState({
    startFrom: "",
    stopOn: "",
  });

  const validateForm = () => {
    let isValid = true;

    for (let i = 0; i < medicineCount; i++) {
      const medicineName = medicineData[`medicineName${i}`];
      const medicineType = medicineData[`medicine_type${i}`];
      const dose = medicineData[`dose${i}`];
      const unit = medicineData[`unit${i}`];
      const meal = medicineData[`meal${i}`];
      const medicineTime = medicineData[`medicineTime${i}`];

      if (
        !medicineName ||
        !medicineType ||
        !dose ||
        !unit ||
        !meal ||
        !medicineTime
      ) {
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


  const mealOptions = [
    { value: "Before Breakfast", label: "Before Breakfast" },
    { value: "After Breakfast", label: "After Breakfast" },
    { value: "Before Lunch", label: "Before Lunch" },
    { value: "After Lunch", label: "After Lunch" },
    { value: "Before Meal", label: "Before Meal" },
    { value: "After Meal", label: "After Meal" },
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
      width: "70%",
      zIndex: "99999999",
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

  const convertTo12HourTime = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hoursNumber = parseInt(hours);
    const period = hoursNumber >= 12 ? "PM" : "AM";
    const hours12 = hoursNumber % 12 || 12;
    const time12 = `${hours12}:${minutes} ${period}`;
    return time12;
  };

  const handleReminder = () => {
    setReminderTime(!reminderTime);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMedicine = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const creator = localStorage.getItem("active_user");
      const allMedicines = [];
      for (let i = 0; i < medicineCount; i++) {
        const medicine = {
          medicine_name: medicineData[`medicineName${i}`] || "",
          medicine_type: medicineData[`medicine_type${i}`] || "",
          medicine_dosage: medicineData[`dose${i}`] || "",
          unit: medicineData[`unit${i}`] || "",
          meal: medicineData[`meal${i}`] || "",
          isReminderSet: reminderTime,
          time_for_reminder:
            convertTo12HourTime(medicineData[`medicineTime${i}`]) || "",
          medicine_start_date: medicDate.startFrom,
          medicine_stop_date: medicDate.stopOn,
        };
        allMedicines.push(medicine);
      }
      const token = Cookies.get("token");
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
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (e, index, select) => {
    if (select) {
      setMedicineData({ ...medicineData, ["meal" + index]: e.value });
    } else {
      setMedicineData({
        ...medicineData,
        [e.target.name + index]: e.target.value,
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex md:items-center items-start justify-center bg-black bg-opacity-40 z-50 overflow-y-scroll px-5 py-[90px]">
        <div
          className="flex flex-col bg-white rounded-[40px] lg:md:w-auto w-full max-h-fit px-10 py-5"
          style={{ position: "absolute", top: "120px" }}
        >
          <div className="flex flex-row pb-4 justify-between items-center w-full">
            <h1 className="text-[22px] font-[500]">Add Medicines</h1>
            <RxCross2
              className="lg:md:ml-80 cursor-pointer"
              onClick={toggleMedicine}
            />
          </div>
          <div className="flex flex-col">
            <form>
              {[...Array(medicineCount)].map((_, index) => (
                <div className="mb-3" key={index}>
                  <label className="text-[16px] font-[500]">
                    {" "}
                    Medicine {index + 1}{" "}
                  </label>
                  <div className="flex sm:flex-row lg:flex-row md:flex-row flex-col py-2 pb-0  gap-6">
                    <div className="relative z-0 lg:w-1/2 w-full group">
                      <input
                        type="text"
                        name="medicineName"
                        id="medicine"
                        className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        onChange={(e) => {
                          handleChange(e, index);
                        }}
                        placeholder=" "
                      />
                      <label
                        htmlFor="medicine"
                        name="medicine_type"
                        className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Medicine {index + 1}
                        </p>
                      </label>
                    </div>
                    <div className="relative z-0 lg:w-1/2 w-full group">
                      <input
                        type="text"
                        name="medicine_type"
                        id="type"
                        className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        onChange={(e) => {
                          handleChange(e, index);
                        }}
                        placeholder=" "
                      />
                      <label
                        htmlFor="type"
                        name="medicine_type"
                        className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Type
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="flex sm:flex-row lg:flex-row md:flex-row flex-col py-2 pb-0 gap-6">
                    <div className="relative z-0 lg:w-1/3 w-full group">
                      <input
                        type="text"
                        name="dose"
                        id="dose"
                        className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        onChange={(e) => {
                          handleChange(e, index);
                        }}
                        placeholder=" "
                      />
                      <label
                        htmlFor="dose"
                        name="dose"
                        className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Dosage
                        </p>
                      </label>
                    </div>
                    <div className="relative z-0 lg:w-1/3 w-full group">
                      <input
                        type="text"
                        name="unit"
                        id="unit"
                        className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                        onChange={(e) => {
                          handleChange(e, index);
                        }}
                        placeholder=" "
                      />
                      <label
                        htmlFor="unit"
                        name="unit"
                        className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                          Unit
                        </p>
                      </label>
                    </div>
                    <div className="relative z-0 lg:w-1/3 w-full group">
                      <Select
                        options={mealOptions}
                        onChange={(e) => {
                          handleChange(e, index, "meal");
                        }}
                        styles={customStyles}
                        placeholder={
                          <p className="text-[12px] text-[#4B5563] font-[400]">
                            Select meal
                          </p>
                        }
                      />
                    </div>
                  </div>
                  <div className="relative z-0 lg:w-full w-full group mt-3">
                    <input
                      type="time"
                      name="medicineTime"
                      id="time"
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                      placeholder=" "
                    />
                    <label
                      htmlFor="time"
                      name="time"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Time
                      </p>
                    </label>
                  </div>
                  {deleteMedicine && medicineCount !== 1 ? (
                    <NavLink>
                      <button
                        className="bg-[#F94D44] text-white text-sm px-6 py-1 rounded-[20px] mb-2"
                        onClick={() => setMedicineCount(medicineCount - 1)}
                      >
                        Delete
                      </button>
                    </NavLink>
                  ) : null}
                </div>
              ))}
              <div className="=text-center mt-3 mb-0">
                <NavLink>
                  <button
                    className="text-[#304747] text-sm py-1 font-semibold mb-2"
                    onClick={() => handleAddMedicine()}
                  >
                    + Add more medicine
                  </button>
                </NavLink>
              </div>
              <div className="relative z-0 lg:w-full w-full group">
                <div className="flex">
                  <input
                    type="checkbox"
                    name="setReminder"
                    id="reminder"
                    className="mr-2"
                    checked={reminderTime}
                    onChange={handleReminder}
                  />
                  <label
                    htmlFor="reminder"
                    className="text-sm text-gray-700 dark:text-gray-400"
                  >
                    Remind me to take medicine
                  </label>
                </div>
                {reminderTime && (
                  <div className="relative z-0 lg:w-full w-full mt-2 group">
                    <input
                      type="time"
                      name="reminderTime"
                      id="reminderTime"
                      value={reminderTimeValue}
                      onChange={(e) => setReminderTimeValue(e.target.value)}
                      className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                    />
                    <label
                      htmlFor="reminderTime"
                      className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                        Reminder Time
                      </p>
                    </label>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full mt-5 mb-0">
                <div className="relative z-0 w-full group mb-3">
                  <input
                    type="date"
                    name="startFrom"
                    id="startFrom"
                    className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                    onChange={(e) =>
                      setMedicDate({ ...medicDate, startFrom: e.target.value })
                    }
                    placeholder=" "
                  />
                  <label
                    htmlFor="startFrom"
                    name="startFrom"
                    className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                      Start from
                    </p>
                  </label>
                </div>
                <div className="relative z-0 w-full group">
                  <input
                    type="date"
                    name="stopOn"
                    id="stopOn"
                    className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                    onChange={(e) =>
                      setMedicDate({ ...medicDate, stopOn: e.target.value })
                    }
                    placeholder=" "
                  />
                  <label
                    htmlFor="stopOn"
                    name="stopOn"
                    className="peer-focus:font-medium absolute px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                      Stop on
                    </p>
                  </label>
                </div>
              </div>
              <div className="flex justify-center mb-10">
                {validationError && (
                  <p className="text-[#FF0000] font-normal text-[14px]">
                    Please fill in all fields.
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  style={{ color: "#fff" }}
                  className={`w-1/2 text-[16px] rounded-[20px] py-3 px-7 bg-[#c31a7f] text-[#304747] font-[500] ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={createMedicine}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Add"}
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

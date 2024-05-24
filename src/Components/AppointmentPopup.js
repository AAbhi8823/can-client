import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { RxCross1 } from "react-icons/rx";
import apis from "../Api/baseUrl";

const AppointmentPopup = ({ edit, edit_id, getappointment }) => {
  const [pop, setPop] = useState(true);
  const [formValues, setFormValues] = useState({
    appointment_name: "",
    doctor_name: "",
    hospital_name: "",
    hospital_address: "",
    appointment_date: "",
    appointment_time: "",
    add_note: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const getsingle_appointment = async (id) => {
    try {
      const { data } = await axios.post(
        `${apis.SINGEL_FETCH_APPOINTMENT}/?token=${token}`,
        { appointment_Id: id }
      );
      if (data.status) {
        setFormValues({
          appointment_name: data.data.appointment_name,
          appointment_date: data.data.date,
          appointment_time: data.data.time,
          add_note: data.data.note,
          hospital_address: data.data.hospital_address,
          hospital_name: data.data.hospital_name,
          doctor_name: data.data.doctor_name,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (edit && edit_id) {
      getsingle_appointment(edit_id);
    }
  }, [edit, edit_id]);
  

  const editappointment = async () => {
    setIsEditing(true);
    try {
      const datas = {
        appointment_Id: edit_id,
        ...formValues,
      };
      const { data } = await axios.put(
        `${apis.UPDATE_APPOINTMENT}}`,
        datas
      );
      if (data.status) {
        setPop(false);
        setIsEditing(false);
        getappointment(token, localStorage.getItem("active_user"));
      }
    } catch (error) {
      console.log(error);
      setIsEditing(false);
    }
  };

  const createappointment = async () => {
    setIsSaving(true);
    try {
      const datas = {
        ...formValues,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(`${apis.CREATE_APPOINTMENT}`, datas, config);
      console.log("data.status:::>>>1",data);
      if (data?.resData?.status) {
        setPop(!pop)
        setIsSaving(false);
        navigate("/appointment1");
        console.log("data.status:::>>>",data.status);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-2 bg-black bg-opacity-50 z-50 ${!pop ? "hidden" : ""}`}
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="lg:md:w-[60%] h-fit bg-white rounded-[24px] flex flex-col justify-center px-5 py-2 relative">
        <div className="flex items-center justify-center font-semibold">
          <h1 className="text-lg">Add Appointment</h1>
          <div
            className="absolute right-[8%] cursor-pointer"
            onClick={() => setPop(!pop)}
          >
            <RxCross1 />
          </div>
        </div>
        <div className="h-[80%] w-[100%] flex flex-col items-center">
          <form className="flex flex-wrap justify-between lg:mx-[4%] mt-4">
            <div className="flex gap-6 w-full">
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  name="appointment_name"
                  id="appointment_name"
                  value={formValues.appointment_name}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="appointment_name"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Appointment Name
                  </p>
                </label>
              </div>
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  name="doctor_name"
                  id="doctor_name"
                  value={formValues.doctor_name}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="DoctorName"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Doctor's Name
                  </p>
                </label>
              </div>
            </div>
            <div className="flex gap-6 w-full">
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  name="hospital_name"
                  id="hospital_name"
                  value={formValues.hospital_name}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="hospital_name"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Hospital's Name
                  </p>
                </label>
              </div>
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  name="hospital_address"
                  id="hospital_address"
                  value={formValues.hospital_address}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="hospitalAdd"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Hospital's Address
                  </p>
                </label>
              </div>
            </div>
            <div className="flex gap-6 w-full">
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  onFocus={(e) => {
                    e.target.type = "date";
                  }}
                  value={formValues.appointment_date}
                  onChange={handleInputChange}
                  id="appointment_date"
                  name="appointment_date"
                  className=" block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="appointment_date"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    DD/MM/YYYY
                  </p>
                </label>
              </div>
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="time"
                  onFocus={(e) => {
                    e.target.type = "time";
                  }}
                  id="appointment_time"
                  name="appointment_time"
                  value={formValues.appointment_time}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="time"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Time
                  </p>
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-4 group">
              <input
                type="text"
                name="add_note"
                id="add_note"
                value={formValues.add_note}
                onChange={handleInputChange}
                className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="add_note"
                className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                  Add note
                </p>
              </label>
            </div>
          </form>
          <div className="flex gap-4 mb-3 mt-3 w-full justify-end px-8">
            <button
              className="border-2 py-1 px-2 md:lg:w-[15%] border-[#7E7E7E] text-center rounded-[12px]"
              onClick={() => setPop(!pop)}
            >
              Cancel
            </button>
            {!edit ? (
              <button
                type="submit"
                className="bg-[#C31A7F] px-2 py-1 md:lg:w-[15%] text-white text-center rounded-[12px]"
                onClick={createappointment}
              >
                {isSaving ? "Creating..." : "Save"}
              </button>
            ) : (
              <button
                type="submit"
                className="bg-[#C31A7F] px-2 py-1 md:lg:w-[15%] text-white text-center rounded-[12px]"
                onClick={editappointment}
              >
                {isEditing ? "Saving..." : "Edit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPopup;

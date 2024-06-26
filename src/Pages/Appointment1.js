import React, { useEffect, useState } from "react";
import CalenderRecords from "../Components/CalenderRecords";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { TfiClipboard } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AppointmentPopup from "../Components/AppointmentPopup";
import Page from "../Layouts/Pages";
import axios from "axios";
import apis from "../Api/baseUrl";
import "./appointment.css";
import Cookies from "js-cookie";
const Appointment1 = () => {
  const base_token=Cookies.get("token");
  const [edit, setedit] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [isClickedAppointment, setIsClickedAppointment] = useState(true);
  const [notePopups, setNotePopups] = useState({});
  const [initialData, setInitialData] = useState(null);
  const location = useLocation();
  const filterdate = location.search.split("=")[1];
  const [openAppointments, setOpenAppointments] = useState(false);
  const [openEditPopups, setOpenEditPopups] = useState(false);
  const [editInfor,seEditinfo] = useState([]);
  
  const editPopup = (index) => {
    setOpenEditPopups(!openEditPopups);
    seEditinfo(index)
  };
  console.log("editInfor::::::::::")

  const addAppointments = () => {
    setOpenAppointments(!openAppointments);
  };

  const handleIsClickedAppointment = () => {
    setIsClickedAppointment(!isClickedAppointment);
  };

  const toggleNotePopup = (index) => {
    setNotePopups((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getAppointment = async (date) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${base_token}`,
        },
      };
      const apiUrl = `${apis.GET_APPOINTMENT}/${date}`;
      const { data } = await axios.get(apiUrl, config);
      if (data?.resData?.status === true) {
        setAppointmentData(data.resData.data);
      } else {
        setAppointmentData([]);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${base_token}`,
        },
      };
      const apiUrl = `${apis.REMOVE_APPOINTMENTS}/${id}`;
      await axios.delete(apiUrl, config);
      setAppointmentData((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.log("Error deleting appointment:", error);
    }
  };

  useEffect(() => {
    getAppointment(filterdate);
  }, [filterdate]);

  return (
    <Page
      pageContent={
        <>
          {/* background */}
          <div className="bg-[#FEF8FD] w-full h-full flex flex-row relative">
            <div className="flex flex-col w-full lg:md:mx-[5%] py-10 mx-auto ">
              <div className="mt-6 flex justify-between m-4">
                <div className={`flex lg:md:gap-8 gap-3 lg:md:w-[50%] w-full`}>
                  <NavLink to="/appointment1">
                    <button
                      className={`lg:text-[1.20vw] flex lg:md:py-2 lg:md:px-6 p-2 rounded-[15px] w-fit text-center h-fit ${
                        isClickedAppointment
                          ? "bg-white shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)]"
                          : "bg-[#ffffff7b]"
                      }`}
                      onClick={handleIsClickedAppointment}
                    >
                      Appointments
                    </button>
                  </NavLink>
                </div>
                <div>
                  <button
                    className="lg:text-[1.20vw] text-[16px] lg:h-[5vh] lg:block hidden text-sm end-2 z-10 lg:z-0 bottom-4 lg:bottom-0 lg:py-2 lg:px-6 p-2 bg-[#C31A7F] text-white shadow-lg rounded-[15px] w-fit text-center"
                    onClick={addAppointments}
                  >
                    Add Appointment
                  </button>
                </div>
                {openAppointments && <AppointmentPopup />}
                {openEditPopups && (
                  <AppointmentPopup
                    edit={edit}
                    getAppointment={getAppointment}
                    initialData={initialData}
                  />
                )}
              </div>

              <div className="bg-white min-h-[80vh] max-h-fit mt-2 rounded-2xl shadow-xl flex flex-col items-center p-8">
                <div className="py-5 scale-75">
                  <CalenderRecords />
                </div>

                <div className="bg-[#FEF8FD] relative min-h-[70%] max-h-fit w-full rounded-[24px] pt-6 flex flex-col gap-3">
                  <h1 className="px-6">Today's Appointment</h1>
                  <table
                    className="appoint-table relative table justify-around bg-white border-gray-200 border rounded-[20px] text-left md:p-4 p-1"
                    style={{
                      borderCollapse: "separate",
                      borderSpacing: "0 8px",
                    }}
                  >
                    {appointmentData &&
                      appointmentData.map((index) => (
                        <tr
                          className="flex flex-col lg:flex-row lg:items-center lg:justify-evenly overflow-y-visible"
                          key={index._id}
                        >
                          <td className="flex flex-col items-center text-left justify-center pr-4">
                            <h1 className="font-semibold lg:text-[1vw] whitespace-nowrap text-[18px]">
                              {new Date(
                                index.appointment_date
                              ).toLocaleDateString()}
                            </h1>
                            <h1 className="text-[#7E7E77] px-6 lg:text-[1vw] lg:px-0">
                              {index.appointment_time}
                            </h1>
                          </td>

                          <td className="flex flex-col lg:flex-col md:flex-row items-start text-left px-4 gap-2">
                            <div className="whitespace-nowrap lg:text-[1vw] text-[13px] font-semibold text-[#7E7E77]">
                              Appointment name
                            </div>
                            <div className="font-semibold lg:text-[1vw] text-[15px]">
                              {index.appointment_name}
                            </div>
                          </td>
                          <td className="flex flex-col lg:flex-col md:flex-row text-left px-4 gap-2">
                            <div className="whitespace-nowrap lg:text-[1vw] text-[13px] font-semibold text-[#7E7E77]">
                              Doctor's name
                            </div>
                            <div className="font-semibold lg:text-[1vw] text-[15px]">
                              {index.doctor_name}
                            </div>
                          </td>

                          <td className="flex flex-col lg:flex-col md:flex-row text-left px-4 gap-2">
                            <div className="whitespace-nowrap lg:text-[1vw] text-[13px] font-semibold text-[#7E7E77]">
                              Hospital's name
                            </div>
                            <div className="font-semibold lg:text-[1vw] text-[15px]">
                              {index.hospital_name}
                            </div>
                          </td>

                          <td className="flex flex-col lg:flex-col md:flex-row text-left px-4 gap-2">
                            <div className="whitespace-nowrap lg:text-[1vw] text-[13px] font-semibold text-[#7E7E77]">
                              Hospital's address
                            </div>
                            <div className="font-semibold lg:text-[1vw] text-[15px] text-left">
                              {index.hospital_address}
                            </div>
                          </td>

                          <td colSpan={3} className="flex px-4">
                            <table className="appoint-table flex w-full h-full lg:justify-end justify-center md:justify-center items-center">
                              <tr>
                                <td className="pr-2">
                                  <div className="bg-[#c31a7f38] p-2 rounded-[12px] cursor-pointer">
                                    {notePopups[index._id] && (
                                      <div
                                        className="absolute"
                                        onClick={() =>
                                          toggleNotePopup(index._id)
                                        }
                                      >
                                        <div className="relative lg:-left-24 -left-10 top-5 min-w-[100px] flex flex-col flex-wrap p-2 items-start text-left bg-white shadow-md rounded-[15px]">
                                          <h4 className="text-[#7E7E77]">
                                            Note
                                          </h4>
                                          <p className="flex flex-wrap max-w-[200px]">
                                            {index.add_note}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    <TfiClipboard
                                      onClick={() => toggleNotePopup(index._id)}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="bg-[#c31a7f38] p-2 rounded-[12px] cursor-pointer">
                                    <MdDeleteOutline
                                      onClick={() =>
                                        deleteAppointment(index._id)
                                      }
                                    />
                                  </div>
                                </td>
                                <td className="pl-2">
                                  <div
                                    className="bg-[#c31a7f38] p-2 rounded-[12px] cursor-pointer"
                                    onClick={()=>{editPopup(index)}}
                                  >
                                    <MdOutlineModeEditOutline />
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Appointment1;

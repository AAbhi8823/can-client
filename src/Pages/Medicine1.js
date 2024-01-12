import { React, useEffect, useState } from "react";
import CalenderRecords from "../Components/CalenderRecords";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineAutoDelete, MdOutlineEdit } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import MedicinePopup from "../Components/MedicinePopup";
import Page from "../Layouts/Pages";
import apis from "../Api/baseUrl";
import axios from "axios";
import UpdatePopup from "../Components/UpdatePopup";
import Cookies from "js-cookie";

const MedicineReminder = () => {
  let token = Cookies.get("token");
  let id = localStorage.getItem("active_user");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getMedicines = async () => {
    const today = new Date();
    let dt =
      today.getDate.toString().length == 1
        ? 0 + today.getDate().toString()
        : today.getDate();

    let date = queryParams.get("date")
      ? queryParams.get("date")
      : today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + dt;
    console.log("date", date);
    const { data } = await axios.get(
      `${apis.GET_MEDICINE}?creater_Id=${id}&token=${token}&date=${date}`
    );
    setMedicines(data?.data);
    console.log("med", data.data);
  };
  const [medicines, setMedicines] = useState(null);

  useEffect(() => {
    let id = localStorage.getItem("active_user");
    if (token && id) {
      getMedicines();
    }
  }, [queryParams.get("date")]);

  console.log("mdesiccsasd", medicines);

  const [isClickedAppointment, setIsClickedAppointment] = useState(false);
  const handleIsClickedAppointment = () => {
    setIsClickedAppointment(!isClickedAppointment);
  };
  const [isClickedMedicine, setIsClickedMedicine] = useState(true);
  const handleIsClickedMedicine = () => {
    setIsClickedMedicine(!isClickedMedicine);
  };
  const [updatedata, setupdateData] = useState(null);

  const [medicinePopup, setMedicinePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const toggleMedicine = () => {
    setMedicinePopup(!medicinePopup);
  };
  const toggleMedicineUpdate = (data) => {
    console.log("data", data);
    setUpdatePopup(!updatePopup);
  };
  const [isDeleting, setIsDeleting] = useState();

  const handleDeleteMedicine = async (args) => {
    setIsDeleting(true);
    let token = Cookies.get("token");
    try {
      const resp = await axios.post(
        `${apis.DELETE_MEDICINE}?token=${token} `,
        args
      );
      console.log("saacgubbbbb", resp);
      if (resp?.data?.status === true) {
        getMedicines();
        setIsDeleting(false);
      }
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };
  return (
    <Page
      pageContent={
        <>
          <div className="flex">
            {/* background */}
            <div className="bg-[#FEF8FD] w-full flex flex-row h-full">
              <div className="flex flex-col w-full mx-[5%]">
                <div className=" mt-6 flex justify-between m-4">
                  <div
                    className={`flex lg:md:gap-8 gap-3  lg:md:w-[50%] w-full`}
                  >
                    {/* <NavLink to='/Appointment1'> <button className={`lg:text-[1.20vw] flex   lg:md:py-2 lg:md:px-6 p-2 rounded-[15px] w-fit text-center h-fit '  ${isClickedAppointment ? 'bg-white shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)]' : 'bg-[#ffffff7b] '} `} onClick={() => handleIsClickedAppointment()}>Appointments</button>  </NavLink> */}
                    <NavLink to="/Medicine1">
                      <button
                        className={`lg:text-[1.20vw] flex   lg:md:py-2 lg:md:px-10 p-2 shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)] rounded-[15px] w-fit h-fit text-center ${
                          isClickedMedicine
                            ? "bg-white shadow-lg"
                            : "bg-[#ffffff7b] "
                        }`}
                        onClick={() => {
                          handleIsClickedMedicine();
                        }}
                      >
                        {" "}
                        Medicine
                      </button>{" "}
                    </NavLink>
                  </div>
                  <div>
                    <button
                      className="lg:text-[1.20vw] text-[16px] lg:h-[5vh]  text-sm  end-2 z-10 lg:z-0  bottom-4 lg:bottom-0  lg:py-2 lg:px-6 p-2   bg-[#C31A7F] text-white  shadow-lg rounded-[15px] w-fit text-center"
                      onClick={toggleMedicine}
                    >
                      {" "}
                      Add Medicine{" "}
                    </button>
                  </div>
                  {medicinePopup && (
                    <MedicinePopup
                      toggleMedicine={toggleMedicine}
                      getMedicines={getMedicines}
                    />
                  )}
                </div>

                <div className="bg-[#FEF8FD]   mt-2 rounded-2xl shadow-xl flex flex-col items-center ">
                  <div className="flex flex-wrap justify-center md:justify-between lg:justify-between">
                    <div></div>
                    <div className="py-5 scale-75">
                      <CalenderRecords />
                    </div>
                    <div className="flex px-5 items-center">
                      <NavLink to={"/MedicineBank"}>
                        <button className="border-[#A94360] text-[#A94360] lg:text-[1.04vw] text-[16px] font-semibold py-1 px-10 border-2 border-pink-700 rounded-full">
                          Medicine Bank
                        </button>
                      </NavLink>
                    </div>
                  </div>

                  <div className="bg-[#FEF8FD] h-[70%] w-full rounded-[24px] p-6 flex flex-col gap-3 overflow-y-visible">
                    <h1 className="font-semibold">Today's Medicine</h1>

                    <table
                      className="relative table   justify-around bg-white border-gray-200 border rounded-[20px] text-left md:p-4 p-1 "
                      style={{
                        borderCollapse: "separate",
                        borderSpacing: "0 8px",
                      }}
                    >
                      {medicines &&
                        medicines?.map((item, ind) => {
                          // itemId?.push(item?._id)
                          // console.log("iddddd", item);
                          if (item?.medicine)
                            return item?.medicine?.map((it, index) => {
                              return (
                                <tr
                                  className="flex flex-col lg:flex-row lg:items-center lg:justify-evenly  overflow-y-visible "
                                  key={it?._id}
                                >
                                  <div className="text-center justify-center flex">
                                    <td className="w-[18vw] lg:text-center flex flex-col px-5 gap-4 py-3 ">
                                      <div>
                                        <h2 className="text-[18px] font-[500] text-center flex-nowrap">
                                          {it?.medicine_meal}
                                        </h2>
                                        <h3 className="text-[#7E7E7E] text-[14px] font-[500] flex-nowrap">
                                          {it?.remainder_time}
                                        </h3>
                                      </div>
                                    </td>
                                  </div>

                                  <td>
                                    {/* Individual medicine block */}
                                    <div className="lg:flex">
                                      <div className=" lg:border-l-2 overflow-auto text-[16px] font-[500] lg:text-center flex flex-col px-10 gap-4 py-3">
                                        <p className="text-[#7E7E7E] text-[14px] font-[500]">
                                          Medicine1
                                        </p>
                                        {it?.medicineName}
                                      </div>
                                      <div className="  lg:border-l-2 lg:border-r-2 overflow-auto lg:text-center lg:flex  px-10 py-3 gap-4">
                                        <div className="lg:pr-10 ">
                                          <div className=" flex-row gap-10 py-0 justify-center align-middle text-[16px] font-[500]">
                                            <p className="text-[#7E7E7E] text-[14px] font-[500]  mb-4">
                                              Type
                                            </p>
                                            {it?.medicine_type}
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className=" flex-row gap-10 py-0 justify-center align-middle text-[16px] font-[500] lg:py-0 md:py-0 py-3">
                                            <p className="text-[#7E7E7E] text-[14px] font-[500] mb-4">
                                              Dose
                                            </p>
                                            {it?.dose}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Individual medicine block ends */}
                                  </td>
                                  <td colSpan={2} className="flex px-4 w-full ">
                                    <table className="flex w-full h-full lg:justify-end justify-center md:justify-center items-center">
                                      <tr className=" ">
                                        <td className="pr-2">
                                          <div
                                            className="flex bg-[#C31A7F33] rounded-[15px] px-2 py-2 items-center justify-center text-[16px]"
                                            onClick={() => {
                                              handleDeleteMedicine({
                                                index: index,
                                                id: item?._id,
                                              });
                                            }}
                                          >
                                            {isDeleting ? (
                                              <MdOutlineAutoDelete />
                                            ) : (
                                              <RiDeleteBinLine />
                                            )}
                                          </div>
                                        </td>
                                        <td>
                                          <div className="flex bg-[#C31A7F33] rounded-[15px] px-2 py-2 items-center justify-center text-[16px]">
                                            <MdOutlineEdit
                                              onClick={() => {
                                                toggleMedicineUpdate(it);
                                                setupdateData({
                                                  it: it,
                                                  index: index,
                                                  id: item?._id,
                                                });
                                              }}
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              );
                            });
                        })}
                    </table>
                    {updatePopup && (
                      <UpdatePopup
                        toggleMedicine={toggleMedicineUpdate}
                        data={updatedata}
                        getMedicines={getMedicines}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default MedicineReminder;

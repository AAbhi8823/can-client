import React, { useEffect, useRef, useState, useMemo } from "react";
import VerticalAppointment from "../Components/VerticalAppointment";
import VerticalMedicine from "../Components/VerticalMedicine";
import backprofile from "../Photos/profile/red.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import SingleLineCalendar from "../Components/SingleLineCalender";
import VerticalSLC from "../Components/VericalSLC";
import Page from "../Layouts/Pages";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import lock from "../Photos/lock.png";
import Cookies from "js-cookie";
import account2 from "../Photos/account2.jpg";
import UserProfile from "../Photos/UserProfile.png";
import SlideBox from "../Components/SlideBox";
import MyStory from "../Components/MyStory";
import MeetingProfile from "../Components/MeetingProfile";
import Saved from "../Components/Saved";
import { MdOutlineEdit } from "react-icons/md";
import HealthProfile from "../Components/HealthProfile";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import apis from "../Api/baseUrl";
import "./ContactUs.css";
import EditProfile from "../Components/EditProfile";

const ProfileUser = () => {
  const base_token=Cookies.get("token");
  const [userData, setUserData] = useState("");
  const [value, setValue] = React.useState(0);
  const [vertical, setVertical] = useState("Upcoming");
  const [editProfile, setEditProfile] = useState(false);
  const [editProfileId, setEditProfileId] = useState(null);
  const navigate = useNavigate();

  const LandingData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios(`${apis.GET_SINGLE_USER}`, config);
      console.log(
        "response:response " + JSON.stringify(response?.data?.resData?.data)
      );
      setUserData(response?.data?.resData?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LandingData();
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/LoginForm");
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleVertical = (item) => {
    setVertical(item);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openEditPoup = (id) => {
    setEditProfileId(id);
    setEditProfile(!editProfile);
  };

  return (
    <Page
      pageContent={
        <>
          <div className="w-full md:flex sm:block lg:px-10">
            <div className="right-div px-5 lg:w-[60%] w-[100%]">
              <div className="flex flex-col  mt-10 ">
                <div
                  className="bg-white w-[100%]  rounded-[40px] shadow-xl  "
                  style={{ position: "relative" }}
                >
                  <div className="w-full  overflow-hidden">
                    <img
                      src={backprofile}
                      alt="img.roles.fighter"
                      className="w-full h-full"
                    />

                    <div className=" top-[15%] right-[18%] text-white">
                      <h1 className="text-3xl font-semibold py-2"></h1>
                      <p className="text-xl"></p>
                    </div>
                  </div>
                  <p
                    style={{
                      position: "absolute",
                      top: "7vh",
                      right: "2vw",
                      color: "white",
                      fontSize: "2rem",
                    }}
                  >
                    Fighter <br />I will defeat cancer.
                  </p>

                  {/* <div className='rounded-full overflow-hidden absolute top-[40%] left-[10%] w-[20%] h-[%] bg-white flex justify-center items-center '> */}
                  <div className="rounded-full lg:flex bg-white">
                    <div>
                      <Avatar
                        className="w-[10vw] p-1 rounded-full"
                        src={userData?.profile_image}
                        sx={{
                          width: 150,
                          height: 150,
                          marginTop: -10,
                          marginLeft: 5,
                        }}
                      />
                    </div>
                    <div className=" w-full h-max flex justify-between  ml-5 mt-1  ">
                      <div className=" mt-1">
                        <h1 className=" text-[1.4vw] text-12  font-semibold">
                          {userData?.full_name}
                        </h1>
                        <h2 className="  text-[#C31A7F] text-12 text-[1.1vw]">
                          {userData?.user_profile}
                        </h2>
                        <h2
                          className="text-[1.2vw] text-12"
                          style={{
                            color: "#444444",
                            size: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Joined on {formatDate(userData.updatedAt)}
                        </h2>
                      </div>
                      <div className="mt-1 px-10">
                        <h2 className="text-[1vw] text-12">
                          CANID:{userData.CANID}
                        </h2>
                        <div
                          className="flex py-2 bg-[#f5d7e8ff] rounded-full "
                          style={{
                            padding: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            openEditPoup(userData?._id);
                          }}
                        >
                          <MdOutlineEdit />
                          <h4
                            className="text-[.8vw] text-12"
                            style={{ marginLeft: "5px" }}
                          >
                            Edit Profile
                          </h4>
                        </div>
                        {editProfile && <EditProfile id={editProfileId} onClose={editProfile} />}
                      </div>
                    </div>
                    <div className="mt-4">
                      <hr />
                    </div>
                  </div>
                  <hr />
                  <div className="flex float-right mr-10  ">
                    {/* SlideBox file here */}
                    <SlideBox value={value} handleChange={handleChange} />
                  </div>
                </div>
              </div>
              <div>
                <MyStory className="text-[1.5vw]" value={value} />
                <MeetingProfile handleChange={handleChange} value={value} />
                <Saved handleChange={handleChange} value={value} />
                <HealthProfile handleChange={handleChange} value={value} />
              </div>
            </div>
            <div className="flex-grow px-20 hidden lg:block ">
              <div className="lg:flex lg:flex-col lg:gap-4 lg:items-center    ">
                <div
                  className="p-6 bg-white max-h-screen relative mt-4 pb-10  rounded-[30px]  overflow-hidden border-[1px] border-solid border-[#D9EAFF]  "
                  style={{
                    boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className=" flex items-center ">
                    <SingleLineCalendar />
                  </div>

                  <div className="p-4">
                    <hr />
                  </div>

                  <div className=" text-[14px]  flex flex-row items-center justify-center gap-6">
                    <h1
                      onClick={() => toggleVertical("Upcoming")}
                      className={
                        vertical === "Upcoming"
                          ? "text-black font-semibold transition-all duration-300"
                          : "text-[#C4C4C4] font-semibold cursor-pointer"
                      }
                    >
                      Upcoming
                    </h1>
                    <h1
                      onClick={() => toggleVertical("Appointment")}
                      className={
                        vertical === "Appointment"
                          ? "text-black font-semibold transition-all duration-300"
                          : "text-[#C4C4C4] font-semibold cursor-pointer"
                      }
                    >
                      Appointment
                    </h1>
                    <h1
                      onClick={() => toggleVertical("Medicines")}
                      className={
                        vertical === "Medicines"
                          ? "text-black font-semibold transition-all duration-300"
                          : "text-[#C4C4C4] font-semibold cursor-pointer"
                      }
                    >
                      Medicines
                    </h1>
                  </div>

                  <div className="">
                    <div className="flex flex-col">
                      {vertical === "Upcoming" && (
                        <div className="w-full mt-4 ">
                          <VerticalSLC />
                        </div>
                      )}
                      {vertical === "Appointment" && (
                        <div className="w-full mt-4">
                          <VerticalAppointment />
                        </div>
                      )}
                      {vertical === "Medicines" && (
                        <div className="w-full mt-4">
                          <VerticalMedicine />
                        </div>
                      )}

                      <div className="w-full h-[10%] mt-7 top-[90%] bg-white flex justify-center items-center font-semibold">
                        <div className="bg-[#c31a7f3c] flex items-center h-10 gap-2 pl-2 rounded-3xl">
                          {vertical === "Upcoming" && (
                            <div className="flex flex-row px-4 items-center  cursor-pointer text-[15px]">
                              <p>View all schedule</p>
                              <RiArrowDropDownLine size={26} />
                            </div>
                          )}
                          {vertical === "Appointment" && (
                            <div className="flex flex-row px-4 items-center cursor-pointer text-[15px]">
                              <p>View all schedule</p>
                              <RiArrowDropDownLine size={26} />
                            </div>
                          )}
                          {vertical === "Medicines" && (
                            <div className="flex flex-row px-4 ite-center  cursor-pointer test-[15px]">
                              <p>View all</p>
                              <RiArrowDropDownLine size={26} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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

export default ProfileUser;

import React, { useEffect, useRef, useState, useMemo } from "react";
import HomeNav from "../Components/HomeNav";
import VerticalAppointment from "../Components/VerticalAppointment";
import VerticalMedicine from "../Components/VerticalMedicine";
import account from "../Photos/account.jpg";
import backprofile from "../Photos/profile/red.png";
import climberEverest from "../Photos/climberEverest.webp";
import premium from "../Photos/premium.png";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { SlPaperPlane } from "react-icons/sl";
import { BsBookmarkDash } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import SingleLineCalendar from "../Components/SingleLineCalender";
import VerticalSLC from "../Components/VericalSLC";

import FloatingChat from "../Components/FloatingChat";
import Page from "../Layouts/Pages";

import { RxCross2 } from "react-icons/rx";
import gallery from "../Photos/gallery.png";
import gificon from "../Photos/gifIcon.png";
import location from "../Photos/location.png";
import smily from "../Photos/smily.png";
import { TfiGallery } from "react-icons/tfi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import Send from "../Photos/Send.png";
import commentIcon from "../Photos/commentIcon.png";
import save from "../Photos/save.png";
import { MdPanoramaVerticalSelect } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { BsCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import CreatePost from "../Components/CreatePost";
import { BsLink45Deg } from "react-icons/bs";
import { CiFaceSmile } from "react-icons/ci";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { BiCheckCircle } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import blockuser from "../Photos/blockuser.png";
import Roles_fighter_banner from "../Photos/Roles_Fighter_banner.png";
import { AiOutlineCamera } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import lock from "../Photos/lock.png";
import Cookies from "js-cookie";
import Roles_Fighter from "../Photos/Roles_Fighter.png";
import account2 from "../Photos/account2.jpg";
import UserProfile from "../Photos/UserProfile.png";

import SlideBox from "../Components/SlideBox";
import TabPanel from "../Components/TabPanel";
import MyStory from "../Components/MyStory";

import Chart from "react-apexcharts";
import { FiSearch } from "react-icons/fi";
import {
  BsTelephone,
  BsCheck2All,
  BsThreeDotsVertical,
  BsChat,
} from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { AiOutlineSend } from "react-icons/ai";
import { GrMicrophone } from "react-icons/gr";
import crossIcon from "../Photos/crossIcon.svg";
import { AiOutlineVideoCamera } from "react-icons/ai";
import downloadIcon from "../Photos/downloadIcon.svg";
import leftarrowIcon from "../Photos/leftarrowIcon.svg";
import rightarrowIcon from "../Photos/rightarrowIcon.svg";
import removIcon from "../Photos/removeIcon.svg";
import climbeverst from "../Photos/climberEverest.webp";
import c3 from "../Photos/c3.png";
import c4 from "../Photos/c4.png";
import flight from "../Photos/MoreIcons/flight.png";
import share from "../Photos/MoreIcons/share.png";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import Icon from "../Photos/Icon.png";
import Healthrecfolder from "../Photos/Healthrecfolder.png";
import { CgAdd } from "react-icons/cg";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import { TbClipboardList } from "react-icons/tb";
import MeetingProfile from "../Components/MeetingProfile";
import Saved from "../Components/Saved";
import { MdOutlineEdit } from "react-icons/md";
import HealthProfile from "../Components/HealthProfile";
import { baseurl } from "../Api/baseUrl";
import axios from "axios";

const ProfileUser = () => {
  const [userData, setUserData] = useState();
  const [value, setValue] = React.useState(0);
  const [vertical, setVertical] = useState("Upcoming");
  const navigate = useNavigate();
  console.log("navigator>>>>>:::", navigator.geolocation);
  const LandingData = async () => {
    try {
      const token = Cookies.get("token");
      const homeUser = localStorage.getItem("active_user");
      const response = await axios.post(
        `${baseurl}/v1/userprofile/get-user-profile-list`,
        {
          headers: {
            // Headers
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.data);
      console.log("response.data", response.data);
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

  const formattedDate = useMemo(() => {
    if (userData && userData.createdAt) {
      const date = new Date(userData.createdAt);
      const options = { month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
    return "";
  }, [userData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleVertical = (item) => {
    setVertical(item);
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
                    Fighte <br />I will defeat cancer.
                  </p>

                  {/* <div className='rounded-full overflow-hidden absolute top-[40%] left-[10%] w-[20%] h-[%] bg-white flex justify-center items-center '> */}
                  <div className="rounded-full lg:flex bg-white">
                    <div>
                      <Avatar
                        className="w-[10vw] p-1 rounded-full"
                        src={UserProfile}
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
                          {/* {userData?.username} */}
                          User Name
                        </h1>
                        <h2 className="  text-[#C31A7F] text-12 text-[1.1vw]">
                          {/* {userData?.profile_category?.category_Name} */}
                          category Name
                        </h2>
                        <h2
                          className="text-[1.2vw] text-12"
                          style={{
                            color: "#444444",
                            size: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {/* Joined on {formattedDate} */}
                          Joined on 2023
                        </h2>
                      </div>
                      <div className="mt-1 px-10">
                        <h2 className="text-[1vw] text-12">
                          {/* CANID:{userData?.can_id} */}
                          CANID:Shri2121
                        </h2>
                        <div
                          className="flex py-2 bg-[#f5d7e8ff] rounded-full "
                          style={{
                            padding: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                {/* right side */}

                <div className="h-[35%] justify-center  w-[100%] flex mt-8 ">
                  <div
                    className=" md:w-[360px] lg:w-[331px]  sm:w-[330px]  bg-[#fff] mt-2   backdrop-blur-md rounded-[20px]"
                    style={{
                      boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div>
                      {/* <img src={vtwo}   className='object-contain rounded-[20px]' alt='none' /> */}
                    </div>

                    <div className="p-4 mx-4 mt-3 lg:text-[14px]   text-[14px] text-center">
                      <h1 className="spce-1 w-[100%] font-semibold ">
                        You can add the profile of your <br /> Caregiver
                        byclicking on the Add profile button.
                      </h1>
                    </div>
                    <div className="h-[50%] w-[100%] px-[12px] items-center flex justify-between relative">
                      <div
                        className="w-[46%] h-[75%] pb-8 bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer "
                        style={{
                          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <Avatar alt="Cindy Baker" src={UserProfile} />
                        <h1 className="font-semibold text-lg ">
                          {/* {userData?.username} */}
                          username
                        </h1>
                        <p className="text-sm">
                          {/* {userData?.profile_category?.category_Name} */}
                          Category Name
                        </p>
                        <img src={lock} alt="none" className="h-5 w-5 mt-1" />
                        <div className="absolute -top-5 rounded-full overflow-hidden bg-white w-[15%] h-[] ">
                          {/* <img src={account} alt='none' className='p-1 rounded-full' /> */}
                        </div>
                      </div>

                      <div
                          className="w-[46%] h-[75%] pb-8  bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer "
                          style={{
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <div className="w-[45%] h-[100%]">
                            <div className="h-full  rounded-3xl flex flex-col justify-center items-center">
                              <Avatar alt="Cindy Baker" src={account2} />
                              <h1 className="font-semibold text-lg ">Sierra</h1>
                              <p className="text-sm text-center">Caregiver</p>
                              <img
                                src={lock}
                                alt="none"
                                className="h-5 w-5 mt-1"
                              />
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                {/* calender */}
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

{
  /* Add more sections as needed */
}
// </div>
{
  /*-------------- MY story ---------------------- */
}

{
  /*------------- CHAT------------------------- */
}

{
  /* <div className="  mt-10 flex items-center">
                                
                                <div className="  w-full  ">
                                <div className="  bg-white  rounded-3xl  shadow-2xl">
                                    <div className="flex h-full w-full">
                                
                                    <div className="pt-4 px-4 lg:block  hidden w-[330px] border-r-2">
                                        <div className="flex items-center gap-2 mt-3 p-2 bg-white rounded-3xl" style={{ boxShadow: "0px 10px 30px 0px #0000000D" }}>
                                        <FiSearch color="black" />
                                        <input placeholder="Search" className="outline-none overflow-hidden" />
                                        </div>

                                        <h2 className="mt-5 font-semibold">Group's</h2>

                                        <div className="flex overflow-x-scroll py-4 w-full scrl-1 mb-3" >
                                        <div className="flex" style={{ width: "fit-content" }}>
                                            {Groups.map((item) => (
                                            <div key={item.id} className="w-24  flex flex-col items-center">
                                                <div className="w-14 h-14 border-red-600 border-2 rounded-full flex items-center justify-center">
                                                <img
                                                    src={account2}
                                                    alt={item.name} 
                                                    className="w-12 h-12 rounded-full object-cover" 
                                                />
                                                </div>

                                                <p className="font-semibold text-[14px]">{item.name}</p>
                                                <p className=" text-[12px]">{item.groupName}</p>
                                            </div>
                                            ))}
                                        </div>
                                        </div>

                                    
                                        <div className=" flex pt-3 justify-between  relative">
                                        <div
                                            className={
                                            chats
                                                ? "font-bold border-b-2 w-1/4 flex items-center justify-center transform-all ease-in-out duration-500 border-[#8B1539] text-[#8B1539] cursor-pointer"
                                                : "font-bold border-b-2 w-1/4 flex items-center justify-center border-[#C4C4C4] text-[#C4C4C4] cursor-pointer"
                                            }
                                            onClick={toggleReq}
                                        >
                                            <h2 className="font-18 mb-2">Chat</h2>

                                        </div>
                                        <div
                                            className={
                                            !chats
                                                ? "font-bold border-b-2 w-1/2 flex vcvc items-center justify-center transform-all ease-in-out duration-500 border-[#8B1539] text-[#8B1539] cursor-pointer"
                                                : "font-bold border-b-2 w-1/2 flex vcvc items-center justify-center border-[#C4C4C4] text-[#C4C4C4] cursor-pointer"
                                            }
                                            onClick={toggleReq}
                                        >
                                            <h2 className="font-18 mb-2">Requests</h2>

                                        </div>
                                        </div>

                                        

                                        {chats && (
                                        <div className="flex flex-col mt-2 gap-6 h-[320px] scrl    overflow-y-scroll " style={{}}>

                                            {AllChats.map((item) => (
                                            <div className="flex flex-row items-center gap-5" key={item.id}>
                                                <div className="relative">
                                                <img
                                                    src={account2} alt={item.name}
                                                    className="h-12 w-9 rounded-full  "
                                                />
                                                <div className=" absolute top-0 right-0 h-3 w-3 flex items-center justify-center rounded-full text-[10px] text-white  bg-[#C31A7F]">2</div>
                                                <div className=" absolute bottom-0 right-2 h-2 w-2 flex items-center justify-center rounded-full text-[10px] text-white  bg-[#11D800]"></div>
                                                </div>

                                                <div className="flex flex-row gap-3 justify-between">
                                                <div className="flex flex-col     ">
                                                    <h1 className=" text-[14px] "> {item.name.length > 12 ? item.name.slice(0, 12) + "..." : item.name}</h1>
                                                    <p className=" text-[12px]  ">{item.message}</p>
                                                </div>
                                                <p className="text-[10px] ml-1 ">{item.time}</p>
                                                </div>
                                                <BsCheck2All className="flex item-center justify-center" color="#C4C4C4" size={13} />
                                            </div>
                                            ))}


                                        </div>
                                        )}

                                

                                        {!chats && (

                                        <div className="overflow-y-scroll h-[330px] scrl">
                                            {AllRequests.map((item) => (
                                            <div className="">

                                                <div className="flex flex-row gap-4 pt-4 items-center " key={item.id}>
                                                <img
                                                    src={account2} alt="none"
                                                    className="h-10 w-10 rounded-full"
                                                />
                                                <div>
                                                    <div className="flex flex-row item-center gap-3 justify-between">
                                                    <div className="flex flex-col items-start     ">
                                                        <h1 className="font-bold">{item.name.length > 12 ? item.name.slice(0, 12) + "..." : item.name}</h1>
                                                        <p className=" text-[12px] ">{item.message}</p>
                                                    </div>
                                                    <p className="text-[10px] ml-5 text-center">{item.time}</p>
                                                    </div>


                                                </div>
                                                </div>
                                                <div className="flex justify-evenly  pt-2 pl-7  items-center">
                                                <div className="cursor-pointer rounded-3xl     text-[#C31A7F]">
                                                    Reject
                                                </div>
                                                <div className="  cursor-pointer rounded-3xl text-[#efc419d4]">
                                                    Accept!
                                                </div>
                                                <div className="h-6 w-6 ml-5 bg-white flex items-center justify-center rounded-full   " style={{
                                                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.5)'
                                                }}>
                                                    {" "}
                                                    <AiOutlineEye />{" "}
                                                </div>
                                                </div>
                                                <hr className="mt-4" />
                                            </div>

                                            ))}
                                        </div>

                                        )}
                                    </div>

                                    
                                    <div className=" w-full  ">


                                        <div className=" bg-[#F5F5F5] h-full relative overflow-hidden lg:rounded-r-3xl rounded-3xl flex flex-col justify-between  ">
                                        <div className="flex bg-white h-[10vh]">
                                            <div className=" w-full flex px-6 items-center  ">
                                            <img src={account} alt='userImage' className="rounded-full w-[6%]" />
                                            <h2 className="px-2 font-bold">Sierra's Group</h2>
                                            </div>

                                        </div>


                                
                                        <div className="  pr-10  h-80 w-full overflow-y-scroll flex flex-col-reverse items-end relative">
                                            {result.reverse().map((itemValue, index) => {
                                            if (itemValue) {
                                                return (
                                                <div className="relative">
                                                    <p
                                                    className="m-2 bg-[#86C6C5] p-2 w-max rounded-xl text-right text-white cursor-pointer"
                                                    key={index}
                                                    style={{ borderRadius: '10px 10px 0px 10px' }}
                                                    onClick={() => toggleMessagePopUp(index)}
                                                    >
                                                    {itemValue}
                                                    <br />
                                                    <p className="text-[10px]  flex flex-row items-center justify-end gap-4">
                                                        {getCurrentTime()}
                                                        <BsCheck2All color="#C31A7F" size={13} />
                                                    </p>
                                                    </p>

                                                    {messagePopUp === index && (
                                                    <div className="bg-white w-[100px] right-32 p-4 flex flex-col items-center justify-center gap-2 " ref={messgOutsClick}>
                                                        <p className="text-[14px] cursor-pointer">Edit</p>
                                                        <p className="text-[14px] cursor-pointer">Reply</p>
                                                        <p className="text-[14px] cursor-pointer">Forward</p>
                                                        <p className="text-[14px] cursor-pointer" onClick={toogleDeleteMsgPopUp}>Delete</p>
                                                    </div>
                                                    )}

                                                </div>


                                                )
                                            }


                                            })}
                                    

                                            {imageResult.reverse().map((item, index) => {
                                            if (item) {
                                                return (
                                                <div className="flex flex-col justify-center mt-2 " key={index}>
                                                    <img
                                                    src={item}
                                                    alt="Selected"
                                                    style={{
                                                        maxWidth: "100px",
                                                        borderRadius: '20px 20px 0px 20px'
                                                    }}
                                                    className=""
                                                    onClick={() => toggleMessagePopUp(index)}
                                            
                                                    />

                                                    <br />
                                                    <p>
                                                    <p className="text-[10px]  flex flex-row items-center justify-end gap-4">
                                                        {getCurrentTime()}
                                                        <BsCheck2All color="#C31A7F" size={13} />
                                                    </p>
                                                    </p>
                                                    {messagePopUp === index && (
                                                    <div className="bg-white w-[100px] right-32 p-4 flex flex-col items-center justify-center gap-2 " ref={messgOutsClick}>
                                                        <p className="text-[14px] cursor-pointer">Edit</p>
                                                        <p className="text-[14px] cursor-pointer">Reply</p>
                                                        <p className="text-[14px] cursor-pointer">Forward</p>
                                                        <p className="text-[14px] cursor-pointer" onClick={toogleDeleteMsgPopUp}>Delete</p>
                                                    </div>
                                                    )}

                                                </div>
                                                )
                                            }

                                            })}


                                        </div>

                                        <div className="ml-10 flex flex-row items-center">
                                            <img className="w-12 h-12 rounded-full " src={account2} alt='incomingImage' style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                                            <p className="m-2 bg-white p-2 w-max rounded-xl text-right text-black text-[14px]  " style={{ borderRadius: '10px 10px 10px 0px' }}>message</p>
                                        </div>
                                        <div className="flex flex-row   w-full mb-7">
                                            <div className="bg-white w-full p-2 px-4 shadow-2xl rounded-2xl flex justify-between items-center mx-5">
                                            <input
                                                type="text"
                                                placeholder="Type your message...."
                                                className="w-[90%] outline-none"
                                                onChange={inputTaken}
                                                value={text}
                                            />
                                    
                                            <label>
                                                <input
                                                type="file"
                                                accept="image/*" 
                                                style={{ display: "none" }}
                                                onChange={HandleImageSend}
                                                />
                                                <ImAttachment color="#C4C4C4" />
                                            </label>
                                            </div>



                                            <div className="flex relative items-center justify-center mr-6 gap-3">
                                            <div
                                                onClick={listOfItems}
                                                className="bg-[#C31A7F] p-2 rounded-full shadow-gray-950 shadow-2xl"
                                            >
                                                {" "}
                                                <AiOutlineSend size={20} color="white" />
                                            </div>
                                            <div className="bg-[#ffffff] p-2 rounded-full shadow-gray-950 shadow-2xl">
                                                {" "}
                                                <GrMicrophone size={20} />
                                            </div>
                                            </div>
                                        </div>



                                        </div>

                                    </div>
                                    {!Info && (
                                        <div className="bg-white  text-center m-5 query-1 rounded-3xl  w-[450px] overflow-hidden px-4  relative" >
                                        <img onClick={handleClick} className="w-8 cursor-pointer mt-[5%] one-1" src={crossIcon} alt="cross" />
                                        <div className='absolute right-5 top-5'>
                                            <BsThreeDotsVertical className="cursor-pointer" onClick={handleMuteClick} />
                                        </div>

                                        {muteShow && (
                                            <div className="absolute top-10 right-2 w-[160px] p-4 bg-white flex flex-col  justify-start gap-4 " ref={threeDotsOutClick} style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.10)' }}>
                                            <div className="flex flex-row item-center justify-between">
                                                <p className="text-[14px] text-[#484848] ">Mute</p>
                                                <div>
                                                <div
                                                    className={`flex rounded-[30px] w-[45px] p-1 ${toggleStates ? ' bg-[#C31A7F] justify-end' : 'justify-start bg-[#E2E2E2]'
                                                    }`}
                                                    style={{ boxShadow: '0px 15px 30px rgba(139, 21, 57, 0.10' }}
                                                    onClick={toggleButton}
                                                >
                                                    <div className='bg-[#fff] text-white rounded-[100%] w-[20px] h-[20px]' ></div>
                                                </div>

                                                </div>

                                            </div>
                                            <hr />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[14px] text-[#484848] ">Select messages</p>
                                                <p className="text-[14px] text-[#484848] ">Clear messages</p>
                                            </div>
                                            </div>
                                        )}
                                        <div>
                                            <div className="flex flex-col items-center mt-5 gap-2 justify-center pt-7">
                                            <img className="h-14 w-14 object-cover rounded-full " src={account} alt="none" />
                                            <h1 className="text-[14px]  font-semibold">Shriniwasan’s Group</h1>
                                            <p className="text-[12px]  ">Group Members 5/7</p>
                                            <div className="flex flex-row gap-3">
                                                <AiOutlineVideoCamera className="cursor-pointer" size={13} />
                                                <BsTelephone className="cursor-pointer" size={13} />
                                            </div>
                                            <p className="text-[10px]  text-[#7E7E7E]">Group Create by 18/06/2023 </p>
                                            <div className="w-full h-24 flex flex-col gap-3  bg-white rounded-3xl"
                                                style={{ boxShadow: '0px 10px 30px 0px rgba(139, 21, 57, 0.10)' }}>
                                                <div className="flex flex-row px-5 pt-1 justify-between">
                                                <p className="text-[10px] font-semibold ">Media Shared in the group</p>
                                                <p onClick={handleViewClick} className="text-[10px]  underline text-[#4B65C2] cursor-pointer">View All</p>
                                                </div>

                                                {viewAll && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50  ">

                                                    <div className="bg-white w-25 p-4 rounded-[20px]  ">
                                                    <div className="flex flex-row items-center justify-between px-4">
                                                        <div className="flex flex-row items-center gap-2">
                                                        <img className="w-10 h-10 rounded-full" src={account2} alt="accountimage" />
                                                        <p className="text-[14px]  font-semibold">Shriniwasan’s Group</p>
                                                        </div>
                                                        <div className="flex flex-row items-center gap-2">
                                                        <img className="w-8" src={downloadIcon} alt='download' />
                                                        <img onClick={handleViewClick} className="w-8 cursor-pointer" src={crossIcon} alt="cross" />
                                                        </div>
                                                    </div>

                                                    <div className="pt-5 ">

                                                        <div className="flex flex-row items-center justify-between">
                                                        <img
                                                            className="cursor-pointer w-16"
                                                            src={leftarrowIcon}
                                                            alt="leftarrow"
                                                            onClick={handlePrevImage}
                                                        />

                                                        <div className=" ">
                                                            <img
                                                            className="max-w-[300px] max-h-[300px] object-cover"
                                                            src={viewAllImmages[currentImageIndex].image}
                                                            alt="slide"
                                                            />
                                                        </div>
                                                        <img
                                                            className="cursor-pointer w-16"
                                                            src={rightarrowIcon}
                                                            alt="rightarrow"
                                                            onClick={handleNextImage}
                                                        />
                                                        </div>

                                                    </div>

                                                    <div className="flex flex-row items-center justify-center gap-4 py-10">
                                                        {viewAllImmages.map((item) => (
                                                        <div key={item.id} className="">
                                                            <img className="max-w-[200px] max-h-[100px]" src={item.image} alt="media" />
                                                        </div>
                                                        ))}
                                                    </div>


                                                    </div>

                                                </div>
                                                )}

                                                <div className="flex flex-row items-center justify-evenly ">
                                                <img className="h-12 w-9 object-cover rounded-full " src={account} alt="none" style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                                                <img className="h-12 w-9 object-cover rounded-full " src={account} alt="none" style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                                                <img className="h-12 w-9 object-cover rounded-full " src={account} alt="none" style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                                                </div>

                                            </div>
                                            </div>
                                            <h1 className="text-[22px] mt-5  font-semibold pl-3 pt-2">Group Members</h1>
                                            <div className="pt-2">
                                            <div className="flex flex-row gap-4 items-center ">
                                                <div className="h-10 w-10 rounded-full border-2 border-red-500 flex items-center justify-center">
                                                <img className="h-8 w-8 rounded-full object-cover " src={account} alt='none' />
                                                </div>
                                                <p className="text-[10px]  font-semibold text-[#7E7E7E]">You</p>

                                            </div>
                                            <hr className="mt-2" />
                                            </div>
                                            <div className="h-[180px] overflow-y-scroll scrl-h pr-3 relative ">
                                            {GroupMembers.map((item) => (
                                                <div className="" >
                                                <div className="pt-2 flex flex-row justify-between items-center" key={item.id}>

                                                    <div className="flex flex-row gap-4 items-center ">
                                                    <div className="h-10 w-10 rounded-full border-2 border-red-500 flex items-center justify-center">
                                                        <img className="h-8 w-8 rounded-full object-cover " src={item.image} alt='none' />
                                                    </div>
                                                    <p className="text-[10px]  font-semibold text-[#7E7E7E]">{item.name}</p>

                                                    </div>
                                                    <div className="flex flex-row gap-1">
                                                    
                                                    <BsChat className="cursor-pointer" size={13} />
                                                    <BsThreeDotsVertical className="cursor-pointer" size={13} onClick={handleViewUserSettings} />
                                                    </div>




                                                </div>
                                                <hr className="mt-2" />
                                                </div>
                                            ))}
                                            {ViewUsers && (
                                                <div className="absolute top-10 right-5 bg-white w-[100px] p-1" style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.10)' }} ref={ViewUserOutClick}>
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    <p className=" text-[12px] text-[#7E7E7E] cursor-pointer ">View Profile</p>
                                                    <p className=" text-[12px] text-[#7E7E7E] cursor-pointer " onClick={handleReportuser}>Report</p>
                                                    <p className=" text-[12px] text-[#7E7E7E] cursor-pointer " onClick={handleBlockUser}>Block</p>
                                                    <p className="  text-[#C31A7F] text-[12px] cursor-pointer" onClick={toggleRemovePopUp}>Remove as friend</p>
                                                </div>
                                                </div>
                                            )}
                                            </div>

                                            <div className="flex items-center justify-center py-2 ">
                                            <div className="bg-white flex items-center justify-center rounded-[20px] h-10 w-32" style={{ boxShadow: '0px 10px 30px 0px rgba(139, 21, 57, 0.10)' }}>
                                                <div className="flex flex-row items-center justify-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M14.1 7.55953C13.79 3.95953 11.94 2.48953 7.89 2.48953H7.76C3.29 2.48953 1.5 4.27953 1.5 8.74953V15.2595C1.5 19.7295 3.29 21.5195 7.76 21.5195H7.89C11.91 21.5195 13.76 20.0695 14.09 16.5295M8 11.9995L19.38 11.9995M17.15 8.64953L20.5 11.9995L17.15 15.3495" stroke="#C31A7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <p className="text-[12px]   text-[#C31A7F]">Leave Group</p>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                </div>
                            </div> 
                          {Reportuser && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="w-[400px] bg-white p-4 flex flex-col gap-4 rounded-[20px]">
                                    <div className="flex flex-col gap-4">
                                    <h1 className="text-[18px]    text-[#C31A7F] font-semibold">Report  Ananya Nagpal</h1>
                                    <p className="text-[14px]  text-[#7E7E7E]">The last 5 message from this user will be forwarded to CAN. This user will not be notified.</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <input className="accent-[#C31A7F]" type="checkbox" />
                                        <p className="text-[14px] text-[#7E7E7E] ">Block user and delete chat</p>
                                    </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2 justify-end">
                                    <button className="w-20 h-10 border border-[#7E7E7E] rounded-[10px] text-[14px] " onClick={handleReportuser}>Cancel</button>
                                    <button className="w-20 h-10 bg-[#C31A7F] text-white rounded-[10px] text-[14px] " onClick={handleReportuser}>Report</button>
                                    </div>
                                </div>
                                </div>
                            )} 
                            {blockUser && (
                                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2' >
                                <div className=' bg-[#FFFFFF] flex flex-col items-center py-10 gap-6 rounded-[30px] px-16 ' ref={ViewUserOutClick}>
                                    <div>
                                    <img className='w-14' src={blockuser} alt='none' />
                                    </div>
                                    <div className='flex flex-col items-center gap-3'>
                                    <h1 className='  text-[#C31A7F] text-[18px] font-semibold'>Block Sierra Ferguson</h1>
                                    <p className='text-[14px] text-[#7E7E7E] font-semibold'>Do you really want to block this user</p>
                                    </div>
                                    <div className='flex flex-row items-center gap-5'>
                                    <p className='w-20 rounded-lg h-9 bg-transparent border-[#7E7E7E] border flex items-center justify-center text-[14px] text-[#7E7E7E] font-semibold cursor-pointer' onClick={handleBlockUser}>
                                        Cancel
                                    </p>
                                    <p className='w-20 rounded-lg h-9 bg-[#C31A7F] text-[#FFFFFF] flex items-center justify-center text-[14px] font-semibold cursor-pointer' onClick={toggleBlockTab}>
                                        Block
                                    </p>

                                    {userblocked && (
                                        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2'>
                                        <div className='bg-[#FFFFFF] flex flex-col items-center py-11 gap-7 rounded-[30px] px-32 relative ' ref={ViewUserOutClick} >
                                            <div className='absolute right-6 top-6  cursor-pointer' >
                                            <IoMdClose size={18} onClick={toggleBlockTab} />
                                            </div>
                                            <div>
                                            <img className='w-28' src={blockuser} alt='none' />
                                            </div>
                                            <div className='flex flex-col items-center gap-1'>
                                            <h1 className='  text-[#C31A7F] text-[18px] font-semibold'>Sierra Ferguson</h1>
                                            <p className='text-[14px] text-[#7E7E7E] font-semibold'>Has been Blocked</p>
                                            </div>
                                        </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                </div>
                            )} 
                             {removeUserPop && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="w-[350px] bg-white p-6 flex flex-col gap-4 rounded-[20px]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                    <img className="w-16 " src={removIcon} alt="remove" />
                                    <h1 className="text-[16px]    text-[#C31A7F] ">Remove Ananya Nagpal</h1>
                                    <p className="text-[14px]  text-center text-[#7E7E7E]">Are you sure you want to remove this person as a friend</p>

                                    </div>
                                    <div className="flex flex-row items-center gap-4 justify-center">
                                    <button className="w-20 h-10 border border-[#7E7E7E] rounded-[10px] text-[14px] " onClick={toggleRemovePopUp}>Cancel</button>
                                    <button className="w-20 h-10 bg-[#C31A7F] text-white rounded-[10px] text-[14px] " onClick={toggleRemovePopUp}>Remove</button>
                                    </div>
                                </div>
                                </div>
                            )} 
                            { 
                            deleteMsg && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className=" bg-white py-10 px-20 flex flex-col gap-4 rounded-[20px]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M68 35C68 53.2254 53.2254 68 35 68C16.7746 68 2 53.2254 2 35C2 16.7746 16.7746 2 35 2C53.2254 2 68 16.7746 68 35ZM70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35ZM38.125 25L36.875 23.75H31.875L30.625 25H26H25V26V27.75V28.75H25.25H26H26.25V29.75V43.75C26.25 44.7446 26.6451 45.6984 27.3484 46.4016C28.0516 47.1049 29.0054 47.5 30 47.5H38.75C39.7446 47.5 40.6984 47.1049 41.4016 46.4016C42.1049 45.6984 42.5 44.7446 42.5 43.75V29.75V28.75H42.75H43.5H43.75V27.75V26V25H42.75H38.125ZM27.25 26.25H31.25L32.5 25H36.25L37.5 26.25H41.5H42.5V26.5V27.25V27.5H41.5H27.25H26.25V27.25V26.5V26.25H27.25ZM27.5 43.75V29.75V28.75H28.5H40.25H41.25V29.75V43.75C41.25 44.413 40.9866 45.0489 40.5178 45.5178C40.0489 45.9866 39.413 46.25 38.75 46.25H30C29.337 46.25 28.7011 45.9866 28.2322 45.5178C27.7634 45.0489 27.5 44.413 27.5 43.75ZM30 31.25H30.25H31H31.25V32.25V42.75V43.75H31H30.25H30V42.75V32.25V31.25ZM37.5 31.25H37.75H38.5H38.75V32.25V42.75V43.75H38.5H37.75H37.5V42.75V32.25V31.25Z" fill="#C31A7F" />
                                    </svg>
                                    <h1>Delete Message?</h1>
                                    <button className="border-2 border-[#C31A7F] p-2 flex items-center justify-center rounded-xl h-10 w-full text-[14px]   text-[#C31A7F]  font-semibold ">
                                        Delete For Everyone
                                    </button>
                                    <div className="flex flex-row items-center gap-4 justify-center">
                                        <button className="w-20 h-10 border border-[#7E7E7E] rounded-[10px] text-[14px] " onClick={toogleDeleteMsgPopUp} >Cancel</button>
                                        <button className="w-20 h-10 bg-[#C31A7F] text-white rounded-[10px] text-[14px] " onClick={() => { DeleteImages(); DeleteMessages() }}>Delete</button>
                                    </div>
                                    </div>
                                </div>

                                </div>
                            )} 
                            {imageshowPopup && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className='bg-white flex flex-col items-center rounded-[20px] justify-center p-10  '>
                                    <img src={imageshowPopup} alt='Uploaded' className=' w-[200px] rounded-lg  ' />
                                    <div className="flex flex-row items-center justify-between pt-10 w-full">
                                    <button className="h-10 rounded-xl w-20 p-2 border border-[#7E7E7E] text-[12px]  text-center" onClick={toggleImageShowPopUp}>Cancel</button>
                                    <button className="h-10 w-20 rounded-xl p-2 bg-[#C31A7F] text-white text-[12px] text-center" onClick={listOfImage}>Send</button>
                                    </div>
                                </div>
                                </div>
                            )} */
}

{
  /*---------------- -------Health Record------------ */
}

// </div>
// </div>

{
  /* <div className='left-div px-10' >

                            <div className=' bg-[#fff] w-[100%] mt-10 rounded-[30px] border-[1px] border-solid border-[#D9EAFF] ' style={{
                                boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)'
                            }}>
                                <div className='p-4 '>
                                    <h1 className='font-semibold text-[22px]'>Sub users</h1>
                                </div>
                                <div className='flex p-3'>
                                    <Avatar
                                        className='w-[100%]  p-1 rounded-full'
                                        src={UserProfile}
                                        sx={{ width: 70, height: 70 }}
                                    />
                                    <div className=" ml-3">
                                        <h2 className='font-semibold'>Ambert Heared</h2>
                                        <h2 className='font-semibold'> Caregiver</h2>
                                    </div>
                                </div>
                                <div className='flex p-3 pb-10'>
                                    <Avatar
                                        className='w-[100%]  p-1 rounded-full'
                                        src={UserProfile}
                                        sx={{ width: 70, height: 70 }}
                                    />
                                    <div className=" ml-3">
                                        <h2 className='font-semibold'>Ambert Heared</h2>
                                        <h2 className='font-semibold'> Caregiver</h2>
                                    </div>
                                </div>


                            </div>

                            <div className='   bg-white max-h-screen w-[100%] mt-4   rounded-[30px]  overflow-hidden border-[1px] border-solid border-[#D9EAFF]  ' style={{
                                boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)'
                            }}>

                                <div>
                                    <h2 className='text-[22px] text-center font-semibold pt-3 pb-3'>User Transcation history</h2>
                                </div>

                                <div className='flex text-center bg-[#08494366] p-3'>
                                    <h6 className='font-semibold p-2'>Sr.No.</h6>
                                    <h2 className='font-semibold p-2'>Subject</h2>
                                    <h2 className='font-semibold p-2'>Transcation </h2>
                                    <h2 className='font-semibold p-2'>Date</h2>
                                    <h2 className='font-semibold p-2'>Amount</h2>
                                </div>
                                <div className='flex text-center px-3 p-3'>
                                    <h2 className='font-semibold p-2'>01</h2>
                                    <h2 className='font-semibold p-2'>Premium subs.</h2>
                                    <h2 className='font-semibold  p-2'>#11123</h2>
                                    <h2 className='font-semibold p-2'>20-02-23</h2>
                                    <h2 className='font-semibold p-2'>$40</h2>
                                </div>
                                <div className='flex text-center   p-3'>
                                    <h2 className='font-semibold p-2'>01</h2>
                                    <h2 className='font-semibold p-2'>Premium subs.</h2>
                                    <h2 className='font-semibold p-2'>#11123</h2>
                                    <h2 className='font-semibold p-2'>20-02-23</h2>
                                    <h2 className='font-semibold p-2'>$40</h2>
                                </div>
                            </div>


                            <div className='flex bg-white w-[100%]     mt-4 border-solid border-[#D9EAFF]  rounded-[30px] border-[1px]' style={{
                                boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)'
                            }}>

                                <div>
                                    <Chart className=' justify-center items-center' style={{ justifyContent: "center" }} options={pie.options} series={pie.series} type="donut" width="270" />
                                </div>
                                <div className='pr-3'>
                                    <h2 className='text-[20px] p-3 font-semibold'>Subscription </h2>
                                    <h2 className='text-[15px]  font-semibold text-green-600'>Renewed on </h2>
                                    <h2 className='text-[24px] p-3 pt-0 font-bold'>20-04-23 </h2>
                                    <h2 className='text-[15px]  font-semibold text-pink-600'>Expire on </h2>
                                    <h2 className='text-[24px] p-3 pt-0 font-bold'>20-05-23 </h2>
                                </div>

                            </div>
                        </div> */
}
{
  /* </div> */
}

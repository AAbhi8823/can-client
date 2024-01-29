import React, { useEffect, useRef, useState } from "react";
import more from "../Photos/more.png";

import CANnn from "../Photos/MoreIcons/CANnn.png";
import help from "../Photos/MoreIcons/help.png";
import logout from "../Photos/MoreIcons/logout.png";
import setting from "../Photos/MoreIcons/setting.png";
import home from "../Photos/home.png";
import meeting from "../Photos/meeting.png";
import chat from "../Photos/chat.png";
import createPost from "../Photos/createPost.svg";
import healthRec from "../Photos/healthRec.png";
import healthCard from "../Photos/healthCard.png";
import appointment from "../Photos/appointment.png";
import medicine from "../Photos/medicine.png";
import { NavLink, useLocation } from "react-router-dom";
import CreatePost from "./CreatePost";
import iconRight from "../Photos/iconRight.png";
import iconLeft from "../Photos/iconLeft.png";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";
import CanLogo from "../Photos/CanLogo.png";
import share from "../Photos/MoreIcons/share.png";
import frame33 from "../Photos/frame33.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import frame34 from "../Photos/frame34.png";
import { baseurl } from "../Api/baseUrl";
import axios from "axios";
const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("isOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });
  const [isiconVisible, setIsiconVisible] = useState(true);
  const [showmore, setShowmore] = useState(false);
  const [uploadPosts, setUploadPosts] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const [userData, setUserData] = useState();
  const [logOut, setLogOut] = useState(false);
  const location = useLocation();
  const showmoreOutclick = useRef(null);
  const navigate = useNavigate();
  const logoutDivRef = useRef(null);
  const sideMenuDivRef = useRef(null);
  const currentPathname = location.pathname;

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    setIsiconVisible(!isiconVisible);
  };

  useEffect(() => {
    // Store the 'isOpen' state in localStorage whenever it changes
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const uploadPost = () => {
    setUploadPosts(!uploadPosts);
  };

  function close_createPost() {
    setUploadPosts(!uploadPosts);
  }
 
  const handleLogOut = () => {
    Cookies.remove("authToken", { path: "/" });;
    
    navigate("/"); 
  };

  useEffect(() => {
    // Set the active page based on the current URL path
    setActivePage(
      currentPathname.startsWith("/Appointment")
        ? "/Appointment"
        : currentPathname.startsWith("/Medicine")
        ? "/Medicine"
        : currentPathname.startsWith("/HealthCard")
        ? "/HealthCard"
        : currentPathname.startsWith("/HealthRecord")
        ? "/HealthRecord"
        : currentPathname
    );
  }, [currentPathname]);

  const LandingData = async () => {
    const token = Cookies.get("token");
    const homeUser = localStorage.getItem("active_user");
    try {
      const userData = await axios.post(
        `${baseurl}/api/singleuser?token=${token}`,
        {
          id: `${homeUser}`,
        }
      );
      setUserData(userData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LandingData();
  }, []);

  function showmoreToggle() {
    setShowmore(!showmore);
  }

  
  
 

  useEffect(() => {
    const handleClickOutsideLogout = (event) => {
      if (
        logOut &&
        logoutDivRef.current &&
        !logoutDivRef.current.contains(event.target)
      ) {
        setLogOut(false);
      }
    };
    document.addEventListener("click", handleClickOutsideLogout, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideLogout, true);
    };
  }, [logOut,logoutDivRef]);

  useEffect(() => {
    const handleClickOutsideshowmore = (event) => {
      if (
        showmoreOutclick.current &&
        !showmoreOutclick.current.contains(event.target)
      ) {
        setShowmore(false);
      }
    };
    document.addEventListener("click", handleClickOutsideshowmore, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideshowmore, true);
    };
  }, [showmoreOutclick]);

 
  useEffect(() => {
    const handleClickOutsideSideMenu = (event) => {
      if (
        isOpen === false &&
        sideMenuDivRef.current &&
        !sideMenuDivRef.current.contains(event.target)
      ) {
        setIsOpen(true);
      }
    };
  
    document.addEventListener("click", handleClickOutsideSideMenu, false);
    return () => {
      document.removeEventListener("click", handleClickOutsideSideMenu, false);
    };
  }, [isOpen, sideMenuDivRef]);


  return (
    <>
      <div ref={sideMenuDivRef} className="relative">
        <div
          className={`lg:relative fixed h-[100vh] z-50 bg-[#fff] border-[1px] border-solid border-[#D9EAFF] transition-all duration-300 flex flex-col justify-between ${
            isOpen ? "w-[0px] lg:w-[100px]" : "lg:w-[300px]  w-[350px] "
          }`}
          style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)" }}
        >
          <div>
            {/* LOGo */}
            <div
              className={`flex flex-col gap-1 items-center justify-center  ${
                isOpen ? "flex flex-col gap-1 " : ""
              }`}
            >
              <NavLink to={"/"}>
                <img
                  src={LogoCAn}
                  alt="none"
                  className="w-[70px] lg:block md:block hidden"
                />
              </NavLink>
              <img
                src={CANa}
                alt="none"
                className="w-[42px]  lg:block md:block hidden"
              />

              <div className="relative md:hidden lg:hidden block">
                <div className="absolute flex ">
                  <div className="ml-3 mt-2" onClick={toggleNavbar}>
                    <img src={frame33} className="cursor-pointer" alt="" />
                  </div>
                  <div
                    className={`${
                      isOpen
                        ? "flex flex-col gap-1   hidden translate-x-0"
                        : "absolute left-60"
                    }`}
                  >
                    <h5 className="text-[12px] text-white   mt-4">
                      CAN ID:shri121
                    </h5>
                  </div>
                </div>

                <div
                  className={`${
                    isOpen ? "flex flex-col gap-1  hidden translate-x-0" : ""
                  }`}
                >
                  <img src={frame34} className="" alt="" />
                </div>

                <div className="absolute top-[57%] ml-3 flex">
                  <div className="w-1/4  ">
                    <img
                      src={userData?.profile_photo}
                      className="rounded-[100%]"
                      alt=""
                    />
                  </div>
                  <div
                    className={`${
                      isOpen
                        ? "flex flex-col gap-1  hidden translate-x-0"
                        : "ml-3"
                    }`}
                  >
                    <h3 className="text-white mt-7">{userData?.username}</h3>
                    <h3 className="text-color1">
                      {" "}
                      {userData?.profile_category.category_Name}{" "}
                    </h3>
                  </div>

                  <div
                    className={`${
                      isOpen
                        ? "flex flex-col gap-1  hidden translate-x-0"
                        : "ml-10 mt-3"
                    }`} >
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      {/* <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /> */}
                    </svg>{" "}
                  </div>
                </div>
              </div>
            </div>

            {/* separate line */}

            <div className="flex items-center justify-center pt-2">
              <hr className={`h-1 w-[80%]`} />
            </div>

            {/* content with icons */}

            <div className="flex flex-col  pt-5">
              <ul className="flex flex-col gap-2 cursor-pointer">
                <NavLink to="/home">
                  <div onClick={() => setActivePage("/home")}>
                    <li
                      className={`flex flex-row items-center gap-2 h-12 text-[14px]  text-[#444] font-semibold  ${
                        activePage === "/home"
                          ? "bg-[#efc4197c] border-l-[3px] lg:border-[#C31A7F] text-[14px] font-semibold"
                          : ""
                      }`}
                    >
                      <div className={`ml-10 `}>
                        <img className="w-4" src={home} alt="none" />
                      </div>
                      <p
                        className={` ${
                          isOpen ? "  hidden translate-x-0 " : " "
                        }`}
                      >
                        Feeds
                      </p>
                    </li>
                  </div>
                </NavLink>

                <div onClick={() => setActivePage("/CreatePose")}>
                  <li
                    className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${
                      activePage === ""
                        ? "bg-[rgba(239, 195, 25, 0.2)] border-l-[3px] lg:border-[#C31A7F]"
                        : ""
                    }`}
                    onClick={uploadPost}
                  >
                    <div className={`ml-10 `}>
                      <img src={createPost} className="w-4" alt="none" />
                    </div>
                    <p className={` ${isOpen ? "  hidden translate-x-0" : ""}`}>
                      Create Post
                    </p>
                  </li>
                </div>

                {uploadPosts && (
                  <div>
                    <CreatePost close_createPost={close_createPost} />
                  </div>
                )}
                <NavLink to="/meeting">
                  <div>
                    <li
                      className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold   ${
                        activePage === "/meeting"
                          ? "bg-[#efc4197c] border-l-[3px] lg:border-[#C31A7F] text-[14px] font-semibold"
                          : ""
                      }`}
                    >
                      <div className={`ml-10 `}>
                        <img className="w-4" src={meeting} alt="none" />
                      </div>
                      <p
                        className={`${
                          isOpen ? "hidden translate-x-0 ml-2" : ""
                        }`}
                      >
                        Meetings
                      </p>
                    </li>
                  </div>
                </NavLink>

                <NavLink to="/chatpage" onClick={() => setActivePage("/chatpage")}>
                  <li
                    className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${
                      activePage === "/chatpage"
                        ? "bg-[#efc4197c] border-l-[3px] lg:border-[#C31A7F]"
                        : ""
                    }`}
                  >
                    <div className={`ml-10 `}>
                      <img className="w-4" src={chat} alt="none" />
                    </div>
                    <p className={` ${isOpen ? "  hidden translate-x-0" : ""}`}>
                      Chat
                    </p>
                  </li>
                </NavLink>

                <NavLink
                  to="/HealthRecord"
                  onClick={() => setActivePage("/HealthRecord")}
                >
                  <li
                    className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${
                      activePage === "/HealthRecord"
                        ? "bg-[#efc4197c] border-l-[3px] lg:border-[#C31A7F]"
                        : ""
                    }`}
                  >
                    <div className={`ml-10 `}>
                      <img className="w-4" src={healthRec} alt="none" />
                    </div>
                    <p className={` ${isOpen ? "  hidden translate-x-0" : ""}`}>
                      Health Record
                    </p>
                  </li>
                </NavLink>

                <NavLink
                  to="/HealthCard"
                  onClick={() => setActivePage("/HealthCard")}
                >
                  <li
                    className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${
                      activePage === "/HealthCard"
                        ? "bg-[#efc4197c] border-l-[3px] lg:border-[#C31A7F]"
                        : ""
                    }`}
                  >
                    <div className={`ml-10 `}>
                      <img className="w-4" src={healthCard} alt="none" />
                    </div>
                    <p className={` ${isOpen ? "  hidden translate-x-0" : ""}`}>
                      Health Card
                    </p>
                  </li>
                </NavLink>

                <NavLink
                  to="/Appointment"
                  onClick={() => setActivePage("/Appointment")}
                >
                  <li
                    className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${
                      activePage === "/Appointment"
                        ? "bg-[#efc4197c] border-l-[3px] lg:border-[#C31A7F]"
                        : ""
                    }`}
                  >
                    <div className={`ml-10 `}>
                      <img className="w-4" src={appointment} alt="none" />
                    </div>
                    <p className={` ${isOpen ? "  hidden translate-x-0" : ""}`}>
                      Appointments
                    </p>
                  </li>
                </NavLink>

                <NavLink to="/Medicine" onClick={() => setActivePage("/Medicine")}>
                  <li
                    className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${
                      activePage === "/Medicine"
                        ? "bg-[#efc4197c] border-l-[3px]  lg:border-[#C31A7F]"
                        : ""
                    }`}
                  >
                    <div className={`ml-10 `}>
                      <img className="w-4" src={medicine} alt="none" />
                    </div>
                    <p className={` ${isOpen ? "  hidden translate-x-0" : ""}`}>
                      Medicines
                    </p>
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>

          {/* show more */}
          <div
            onClick={() => setActivePage("showMore")}
            className={`cursor-pointer hover:bg-[#efc4197c] ${
              activePage ==="showMore"
                ? "bg-[#efc4197c] border-l-[3px] lg:border-[#C31A7F]"
                : ""
            }`}
          >
            <ul className="relative w-full h-12 ">
                <li className="flex flex-row   gap-2 " onClick={showmoreToggle}>
                  <div
                    className={` ${
                      isOpen ? " ml-10 mt-4 translate-x-0" : "ml-10   mt-4"
                    }`}
                  >
                    <img src={more} alt="none" />
                  </div>
                  <p className={`${isOpen ? " flex hidden" : "mt-3"}`}>
                    Show More
                  </p>
                </li>

              {showmore && (
                <div
                  ref={showmoreOutclick}
                  className=" h-max w-max bg-white shadow-2xl absolute bottom-0 lg:left-[120%]  items-center"
                >
                  <p className="flex pt-3 px-4 text-center w-full font-semibold">
                    Help and support
                  </p>

                  <p className="flex p-3">
                    <hr />
                  </p>

                  <p className="flex px-4 py-2 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]">
                    <img src={CANnn} alt="none" />
                    <NavLink to="/whycan#aboutus">
                    About us
                    </NavLink>
                  </p>
                  <p className="flex px-4 py-2 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]">
                    <img src={help} alt="none" />
                    <NavLink to="/HelpFeedback">Help / Feedback</NavLink>
                  </p>

                  <p className="flex px-4 py-2 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]">
                    <img src={share} alt="none" />
                    <NavLink to="/HelpAFriend"> Help a friend</NavLink>
                  </p>
                  <p className="flex px-4 py-2 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]">
                    <img src={setting} alt="none" />
                    <NavLink to="/Settings">Setting </NavLink>
                  </p>
                  <p
                    className="flex px-4 py-2 pb-4 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]"
                    onClick={handleLogOut}
                  >
                    <img src={logout} alt="none" />
                    Logout
                  </p>
                  {/* logout */}
                  {logOut && (
                    <div className="fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50  z-50">
                      <div
                        ref={logoutDivRef}
                        className="bg-white flex flex-col items-center gap-3 px-10 py-4 justify-center rounded-[20px] p-4"
                      >
                        <img src={CanLogo} alt="logo" />
                        <p className="font-[600]">
                          Are you sure you want to log out?{" "}
                        </p>
                        <button
                          className="bg-[#C31A7F] rounded-[15px] text-white py-2 px-10 font-[500]"
                          onClick={handleLogOut}
                        >
                          <NavLink to="/LoginForm">Log out</NavLink>
                        </button>
                        <button
                          className="border-[2px] border-[#C31A7F]   text-[#C31A7F]  rounded-[15px] py-2 px-5"
                          onClick={handleLogOut}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ul>
          </div>

          {/* toggle icon */}
        </div>
        <button
          className={` lg:absolute absolute z-10 top-5 -right-8 lg:z-10  lg:top-5 lg:-right-8  rounded-lg transition-all duration-300 ${
            isOpen ? "" : "translate-x-0 "
          }`}
          onClick={toggleNavbar}
        >
          {isOpen ? (
            <img className="w-5 mt-[10px] " src={iconRight} alt="none" />
          ) : (
            <img className="w-5 mt-[10px] " src={iconLeft} alt="none" />
          )}
        </button>
      </div>
    </>
  );
}


export default SideMenu;

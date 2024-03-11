import React, { useEffect, useRef, useState } from "react";
import Logo1 from "../Photos/Logo1.png";
import CAN from "../Photos/CAN.png";
import home from "../Photos/home.png";
import meeting from "../Photos/meeting.png";
import chat from "../Photos/chat.png";
import createPost from "../Photos/createPost.svg";
import saved from "../Photos/saved.png";
import healthRec from "../Photos/healthRec.png";
import healthCard from "../Photos/healthCard.png";
import medicine from "../Photos/medicine.png";
import more from "../Photos/more.png";
import { SlCalender } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import CreatePost from "./CreatePost";
import CANnn from "../Photos/MoreIcons/CANnn.png";
import contact from "../Photos/MoreIcons/contact.png";
import help from "../Photos/MoreIcons/help.png";
import logout from "../Photos/MoreIcons/logout.png";
import setting from "../Photos/MoreIcons/setting.png";
import share from "../Photos/MoreIcons/share.png";
import Home from "../Pages/Home";

const SideNavbar = ({ OpenUpload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isiconVisible, setIsiconVisible] = useState(true);
  const [uploadPosts, setUploadPosts] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    setIsiconVisible(!isiconVisible);
  };

  const uploadPost = () => {
    setUploadPosts(!uploadPosts);
  };

  function close_createPost() {
    setUploadPosts(!uploadPosts);
  }

  //show more
  const [showmore, setShowmore] = useState(false);

  function showmoreToggle() {
    setShowmore(!showmore);
  }

  //outclick from
  const showmoreOutclick = useRef(null);

  const handleClickOutsideshowmore = (event) => {
    if (
      showmoreOutclick.current &&
      !showmoreOutclick.current.contains(event.target)
    ) {
      setShowmore(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideshowmore, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideshowmore, true);
    };
  }, []);

  return (
    <>
      <div className={`relative`}>
        {/* Sidebar */}
        <div
          className={`z-10  flex flex-col  justify-between top-0 left-0 h-screen w-60 items-center   bg-white shadow-2xl  transition-all duration-300 ${
            isOpen ? "translate-x-0 " : "-ml-36 "
          }`}
        >
          <ul className="flex flex-col ">
            <li
              className={
                isOpen
                  ? `flex flex-row items-center justify-center transition-all duration-500 gap-2 ${
                      isOpen ? "translate-x-0" : "-translate-x-36"
                    }`
                  : `ml-36 w-[35%] flex flex-col justify-center items-center transition-all duration-500 ${
                      isOpen ? "translate-x-36" : "-translate-x-0 "
                    }`
              }
            >
              <img src={Logo1} alt="none" className="w-[74px]" />
              <img src={CAN} alt="none" className="w-[44px]" />
        </li>

            <p
              className={` transition-all duration-1000 pt-4 flex items-center justify-center  text-[#c4c4c4] ${
                isOpen ? "pb-8 translate-x-0" : "-translate-x-36"
              }`}
            >
              <hr className="h-0.5 w-60  bg-[#C4C4C4] " />
            </p>

            <div className="  flex w-56 flex-col gap-6 mt-5">
              <NavLink to="/home">
                {" "}
                <li className=" flex flex-row  items-center  gap-3 hover:bg-[#efc4197c] " onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}  >
                
                
                  <div
                    className={`transition-all duration-500  flex flex-row justify-between  ${
                      !isOpen ? "translate-x-40 pt-2 pb-2 flex flex-row justify-between  " : "-translate-x-0 w-auto"
                    }`} 
                  >
                  {isHovering && (
                    <div className='font-bold bg-[#C31A7F] h-[23px] w-[3px] inline-block text-[20px]'></div>
        )}
                    <img className="" src={home} alt="none" />
                  </div>
                  Home{" "}

                  
                </li>
              </NavLink>
              <NavLink to="/meeting">
                {" "}
                <li className=" flex  items-center gap-3">
                  <div
                    className={`transition-all duration-500   ${
                      !isOpen ? "translate-x-40 pt-2 " : "-translate-x-0"
                    }`}
                  >
                    <img className="" src={meeting} alt="none" />
                  </div>
                  Meeting{" "}
                </li>
              </NavLink>
              <NavLink to="/chatpage">
                {" "}
                <li className=" flex items-center gap-3">
                  <div
                    className={`transition-all duration-500   ${
                      !isOpen ? "translate-x-40 pt-2  " : "-translate-x-0"
                    }`}
                  >
                    <img className="" src={chat} alt="none" />
                  </div>
                  Chat{" "}
                </li>
              </NavLink>
              <li className=" flex items-center gap-3" onClick={uploadPost}>
                <div
                  className={`transition-all duration-500   ${
                    !isOpen ? "translate-x-40 pt-2  " : "-translate-x-0"
                  }`}
                >
                  <img className="" src={createPost} alt="none" />
                </div>
                Create Post{" "}
              </li>
              <NavLink to="/profile">
                <li className=" flex items-center gap-3">
                  <div
                    className={`transition-all duration-500   ${
                      !isOpen ? "translate-x-40 pt-2 " : "-translate-x-0"
                    }`}
                  >
                    <img className="" src={saved} alt="none" />
                  </div>
                  Saved{" "}
                </li>
              </NavLink>

              <NavLink to="/HealthRecord">
                <li className=" flex items-center gap-3">
                  <div
                    className={`transition-all duration-500  ${
                      !isOpen ? "translate-x-40 pt-2 " : "-translate-x-0"
                    }`}
                  >
                    <img className="" src={healthRec} alt="none" />
                  </div>
                  Health Record
                </li>
              </NavLink>
              <NavLink to="/HealthCard">
                <li className=" flex items-center gap-3">
                  <div
                    className={`transition-all duration-500   ${
                      !isOpen ? "translate-x-40 pt-2  " : "-translate-x-0"
                    }`}
                  >
                    <img src={healthCard} className="w-4" alt="none" />
                  </div>
                  Health Card{" "}
                </li>
              </NavLink>
              <NavLink to="/Appointment">
                <li className=" flex items-center gap-3">
                  <div
                    className={`transition-all duration-500   ${
                      !isOpen ? "translate-x-40 pt-2  " : "-translate-x-0"
                    }`}
                  >
                    {/* <img className='' src={appointment} alt='none' /> */}
                    <SlCalender color="#C31A7F" />
                  </div>
                  Appointment{" "}
                </li>
              </NavLink>
              <li className=" flex items-center gap-3">
                <div
                  className={`transition-all duration-500  ${
                    !isOpen ? "translate-x-40 pt-2 " : "-translate-x-0"
                  }`}
                >
                  <img className="" src={medicine} alt="none" />
                </div>
                Medicine{" "}
              </li>
            </div>

            {/* <li className="mb-6 flex items-center gap-3" onClick={open_post} ><div className={`transition-all duration-500  ${!isOpen ? 'translate-x-40 pt-2' : '-translate-x-0'}`}><img src={createPost} /></div>Create Post </li> */}

            {/* <h1 className='flex flex-row gap-1 pb-4'><p className={`transition-all duration-500  ${!isOpen ? 'translate-x-36 pt-4 ' : 'flex flex-row gap-1 -translate-x-0'}`}>Medical</p> <p>Records</p></h1> */}
          </ul>
          <ul className="relative bg-[#F5F5F5] w-full">
            <li>
              <li
                className="mb-4 flex items-center gap-3 pt-4 pl-4 "
                onClick={showmoreToggle}
              >
                <div
                  className={`transition-all duration-500  ${
                    !isOpen ? "translate-x-40 " : "-translate-x-0"
                  } `}
                >
                  <img src={more} alt="none" />
                </div>
                More
              </li>
            </li>

            {showmore && (
              <div
                ref={showmoreOutclick}
                className=" h-max w-max bg-white shadow-2xl absolute bottom-0 left-[120%]  items-center"
              >
                <p className="flex pt-3 px-4 text-center w-full font-semibold">
                  Help and support
                </p>

                <p className="flex p-3">
                  <hr />
                </p>

                <p className="flex px-4 py-2 hover:bg-[#efc4197c] gap-2">
                  <img src={CANnn} alt="none" />
                  About us
                </p>
                <p className="flex px-4 py-2 hover:bg-[#efc4197c] gap-2">
                  <img src={help} alt="none" />
                  Help / Feedback
                </p>
                <p className="flex px-4 py-2 hover:bg-[#efc4197c] gap-2">
                  <img src={contact} alt="none" />
                  Contact Us
                </p>
                <p className="flex px-4 py-2 hover:bg-[#efc4197c] gap-2">
                  <img src={help} alt="none" />
                  Help a friend
                </p>
                <p className="flex px-4 py-2 hover:bg-[#efc4197c] gap-2">
                  <img src={setting} alt="none" />
                  Setting
                </p>
                <p className="flex px-4 py-2 pb-4 hover:bg-[#efc4197c] gap-2">
                  <img src={logout} alt="none" />
                  Logout
                </p>
              </div>
            )}
          </ul>
        </div>

        {/* Toggle Button */}
        <button
          className={` absolute z-10 top-3 -right-10 p-2 rounded-lg transition-all duration-300 ${
            isOpen ? "" : "translate-x-0"
          }`}
          onClick={toggleNavbar}
        >
          <img src={more} alt="none" />
        </button>
      </div>

      {uploadPosts && (
        <div>
          <CreatePost close_createPost={close_createPost} />
        </div>
      )}
    </>
  );
};

export default SideNavbar;

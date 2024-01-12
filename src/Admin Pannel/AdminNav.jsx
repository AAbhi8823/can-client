import React, { useEffect, useState, useRef } from "react";
import { BiBell } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";
import { VscBellDot } from "react-icons/vsc";
import { CgAdd } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import account from "../Photos/account.jpg";
import account2 from "../Photos/account2.jpg";
// import SideNav from "./SideNav";
import Home from "../Pages/Home";
import { CiSearch } from 'react-icons/ci'
import AdminMainUser from '../Photos/AdminIcons/AdminMainUser.svg'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { baseurl } from '../Api/baseUrl'
import  Cookie  from 'js-cookie'
import { Avatar } from "@mui/material";



const HomeNav = ({ }) => {
  const [friend, setFriend] = useState(false);
  const [notification, setNotification] = useState(false);
  const [explore, setExplore] = useState(true);

  const showFriendreq = () => {
    setFriend(!friend);
  };

  const exploreMore = () => {
    setExplore(!explore);
  };

  const notificationToggle = () => {
    setNotification(!notification);
  };

  //outclick from friend req box :- close
  const outclick = useRef(null);

  const handleClickOutside = (event) => {
    if (outclick.current && !outclick.current.contains(event.target)) {
      setFriend(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  //outclick from notifiaction box :- close
  const notificationOutclick = useRef(null);

  const handleClickOutsidenotification = (event) => {
    if (
      notificationOutclick.current &&
      !notificationOutclick.current.contains(event.target)
    ) {
      setNotification(false);
    }
  };

  useEffect(() => {

    activeUser()

    document.addEventListener("click", handleClickOutsidenotification, true);
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutsidenotification,
        true
      );
    };
  }, []);


  const [navUser, setNavuser] = useState()



  const activeUser = async () => {
    const token = Cookie.get('token')
    const homeUser = localStorage.getItem('active_user')
    try {
      const userData = await axios.post(`${baseurl}/api/singleuser?token=${token}`, {
        id: `${homeUser}`
      })
      // console.log("Navbar:",userData.data.data)
      setNavuser(userData.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  console.log(navUser&&navUser)











  //Open upload from side nav

  return (
    <>
      {/* <div className="w-full" > */}

      {/* <SideNav /> */}
      {/* </div> */}

      <div className="z-10" >
        <div className="flex  p-3     border-b-[1px] border-[#D9EAFF] " style={{ boxShadow: '0px 10px 40px 0px rgba(231, 237, 243, 0.40)' }}>
          {/* <div className=" w-[30%]"></div> */}
          <div className="flex w-full justify-between md:justify-between">
            <div className="md:w-[50%] md:relative flex items-center justify-center md:ml-40 ml-8 ">
              <CiSearch size={20} className="md:absolute md:top-2 md:left-2 absolute left-12  top-6" />
              <input
                placeholder="Search"
                className=" w-full h-9 outline-none rounded-xl placeholder:text-[14px] px-8 placeholder:font-semibold   bg-[#FEF8FD]  "
              />
            </div>
            <div className="flex mx-10  pointer-cursor ">
            <div className=" flex items-center pointer-cursor gap-4 ">
              {/* Icons */}
              <div className="hidden">
                <div className="" onClick={showFriendreq}>
                  <VscBellDot color="#C31A7F" size={22} />
                </div>
                {friend && (
                  <div ref={outclick} className="bg-white lg:w-[20%] lg:h-[80%] z-10 absolute right-[8%] top-[8%] shadow-2xl">
                    {/* friend req container */}
                    <div>
                      {" "}
                      {/* notifications items */}
                      <div className="flex justify-between px-4 pt-6 items-center">
                        <h2 className="font-semibold">Friend Request</h2>
                        <p className="text-[#EFC319] text-xs">See All</p>
                      </div>
                      <div className="p-4">
                        <hr />
                      </div>
                      {/* friend reqs */}
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                          <div className="w-max px-3">
                            <img
                              src={account}
                              className="rounded-full h-12 w-12"
                            />
                          </div>

                            <div className="">
                              <h1 className="text-sm font-semibold">
                                Sierra Ferguson
                              </h1>
                              <p className="text-xs">Works at National Museum</p>
                            </div>
                          </div>

                          <div className="flex gap-2 px-3">
                            <div className="rounded-full bg-[#4BC2A9]">
                              <TiTick color="white" size={20} />
                            </div>
                            <div>
                              <RxCrossCircled color="red" size={20} />
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:flex md:items-center md:justify-between md:pt-3 ">
                          <div className="flex items-center">
                            <div className="w-max px-3">
                              <img
                                src={account}
                                className="rounded-full h-12 w-12"
                              />
                            </div>

                            <div className="">
                              <h1 className="text-sm font-semibold">
                                Sierra Ferguson
                              </h1>
                              <p className="text-xs">Works at National Museum</p>
                            </div>
                          </div>

                          <div className="flex gap-2 px-3">
                            <div className="rounded-full bg-[#4BC2A9]">
                              <TiTick color="white" size={20} />
                            </div>
                            <div>
                              <RxCrossCircled color="red" size={20} />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3">
                          <div className="flex items-center">
                            <div className="w-max px-3">
                              <img
                                src={account}
                                className="rounded-full h-12 w-12"
                              />
                            </div>

                            <div className="">
                              <h1 className="text-sm font-semibold">
                                Sierra Ferguson
                              </h1>
                              <p className="text-xs">Works at National Museum</p>
                            </div>
                          </div>

                          <div className="flex gap-2 px-3">
                            <div className="rounded-full bg-[#4BC2A9]">
                              <TiTick color="white" size={20} />
                            </div>
                            <div>
                              <RxCrossCircled color="red" size={20} />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3">
                          <div className="flex items-center">
                            <div className="w-max px-3">
                              <img
                                src={account}
                                className="rounded-full h-12 w-12"
                              />
                            </div>

                            <div className="">
                              <h1 className="text-sm font-semibold">
                                Sierra Ferguson
                              </h1>
                              <p className="text-xs">Works at National Museum</p>
                            </div>
                          </div>

                          <div className="flex gap-2 px-3">
                            <div className="rounded-full bg-[#4BC2A9]">
                              <TiTick color="white" size={20} />
                            </div>
                            <div>
                              <RxCrossCircled color="red" size={20} />
                            </div>
                          </div>
                        </div>
                        <div className="px-4 pt-6 ">
                          <div className="flex justify-between relative items-center">
                            <h2 className="font-semibold">Discovery Mode</h2>

                            <div
                              className={
                                explore
                                  ? "bg-gray-300 h-[90%] w-[15%] rounded-xl absolute right-0 flex items-center justify-start"
                                  : "bg-[#4BC2A9] h-[90%] w-[15%] rounded-xl absolute right-0 flex items-center justify-end"
                              }
                            >
                              <div
                                className="h-[70%] w-[40%] bg-white rounded-full mx-1"
                                onClick={exploreMore}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {explore && (
                        <div className="flex flex-col items-center h-[40%] justify-center">
                          <p className="text-sm text-[#7E7E7E]">
                            Turn on Discovery mode to start
                          </p>
                          <p className="text-sm text-[#7E7E7E]">
                            adding friends nearby
                          </p>
                          <h1 className="m-5 p-1 px-2 bg-[#C31A7F] rounded-3xl text-white">
                            Find friends
                          </h1>
                        </div>
                      )}

                      {!explore && (
                        <>
                          <div className="flex items-center justify-between pt-3 ">
                            <div className="flex items-center">
                              <div className="w-max px-3">
                                <img
                                  src={account}
                                  className="rounded-full h-12 w-12"
                                />
                              </div>

                              <div className="">
                                <h1 className="text-sm font-semibold">
                                  Sierra Ferguson
                                </h1>
                                <p className="text-xs">
                                  Works at National Museum
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 px-3">
                              <CgAdd color="gray" size={24} />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 ">
                            <div className="flex items-center">
                              <div className="w-max px-3">
                                <img
                                  src={account}
                                  className="rounded-full h-12 w-12"
                                />
                              </div>

                              <div className="">
                                <h1 className="text-sm font-semibold">
                                  Sierra Ferguson
                                </h1>
                                <p className="text-xs">
                                  Works at National Museum
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 px-3">
                              <CgAdd color="gray" size={24} />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 ">
                            <div className="flex items-center">
                              <div className="w-max px-3">
                                <img
                                  src={account}
                                  className="rounded-full h-12 w-12"
                                />
                              </div>

                              <div className="">
                                <h1 className="text-sm font-semibold">
                                  Sierra Ferguson
                                </h1>
                                <p className="text-xs">
                                  Works at National Museum
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 px-3">
                              <CgAdd color="gray" size={24} />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <img src={AdminMainUser} alt="Adminmainuser" />
                </div>

                {/* Notification */}
                <div onClick={notificationToggle}>
                  <BiBell color="#006969" size={22} />
                </div>
                {notification && (
                  <div
                    ref={notificationOutclick}
                    className="bg-white lg:w-[20%]  lg:pb-0 pb-4 lg:h-[80%] z-10 absolute right-[3%] top-[8%] shadow-2xl pt-6 px-3 overflow-y-scroll"
                  >
                    {/* notification container */}
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <h2 className="font-semibold">Notification </h2>{" "}
                        <p className="text-gray-300">(2)</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <h2 className="text-gray-300">Clear All</h2>
                        <BsThreeDotsVertical />
                      </div>
                    </div>

                    <div className="p-4">
                      <hr />
                    </div>

                    <div className=" lg:max-h-[88%] h-[300px] overflow-y-scroll">
                      <div className="flex">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">sent you a message</p>
                        </div>
                      </div>

                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">liked your photo</p>
                        </div>
                      </div>

                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">liked your video</p>
                        </div>
                      </div>

                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">sent you a message</p>
                        </div>
                      </div>

                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">sent you a message</p>
                        </div>
                      </div>
                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">sent you a message</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex ">
                  <NavLink
                    to="/profileuser"
                    className="flex items-center gap-2"
                  >
                    <div className=" flex">
                      {/* <img className="md:w-9 w-12 rounded-full" src={account} /> */}
                      <Avatar alt="Cindy Baker" src={ `${baseurl}/${navUser?.profile_photo}`} />
                    </div>
                    <div className=" hidden md:block">Admin User</div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNav;

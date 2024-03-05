import React, { useEffect, useState, useRef,forwardRef } from "react";
import { BiBell } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";
import { VscBellDot } from "react-icons/vsc";
import { CgAdd } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import account from "../Photos/account.jpg";
import account2 from "../Photos/account2.jpg";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Cookies from "js-cookie";
import apis from "../Api/baseUrl";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { filteraction } from "../redux/slice/filterslice";
import vector from "../Photos/Vector.svg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import FeedTable from "../Components/FeedTable";


const HomeNav = (props) => {
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [explore, setExplore] = useState(true);
  const [navUser, setNavuser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  
  const [Nav, setNav] = useState(props);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const outclick = useRef(null);
  const notificationOutclick = useRef(null);
  const { search } = useSelector((state) => state.filter);
  const activeuser = localStorage.getItem("active_user");
  const token = Cookies.get("token");
  const tableRef = useRef(null);

  useEffect(() => {
    setNav(props.onStateChange);
  }, [props]);

  useEffect(() => {
    const LandingData = async () => {
      try {
        const { data } = await axios.post(
          `${baseurl}/api/singleuser?token=${token}`,
          { id: `${activeuser}` }
        );
        setNavuser(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    LandingData();
  }, [activeuser, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outclick.current && !outclick.current.contains(event.target)) {
        setFriend(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outclick]);

  useEffect(() => {
    const handleClickOutsidenotification = (event) => {
      if (
        notificationOutclick.current &&
        !notificationOutclick.current.contains(event.target)
      ) {
        setNotification(false);
      }
    };

    document.addEventListener("click", handleClickOutsidenotification, true);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutsidenotification,
        true
      );
    };
  }, [notificationOutclick]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tableRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const Tooltip = forwardRef((props, ref) => {
    const { title, children } = props;
  
    // your component logic here
  
    return (
      <div ref={ref}>
        {/* your Tooltip content */}
        {children}
      </div>
    );
  });
  
  const showFriendreq = () => {
    setFriend(!friend);
  };

  const exploreMore = () => {
    setExplore(!explore);
  };

  const notificationToggle = () => {
    setNotification(!notification);
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    localStorage.clear();
    navigate("/");
  };

  const getSearchUser = async (txt) => {
    try {
      const { data } = await axios.post(`${apis.SEARCH_USER}?token=${token}`, {
        search: txt,
        userid: activeuser,
      });
      if (data.status === true) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search !== "") {
      getSearchUser(search);
    }
  }, [search, getSearchUser]);
  return (
    <>

      <div className="z-10">
        <div
          className="flex  p-3     border-b-[1px] border-[#D9EAFF] "
          style={{ boxShadow: "0px 10px 40px 0px rgba(231, 237, 243, 0.40)" }}
        >
          <div className="flex w-full justify-around ">
            <div className="md:w-[50%] md:relative flex items-center justify-center md:ml-40 ml-8 ">
              <CiSearch
                size={20}
                className="md:absolute  md:left-2 absolute left-12   "
              />
              <input
                onChange={(e) => {
                  dispatch(filteraction.changesearch(e.target.value));
                }}
                placeholder="Search"
                className=" w-full h-9 outline-none rounded-xl placeholder:text-[14px] px-8 placeholder:font-semibold   bg-[#FEF8FD]  "
              />
            </div>
             <FeedTable  /> 

            <div className="flex   pointer-cursor ">
              <div className=" flex items-center pointer-cursor gap-4 ">
                {/* Icons */}
                <div className="hidden">
                  {/* <Tooltip ref={notificationOutclick} title="Notification">
                    <div className="cursor-pointer" onClick={showFriendreq}>
                      <VscBellDot color="#C31A7F" size={22} />
                    </div>
                  </Tooltip> */}

                  {friend && (
                    <div
                      ref={outclick}
                      className="bg-white lg:w-[20%] lg:h-[80%] z-10 absolute right-[8%] top-[8%] shadow-2xl"
                    >
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
                                alt="logo"
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
                                alt="logo"
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
                                alt="logo"
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
                                alt="logo"
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
                                  alt="account"
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
                                  alt='account'
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
                                  alt="account"
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

                {/* Notification */}

                {/* <Tooltip ref={notificationOutclick} title="Notification">
                  <BiBell
                    onClick={notificationToggle}
                    className="cursor-pointer mr-6"
                    color="#C31A7F"
                    size={22}
                  />
                </Tooltip> */}

                {notification && (
                  <div
                    ref={notificationOutclick}
                    className="bg-white lg:w-[20%]  lg:pb-0 pb-4 lg:h-[52%] z-10 absolute right-[3%] top-[8%] shadow-2xl pt-6 px-3 overflow-y-scroll"
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
                          alt="account2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">
                            sent you a message
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                          alt="account2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">
                            liked your photo
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">
                            liked your video
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                          alt="account2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">
                            sent you a message
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                          alt="account"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">
                            sent you a message
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-3">
                        <img
                          src={account2}
                          className="rounded-full h-12 w-12 mr-2"
                          alt="account2"
                        />
                        <div className=" ">
                          <p className="font-semibold text-[14px]">Iqra Aziz</p>
                          <p className="flex-wrap text-[12px]">
                            sent you a message
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={
                    Nav
                      ? "block  cursor-pointer  bg-red relative inline-block text-left "
                      : "block lg:hidden flex cursor-pointer relative inline-block text-left"
                  }
                  ref={dropdownRef}
                >
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md bg-white px-2 py-2 text-sm font-medium text-gray-700 "
                      id="options-menu"
                      onClick={toggleDropdown}
                    >
                      {Cookies.get("token") ? (
                        <div className="flex relative right-0 ">
                          <div>
                            <Avatar
                              alt=""
                              src={navUser?.profile_photo}
                              className="w-[8vw] md:w-[5vw] lg:w-[2vw] "
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex relative right-0 ">
                          <div>
                            <img
                              alt="vector"
                              // src={navUser?.profile_photo}
                              src={vector}
                              className="w-[8vw] md:w-[5vw] lg:w-[2vw] "
                            />
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                  {isOpen && (
                    <div
                      className={
                        Nav
                          ? "origin-top-right absolute right-0 mt-2 w-56  shadow-lg bg-white ring-1 rounded-[17px] overflow-hidden"
                          : "origin-top-right absolute right-0 mt-2 w-56  shadow-lg bg-white ring-1 rounded-[17px] mt-[60px] overflow-hidden z-[999] "
                      }
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div className="text-center" role="none">
                        {Cookies.get("token") ? (
                          <div>
                            <NavLink to={"/profileuser"}>
                              <div
                                className="py-[10px] cursor-pointer hover:bg-[#A94360]  hover:text-white "
                                style={{}}
                              >
                                Profile
                              </div>
                            </NavLink>
                            <NavLink to={"/settings"}>
                              <div
                                className="py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white"
                                style={{}}
                              >
                                User Settings
                              </div>
                            </NavLink>
                            <NavLink to={"/meeting"}>
                              <div
                                className="py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white"
                                style={{}}
                              >
                                Meeting
                              </div>
                            </NavLink>
                          </div>
                        ) : (
                          <div>
                            <NavLink to={"/LoginForm"}>
                              <div
                                className="py-[10px] cursor-pointer hover:bg-[#A94360]  hover:text-white "
                                style={{}}
                              >
                                Profile
                              </div>
                            </NavLink>
                            <NavLink to={"/LoginForm"}>
                              <div
                                className="py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white"
                                style={{}}
                              >
                                User Settings
                              </div>
                            </NavLink>
                            <NavLink to={"/LoginForm"}>
                              <div
                                className="py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white"
                                style={{}}
                              >
                                Meeting
                              </div>
                            </NavLink>
                          </div>
                        )}
                        <div
                          onClick={handleLogOut}
                          className={`py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white ${
                            Cookies.get("token") ? "" : "hidden"
                          }`}
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={
                  Nav
                    ? "block hidden lg:block cursor-pointer  bg-red relative inline-block text-left "
                    : "block hidden lg:block flex cursor-pointer relative inline-block text-left"
                }
                ref={dropdownRef}
              >
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md bg-white px-2 py-2 text-sm font-medium text-gray-700 "
                    id="options-menu"
                    onClick={toggleDropdown}
                  >
                    {Cookies.get("token") ? (
                      <div className="flex relative right-0 ">
                        <div className="flex justify-center items-center">
                          <Avatar
                            alt=""
                            src={navUser?.profile_photo}
                            className="w-[8vw] md:w-[5vw] lg:w-[2vw] "
                          />
                          <p className="flex items-center ml-4">
                            Hi {navUser?.username}
                          </p>
                          <RiArrowDropDownLine className="text-[1vw] " />
                        </div>
                      </div>
                    ) : (
                      <div className="flex relative right-0 ">
                        <div>
                          <img
                            alt="vector"
                            // src={navUser?.profile_photo}
                            src={vector}
                            className="w-[8vw] md:w-[5vw] lg:w-[2vw] "
                          />
                          <p className="flex items-center ml-4">Hi</p>
                          <RiArrowDropDownLine className="text-[1vw] " />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
                {isOpen && (
                  <div
                    className={
                      Nav
                        ? "origin-top-right absolute right-0 mt-2 w-48  shadow-lg bg-white ring-1 rounded-[17px] overflow-hidden"
                        : "origin-top-right absolute right-0 mt-2 w-48  shadow-lg bg-white ring-1 rounded-[17px]  overflow-hidden z-[999] "
                    }
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="text-center" role="none">
                      {Cookies.get("token") ? (
                        <div>
                          <NavLink to={"/profileuser"}>
                            <div
                              className="py-[10px] cursor-pointer hover:bg-[#A94360]  hover:text-white "
                              style={{}}
                            >
                              Profile
                            </div>
                          </NavLink>
                          <NavLink to={"/settings"}>
                            <div
                              className="py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white"
                              style={{}}
                            >
                              User Settings
                            </div>
                          </NavLink>
                          <NavLink to={"/meeting"}>
                            <div
                              className="py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white"
                              style={{}}
                            >
                              Meeting
                            </div>
                          </NavLink>
                        </div>
                      ) : (
                        <div>
                          <NavLink to={"/LoginForm"}>
                            <div
                              className="py-[10px] cursor-pointer hover:bg-[#A94360]  hover:text-white "
                              style={{}}
                            >
                              Profile
                            </div>
                          </NavLink>
                          <NavLink to={"/LoginForm"}>
                            <div
                              className="py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white"
                              style={{}}
                            >
                              User Settings
                            </div>
                          </NavLink>
                          <NavLink to={"/LoginForm"}>
                            <div
                              className="py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white"
                              style={{}}
                            >
                              Meeting
                            </div>
                          </NavLink>
                        </div>
                      )}
                      <div
                        onClick={handleLogOut}
                        className={`py-[10px] cursor-pointer hover:bg-[#A94360] hover:text-white ${
                          Cookies.get("token") ? "" : "hidden"
                        }`}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNav;

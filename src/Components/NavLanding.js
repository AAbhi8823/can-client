import { useEffect, useState, useCallback, useRef } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import vector from "../Photos/Vector.svg";
import Avatar from "@mui/material/Avatar";
import SearchLens from "../Photos/SearchLens.png";
import KnowAbout from "../Photos/KnowAbout.png";
import JoinMeet from "../Photos/JoinMeet.png";
import HomeIcons from "../Photos/HomeIcon.png";
import { useNavigate } from "react-router-dom";
import downArrow from "../Photos/downArrow.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { baseurl } from "../Api/baseUrl";
import { BiMenu, BiX } from "react-icons/bi";
import whyc from '../Photos/whyc.png'
import { NavLink } from "react-router-dom";
export default function Example(props) {
  const [Nav, setNav] = useState(props);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setMenu((prevMenu) => !prevMenu);
  }, []);

  useEffect(() => {
    setNav(props.onStateChange);
  }, [props]);

  const [navUser, setNavuser] = useState();

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
      // console.log("Navbar:", userData.data.data)
      setNavuser(userData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LandingData();
  });

  const [mainMenu, setMainMenu] = useState(false);

  const openMenu = () => {
    setMainMenu(!mainMenu);
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuRef = useRef(null);

  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMainMenu(false);
    }
  };

  useEffect(() => {
    if (mainMenu) {
      document.addEventListener("mousedown", closeMenu);
    } else {
      document.removeEventListener("mousedown", closeMenu);
    }

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [mainMenu]);

  const handleLogOut = () => {
    localStorage.clear();
    Cookies.remove("token", { path: "/" });
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      className={
        Nav
          ? "bg-white fixed flex  transition-[width] duration-[0.3s] ease-[ease] w-[100%] md:w-[100%] lg:pl-[150px] md:pl-0 pr-0 py-2.5 z-20 top-0"
          : "bg-white transition-[width] w-[100%] md:w-[100%]  lg:w-[65vw] xl:w-[50vw]  duration-[0.3s] ease-[ease] absolute md:fixed w-3/5 lg:rounded-full md:p-0 lg:py-[10px] py-[10px] lg:px-8 h-[9vh]  z-20 lg:top-8 top-0 "
      }
      style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.1)" }}
    >
      <div
        className={
          Nav
            ? "flex flex-row w-full  justify-evenly lg:p-0 lg:w-full items-center"
            : "flex flex-row items-center justify-between lg:p-0 h-[100%] "
        }
      >
        <div className="lg:flex flex-row gap-2 hidden lg:block items-center pr-4">
        <img src={whyc} className="w-6 h-auto" alt="" />
          <NavLink to="/whycan">
            <p className="  font-semibold  text-[#084943] text-[1vw] ">
              Why CAN
            </p>
          </NavLink>
        </div>
        <div className="lg:flex flex-row gap-2 items-center pl-2 hidden lg:block ">
          <img className="w-[1vw] h-auto" src={KnowAbout} alt="search" />
          <NavLink to="/KnowMore">
            <p className="  font-semibold  text-[#084943] text-[1vw] ">
              Know About Cancer
            </p>
          </NavLink>
        </div>
        <div
          onClick={openMenu}
          className="lg:hidden md:block block absolute left-0 "
          ref={menuRef}
        >
          {mainMenu ? (
            <BiX size={30} className="ml-2" />
          ) : (
            <BiMenu size={30} className="ml-2" />
          )}
          {mainMenu && (
            <div
              className="absolute bg-[#fff] top-[145%] w-[70vw]  p-[10px] h-[100vh] transition-all duration-[0.3s] ease-[ease] "
              style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.1)" }}
              ref={menuRef}
            >
              <NavLink to={"/knowMore"}>
                <div className="flex border-b items-center px-[10px]  py-[15px]">
                  <img className="h-4 mr-2 " src={KnowAbout} alt="search" />
                  <p>Know About Cancer</p>
                </div>
              </NavLink>

              <NavLink to={"/Animate"}>
                <div className="flex border-b items-center px-[10px]  py-[15px]">
                  <img className="h-4 mr-2 " src={HomeIcons} alt="search" />
                  <p>My Space</p>
                </div>
              </NavLink>

              <NavLink to={"/whycan"}>
                <div className="flex border-b items-center px-[10px]  py-[15px]">
                  <img className="w-6" src={whyc} alt="search" />
                  <p>Why CAN </p>
                </div>
              </NavLink>
            </div>
          )}
        </div>
        <div className=" flex relative mx-auto md:mx-auto lg:mx-0">
          <NavLink to="/">
            <div className="flex relative flex-row cursor-pointer item-center justify-center">
              <img
                className="w-[14vw] lg:w-[4vw] h-auto relative left-1/2 lg:left-0"
                src={LogoCAn}
                alt="Logo"
              />
            </div>
          </NavLink>
        </div>
        <NavLink to="/Animate" className="lg:block hidden">
          <div className="lg:flex gap-2 cursor-pointer hidden lg:block  items-center">
            <div>
              <img className="w-[1vw] h-auto" src={HomeIcons} alt="search" />
            </div>
            <div>
              <p className="  font-semibold  text-[#084943] text-[1vw] ">
                My Space
              </p>
            </div>
          </div>
        </NavLink>
        {Cookies.get("token") ? (
          <NavLink to="/meeting" className="lg:block hidden">
            <div className="lg:flex gap-2 cursor-pointer items-center h-[2vw] px-5 hidden lg:block rounded-full bg-[#084943] ">
              <div>
                <img className="w-[1vw] h-auto" src={JoinMeet} alt="search" />
              </div>
              <div>
                <p className="font-semibold text-white text-[1vw] ">
                  Join a Meeting
                </p>
              </div>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/animate" className="lg:block hidden">
            <div className="lg:flex gap-2 cursor-pointer items-center h-[2vw] px-5 hidden lg:block rounded-full bg-[#084943] ">
              <div>
                <img className="w-[1vw] h-auto" src={JoinMeet} alt="search" />
              </div>
              <div>
                <p className="font-semibold text-white text-[1vw] ">
                  Join a Meeting
                </p>
              </div>
            </div>
          </NavLink>
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
                      alt=" "
                      // src={navUser?.profile_photo}
                      src={vector}
                      className="w-[8vw] md:w-[5vw] lg:w-[2vw] "
                    />
                  </div>
                </div>
              ) : (
                <div className="flex relative right-0 ">
                  <div>
                    <Avatar
                      alt=" "
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
                  : "origin-top-right absolute right-0 mt-2 w-56  shadow-lg bg-white ring-1 rounded-[17px] mt-[60px] overflow-hidden"
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
    </nav>
  );
}

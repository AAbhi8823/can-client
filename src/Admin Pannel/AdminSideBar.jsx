import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AdminDashboard from "../Photos/AdminIcons/AdminDashboard.png";
import AdminUser from "../Photos/AdminIcons/AdminUsers.png";
import AdminMeeting from "../Photos/AdminIcons/AdminMeeting.png";
import AdminPost from "../Photos/AdminIcons/AdminPost.png";
import AdminChat from "../Photos/AdminIcons/AdminChat.png";
import AdminTransaction from "../Photos/AdminIcons/AdminTransaction.png";
import AdminReport from "../Photos/AdminIcons/AdminReport.png";
import AdminSetting from "../Photos/AdminIcons/AdminSetting.png";
import AdminLogout from "../Photos/AdminIcons/AdminLogout.png";
import iconRight from "../Photos/iconRight.png";
import iconLeft from "../Photos/iconLeft.png";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("isOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const sideMenuDivRef = useRef(null);

  const handleClickOutsideSideMenu = (event) => {
    if (isOpen === false && sideMenuDivRef.current && !sideMenuDivRef.current.contains(event.target)) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSideMenu, false);
    return () => {
      document.removeEventListener("click", handleClickOutsideSideMenu, false);
    };
  }, [isOpen]);

  const menuItems = [
    { to: "/AdminContent", icon: AdminDashboard, label: "Dashboard" },
    { to: "/AdminUserManagement", icon: AdminUser, label: "Users" },
    { to: "/AdminMeetingSchedule", icon: AdminMeeting, label: "Meeting" },
    { to: "/CreatePost", icon: AdminPost, label: "Post" },
    { to: "/AdminChat", icon: AdminChat, label: "Chats" },
    { to: "/HealthRecord", icon: AdminTransaction, label: "Transaction" },
    { to: "/HealthCard", icon: AdminReport, label: "Reports" },
    { to: "/Appointment", icon: AdminSetting, label: "Setting" },
    { to: "/Medicine", icon: AdminLogout, label: "Logout" },
  ];

  return (
    <div ref={sideMenuDivRef} className="relative">
      <div
        className={`lg:relative absolute h-full z-50 bg-[#FFF] border-[1px] border-solid border-[#D9EAFF] transition-all duration-300 flex flex-col justify-between ${
          isOpen ? "w-[0px] lg:w-[100px]" : "lg:w-[300px]  w-[250px]"
        }`}
        style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div>
          <div className={`flex flex-row gap-1 items-center justify-center pt-2 ${isOpen ? "flex flex-col gap-1" : ""}`}>
            <img src={LogoCAn} alt="Logo" className="w-[70px]" />
            <img src={CANa} alt="Logo" className="w-[42px]" />
          </div>

          <div className="flex items-center justify-center pt-2">
            <hr className="h-1 w-[80%]" />
          </div>

          <div className="flex flex-col pt-2">
            <ul className="flex flex-col gap-2 cursor-pointer">
              {menuItems.map((item, index) => (
                <NavLink key={index} to={item.to}>
                  <li
                    className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold ${
                      activePage === item.to
                        ? "bg-[#efc4197c] border-l-[3px] flex flex-row font-semibold gap-2 h-12 items-center lg:border-[#C31A7F] text-[#444] text-[14px]"
                        : ""
                    }`}
                  >
                    <div className="ml-10">
                      <img className="w-4" src={item.icon} alt={item.label} />
                    </div>
                    <p className={`${isOpen ? "hidden translate-x-0 ml-2" : ""}`}>{item.label}</p>
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button
        className={`lg:absolute absolute z-10 top-5 -right-8 lg:z-10 lg:top-5 lg:-right-8 rounded-lg transition-all duration-300 ${
          isOpen ? "" : "translate-x-0"
        }`}
        onClick={toggleNavbar}
      >
        {isOpen ? <img className="w-5" src={iconRight} alt="Expand" /> : <img className="w-5" src={iconLeft} alt="Collapse" />}
      </button>
    </div>
  );
};

export default SideMenu;

// Page.js
import React, { useState, useEffect } from "react";
import HomeNav from "../Components/HomeNav";
import SideNav from "../Components/SideNav";
import SideMenu from "../Components/SideMenu";
import "./Pages.css";

const Page = ({ pageContent }) => {
  // const [isOpen, setIsOpen] = useState(() => {
  //   const storedValue = localStorage.getItem('isOpen');
  //   return storedValue ? JSON.parse(storedValue) : true;
  // });
  // useEffect(() => {
  //   // Store the 'isOpen' state in localStorage whenever it changes
  //   localStorage.setItem('isOpen', JSON.stringify(isOpen));
  // }, [isOpen]); abhi ka h.....jab mene uski branch ko checkout kiya tha tb shi chla.
  return (
    <div>
      <div className="flex ">
        <SideMenu />
        <div className="flex w-full flex-col">
          <div className="header    bg-white z-[9]">
            <HomeNav />
          </div>
          <div className="content_page  overflow-scroll h-screen mt-[-81px]  bg-[#FFF6FB] z-0">
            <div className="mt-[81px] ">{pageContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

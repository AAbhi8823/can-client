// Page.js
import React, { useState, useEffect } from "react";
import AdminHomeNav from "./AdminNav";
// import SideNav from "../Components/SideNav";
import AdminSideMenu from './AdminSideBar';


const Page = ({ AdminpageContent }) => {
    // const [isOpen, setIsOpen] = useState(() => {
    //   const storedValue = localStorage.getItem('isOpen');
    //   return storedValue ? JSON.parse(storedValue) : true;
    // });
    // useEffect(() => {
    //   // Store the 'isOpen' state in localStorage whenever it changes
    //   localStorage.setItem('isOpen', JSON.stringify(isOpen));
    // }, [isOpen]);
    return (
        <div>
            <div className="flex ">
                <AdminSideMenu />
                <div className="flex w-full flex-col">
                    <div className="header">
                        <AdminHomeNav />
                    </div>
                    <div style={{ background: "#F5FBFF"}} className="h-[92vh] overflow-scroll">{AdminpageContent}</div>
                </div>
            </div>
        </div>
    );
};

export default Page;

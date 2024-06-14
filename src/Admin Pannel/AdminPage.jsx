// Page.js
import React, { useState, useEffect } from "react";
import AdminHomeNav from "./AdminNav";
// import SideNav from "../Components/SideNav";
import AdminSideMenu from "./AdminSideBar";

const Page = ({ AdminpageContent }) => {
  return (
    <div>
      <div className="flex ">
        <AdminSideMenu />
        <div className="flex w-full flex-col">
          <div className="header">
            <AdminHomeNav />
          </div>
          <div
            style={{ background: "#F5FBFF" }}
            className="h-[92vh] overflow-scroll"
          >
            {AdminpageContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

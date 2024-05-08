import React, { useState, useParams,useEffect } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";
import Frame from "../Photos/Frame.png";
import { AiOutlineMail } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loadingImg from "../Photos/GIF/loader.gif";
import base_token from "../Api/baseUrl";
const MagickLink = () => {

  const [resetId, setResetId] = useState('');
  useEffect(() => {
    const storedId = localStorage.getItem('resetId');
    setResetId(storedId);
    return () => {
      localStorage.removeItem('resetId');
    };
  }, []);
  return (
    <>
      <div
        className="lg:h-screen h-fit lg:flex md:flex lg:p-0 px-4  items-center sm:block justify-center"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="flex justify-start center-1">
          <NavLink to="/">
            <div className="flex px-10 w-[100%]">
              <img src={LogoCAn} alt="" />
            </div>
          </NavLink>
        </div>
        <div
          className="shadow-xl p-[30px] bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-lg rounded-[20px]"
          style={{ boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex flex-col items-center gap-4">
            <div>
              <h1 className="lg:text-[2vw]  text-[24px] font-semibold  text-[#C31A7F]">
                Forgot Password
              </h1>
            </div>
            <div className="text-center">
              <p className="lg:text-[1vw]  text-[#555555] text-[12px] font-semibold">
                Please, enter your registered email. You'll receive
              </p>
              <p className="lg:text-[1vw]  text-[#555555] text-[12px] font-semibold">
                a link to reset password.
              </p>
            </div>
            <div>
              <img className="w-28 h-28" src={Frame} alt="none" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MagickLink;

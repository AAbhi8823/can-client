import React, { useState } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";
import Frame from "../Photos/Frame.png";
import { AiOutlineMail } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import MagickLink from "./MagickLink";
import loadingImg from "../Photos/GIF/loader.gif";
import base_token from "../Api/baseUrl";
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const getLink = async () => {
    try {
      const response = await axios.post(`${baseurl}/user/user-password-reset`, {
        email: email,
      });
      console.log("response::>>", response);
      if (response?.data?.resData.status === true) {
        // setShowInput(false);
        // setShowMessage(true);
        navigate("/OtpVerify");
      } else {
        setError("(Phone number not found)");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (event) => {
    const enteredValue = event.target.value;
    setEmail(enteredValue);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(enteredValue)) {
      setError("(Invalid Email Address)");
    } else {
      setError("");
    }
  };

  const isResetDisabled = error !== "";

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
            {showInput && (
              <div>
                <div className="border-2 lg:h-12 h-12  mt-3 lg:w-[350px] w-[300px]  rounded-[20px] flex items-center gap-4">
                  <input
                    placeholder="Enter email"
                    className="border-none w-full bg-transparent placeholder: outline-none p-4"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="text-red-400 lg:text-xs lg:text-[.6vw] text-[10px]  lg:w-[50%] ">
                  {error && <p>{error}</p>}
                </div>
              </div>
            )}
            {showMessage && (
              <p className="lg:text-[1vw]  text-[#555555] text-[12px] font-semibold">
                Password reset link sent successfully. Please check email
              </p>
            )}
            {showInput && (
              <div>
                <div
                  onClick={getLink}
                  className={`w-52 h-12 cursor-pointer pt-2 ${
                    isResetDisabled ? "opacity-50" : ""
                  }`}
                >
                  {isLoading ? (
                    <h2 className=" flex justify-center text-center lg:text-[1vw] text-[18px] p-3 rounded-xl text-white font-semibold">
                      <img src={loadingImg} alt="Loading" className="w-10 " />
                    </h2>
                  ) : (
                    <h2 className="bg-[#C31A7F] text-center lg:text-[1vw] text-[18px] p-3 rounded-xl text-white font-semibold">
                      Send email
                    </h2>
                  )}
                </div>
              </div>
            )}
            {showInput && (
              <div className="mt-3">
                <NavLink to="/LoginForm">
                  <h1 className="  text-[#C31A7F] lg:text-[1.1vw] text-[18px] font-semibold cursor-pointer underline decoration-1">
                    Login again
                  </h1>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

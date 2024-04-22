import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Craousel from "../Components/Craousel";
import { baseurl } from "../Api/baseUrl";
import logo2 from "../Photos/logo2.png";
import LogoCAn from "../Photos/LogoCAn.png";
import vthree from "../Photos/vthree.gif";

const PasswordInput = ({ placeholder, value, onChange, eye, onEyeClick }) => (
  <div className="border-2 lg:h-[3.27vw] h-12 mx-4 mt-3 lg:mx-8 lg:m-2 px-4 rounded-[20px] flex items-center justify-center gap-4">
    <IoKeyOutline className="lg:text-[1vw]" />
    <div className="font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]"></div>
    <input
      placeholder={placeholder}
      className="bg-transparent w-full outline-none border-0 text-[18px] lg:text-[1.1vw]"
      type={eye ? "text" : "password"}
      onChange={onChange}
      value={value}
      minLength={3}
    />
    <div onClick={onEyeClick}>
      {eye ? <AiOutlineEye className="lg:text-[1vw]" /> : <AiOutlineEyeInvisible className="lg:text-[1vw]" />}
    </div>
  </div>
);

const LoginOTP = () => {
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const Useremail = JSON.parse(localStorage.getItem("userValue"));
    if (Useremail) {
      const newUserdata = {
        email: Useremail.email,
        date_of_birth: Useremail.date_of_birth,
        full_name: Useremail.full_name,
        gender: Useremail.gender,
        phone_number: Useremail.phone_number,
        otp:Useremail.otp,
        agreed_To_Terms: Useremail.agreed_To_Terms,
        password: password,
        confirm_password: confirmPassword
      };
      setUserData(newUserdata);
    }
  }, [password, confirmPassword]);


  const seePass = () => setEye(!eye);
  const seePass1 = () => setEye1(!eye1);

  const SetPassword = async () => {
    if (!userData) {
      console.error("User data is not available.");
      return;
    }
    const newUserdata = {
      ...userData,
      password: password,
      confirm_password: confirmPassword
    };
    try {
      // const response = await fetch(`${baseurl}/user/user-register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(userData),
      // });
      localStorage.setItem("userValue", JSON.stringify(newUserdata));

      // if (response.ok) {
      //   console.log("Password set successfully");
      //   // Redirect or perform any action upon successful password set
      // } else {
      //   console.error("Failed to set password:", response.statusText);
      // }
    } catch (error) {
      console.error("Error setting password:", error.message);
    }
  };

  return (
    <>
      <div className="grid flex justify-start center-1">
        <NavLink to="/">
          <div className="flex px-10 w-[100%]">
            <img src={logo2} className="lg:block md:block hidden" alt="" />
            <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
          </div>
        </NavLink>
      </div>
      <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
        <Craousel />
        <div className=" md:w-1/2 lg:w-[35%] px-5">
          <form className="bg-white shadow-md rounded rounded-2xl mb-4">
            <div className="py-5">
              <img src={vthree} className="w-full" alt="none" />
            </div>

            <div className="text-center text-[1.56vw] text-11 mt-5 font-semibold p-1 text-[#C31A7F]">
              <h1>Create your password</h1>
            </div>
            <div className="mt-6 flex flex-col">
              <PasswordInput
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                eye={eye}
                onEyeClick={seePass}
              />
              <PasswordInput
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                eye={eye1}
                onEyeClick={seePass1}
              />

              {password.length < 8 && (
                <div className="text-red-500 lg:text-[1vw] text-12 text-center">
                  Your password should be greater than 8 digits.
                </div>
              )}

              <div className="flex justify-center py-10 gap-3">
                {password.length >= 8 && password === confirmPassword ? (
                  <NavLink to="/choosetitle" className="">
                    <button
                      onClick={SetPassword}
                      className=" bg-[#C31A7F] lg:text-[1.1vw] px-2 text-center py-[12px] px-[60px] rounded-xl text-white"
                    >
                      Continue
                    </button>
                  </NavLink>
                ) : (
                  <div className="">
                    <button className=" bg-[#C31A7F] lg:text-[1.1vw] px-2 text-center py-[12px] px-[60px] rounded-xl text-white opacity-60">
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginOTP;

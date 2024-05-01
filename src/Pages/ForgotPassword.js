import React, { useState } from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import Frame from '../Photos/Frame.png'
import { AiOutlineMail } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseurl } from '../Api/baseUrl'
import logo2 from "../Photos/logo2.png";
import logoCAn from '../Photos/LogoCAn.png'
import loadingImg from '../Photos/GIF/loader.gif'
import base_token from '../Api/baseUrl'
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const getOtp = async () => {
    try {
      const response = await axios.post(`${baseurl}/user/user-password-reset`, {
        phone_number: phoneNumber, // Send phone number instead of email
        type: "forgotpassword",
      });

      sessionStorage.setItem("phoneNumber", JSON.stringify({ phoneNumber: phoneNumber }));
      sessionStorage.setItem("user_otp", JSON.stringify({ user_otp: response.data.otp }));

      if (response.data.status === true) {
        navigate("/OtpVerify");
      } else {
        setError("(Phone number not found)");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const enteredValue = event.target.value;
    setPhoneNumber(enteredValue);

    // Regular expression pattern to check if entered text is in phone number format
    const phonePattern = /^\d{10}$/; // Assuming a 10-digit phone number format

    if (!phonePattern.test(enteredValue)) {
      setError('(Invalid Phone Number)');
    } else {
      setError('');
    }
  };

  const isResetDisabled = error !== '';

  return (
    <>
      <div className="grid flex justify-start center-1">
        <NavLink to='/'>
          <div className="flex px-10 w-[100%]">
            <img src={LogoCAn} alt="" />
          </div>
        </NavLink>
      </div>

      <div className="lg:h-screen h-fit lg:flex md:flex lg:p-0 px-4  items-center sm:block justify-center">
        <div className="shadow-xl p-[30px] bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-lg rounded-[20px]"
             style={{ boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex flex-col items-center gap-4">
            <div>
              <h1 className="lg:text-[2vw]  text-[24px] font-semibold  text-[#C31A7F]">
                Forgot Password
              </h1>
            </div>
            <div className="text-center">
              <p className="lg:text-[1vw]  text-[#555555] text-[12px] font-semibold">
                Please, enter your registered phone number. You'll receive
              </p>
              <p className="lg:text-[1vw]  text-[#555555] text-[12px] font-semibold">
                a link to reset password.
              </p>
            </div>
            <div>
              <img className="w-28 h-28" src={Frame} alt="none" />
            </div>
            <div>
              <div className="border-2 lg:h-12 h-12  mt-3 lg:w-[350px] w-[300px]  rounded-[20px] flex items-center gap-4">
                <input
                  placeholder="Enter Phone Number"
                  className="border-none w-full bg-transparent placeholder: outline-none p-4"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <div className="text-red-400 lg:text-xs lg:text-[.6vw] text-[10px]  lg:w-[50%] ">
                {error && <p>{error}</p>}
              </div>
            </div>
            <div>
              <div onClick={getOtp} className={`w-52 h-12 cursor-pointer pt-2 ${isResetDisabled ? 'opacity-50' : ''}`}>
                {isLoading ? (
                  <h2 className=" flex justify-center text-center lg:text-[1vw] text-[18px] p-3 rounded-xl text-white font-semibold">
                    <img src={loadingImg} alt="Loading" className='w-10 ' />
                  </h2>
                ) : (
                  <h2 className="bg-[#C31A7F] text-center lg:text-[1vw] text-[18px] p-3 rounded-xl text-white font-semibold">
                    Reset password
                  </h2>
                )}
              </div>
            </div>
            <div className="mt-3">
              <NavLink to="/LoginForm">
                <h1 className="  text-[#C31A7F] lg:text-[1.1vw] text-[18px] font-semibold cursor-pointer underline decoration-1">
                  Login again
                </h1>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default ForgotPassword

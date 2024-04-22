import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import PinInput from 'react-pin-input'
import axios from 'axios'
import { baseurl } from '../Api/baseUrl'
import { useEffect } from 'react'
import logo2 from "../Photos/logo2.png";
import logoCAn from '../Photos/LogoCAn.png'
import arrow22 from '../Photos/arrow22.png'
import loadingImg from "../Photos/GIF/loader.gif";

const OtpVerify = () => {

  const navigate = useNavigate()

  const [pin, setPin] = useState('');
  const [otpMail, setOtpmail] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (value) => {
    setPin(value);
    // console.log('Pin value:', value);
  };

  useEffect(() => {
    const getEmail = sessionStorage.getItem('email')
    const parse = JSON.parse(getEmail)
    setOtpmail(parse.email)
  })

  const getOtp = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/otpsend`, {
        email: otpMail,
        type: "sinup",
      });
      console.log("registerOTP : ", response);
      sessionStorage.setItem(
        "email_phone",
        JSON.stringify({ email_phone: otpMail })
      );
      sessionStorage.setItem(
        "user_otp",
        JSON.stringify({ user_otp: response.data.otp })
      );

      if (response.data.status === true) {
        navigate("/OtpVerify");
      } else if (response.data.status === false) {
        window.alert("Wrong Otp");
      }
      else{
        console.error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp =async (e) => {
    setIsLoading(true);
    try {
      
      const res = await axios.post(`${baseurl}/api/otpverify`, {
        email_phone: otpMail,
        otpnumber: pin,
      });
      console.log(res.data);
      if (res.data.status === true) {
        navigate("/ResetPassword");
      }
      
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
    // console.log("helloOTP")
  }

  return (
    <>
      <div className="grid flex justify-start center-1">
      <NavLink to='/'>
        <div className="flex px-10 w-[100%]">
          <img src={logo2} className="lg:block md:block hidden" alt="" />
          <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
        </div>
        </NavLink>
      </div>

      <div className="lg:h-screen h-fit md:flex sm:block lg:p-0   pt-[100px]  items-center  justify-center">
        <div
          className="shadow-xl py-[90px]   bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-lg rounded-[20px]"
          style={{
            boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)",
          }}
        >
          <NavLink to={"/forgotpassword"}>
            <div className=" py-2 cursor-pointer px-2">
              <img src={arrow22} alt="" />
            </div>
          </NavLink>
          <div className=" flex flex-col lg:px-10 px-8 items-center justify-center gap-5">
            <div>
              <h1 className="lg:text-[28px]  text-[24px] font-semibold  text-[#C31A7F]">
                OTP Verfication
              </h1>
            </div>

            <div className="text-center">
              <p className="lg:text-[16px] text-[12px]   text-[#555555] font-semibold">
                OTP has been sent to {otpMail}
              </p>
            </div>

            <div className="flex relative flex-row items-center justify-center lg:ml-5 ml-4  gap-5 mt-6">
              <PinInput
                length={4}
                id="pin"
                value={pin}
                onComplete={handlePinChange}
                inputStyle={{
                  border: "none",
                  borderBottom: "1px solid black",
                  width: "30px",
                  textAlign: "center",
                  marginRight: "30px",
                }}
              ></PinInput>
            </div>
            <div className="mt-2">
              <div className="flex flex-row gap-1">
                <p className="text-[#7E7E7E] lg:text-[16] text-[14px]  ">
                  Don't receive the OTP?
                </p>
                <p className="cursor-pointer  text-[#C31A7F] lg:text-[16px] text-[14px]  font-semibold" onClick={getOtp}>
                  Resend OTP
                </p>
              </div>
            </div>

            <div className="mt-2">
              {isLoading ? (
                <img src={loadingImg} alt="Loading" className='w-10' /> // Show loading image while verifying
              ) : (
                <div>
                  {pin.length === 4 ? (
                    <div
                      onClick={verifyOtp}
                      className="w-52 h-12 cursor-pointer"
                    >
                      <h2 className="bg-[#C31A7F] text-center p-3 rounded-xl text-white font-semibold">
                        Verify
                      </h2>
                    </div>
                  ) : (
                    <div className="w-52 h-12 cursor-pointer opacity-50">
                      <h2 className="bg-[#C31A7F] text-center p-3 rounded-xl text-white font-semibold">
                        Verify
                      </h2>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerify

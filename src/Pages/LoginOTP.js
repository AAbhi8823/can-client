import React, { useRef, useState } from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import WelcomeScreen from '../Photos/WelcomeScreen.png'
import Video from '../Photos/Video.png'
import { NavLink, useNavigate } from 'react-router-dom'
import CarouselMain from '../Components/CarouselMain'
import c7 from '../Photos/c7.png'
import vtwo from '../Photos/vtwo.gif'
import PinInput from 'react-pin-input'
import { baseurl } from '../Api/baseUrl'
import axios from 'axios'
import logo2 from "../Photos/logo2.png";
import logoCAn from '../Photos/LogoCAn.png'
import arrow22 from '../Photos/arrow22.png'
import Craousel from '../Components/Craousel'
const LoginOTP = () => {

    const [otpResent, setOtpResent] = useState(false);
    const [pin, setPin] = useState('');
    const [otpErr, setOtpErr] = useState("");
    const navigate = useNavigate()
    const pinInputRef = useRef(null);
    const Useremail = JSON.parse(localStorage.getItem("userValue"));
    console.log('Useremail::>>',Useremail)
    // resend OTP
    // const resendOtp = async () => {
    //     try {
    //         const { data } = await axios.post(`${baseurl}/api/otpsend`, {
    //             email: Useremail.email,
    //             date_of_birth: Useremail.date_of_birth,
    //             full_name: Useremail.full_name,
    //             gender: Useremail.gender,
    //             phone_number: Useremail.phone_number,
    //             agreed_To_Terms: Useremail.agreed_To_Terms,
    //         });
            
    //         if (data.status === true) {
    //             setOtpResent(true);
    //             localStorage.setItem(
    //               "user_otp",
    //               JSON.stringify({ user_otp: data.otp })
    //             );
    //             setPin(data.otp)
    //             pinInputRef.current.clear();
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    //Verify otp
    const [isVerifing, setIsVerifing] =useState()
    const verifyOTP = async (e) => {
        setIsVerifing(true)
        e.preventDefault()
        const userData = {
          email: Useremail.email,
          date_of_birth: Useremail.date_of_birth,
          full_name: Useremail.full_name,
          gender: Useremail.gender,
          phone_number: Useremail.phone_number,
          agreed_To_Terms: Useremail.agreed_To_Terms,
          otp: pin,
        };
        try {
            // console.log(JSON.parse(sessionStorage.getItem("phone_number")))
            const { data } = await axios.post(`${baseurl}/user/user-register`, userData);
            console.log('Response:', data);
            // sessionStorage.getItem(JSON.stringify({ user_otp: data.otp }))

            if (data.status === true) {
                navigate('/password');
                setIsVerifing(false)
                localStorage.setItem("userValue", JSON.stringify({ ...userData }));
            } else {
                setOtpErr("OTP is incorrect");
                pinInputRef.current.clear();
                setIsVerifing(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePinChange = (value) => {
        setPin(value);
        console.log('Pin value:', value);
    };


    return (
      <>
        <div className="grid flex justify-start center-1">
          <NavLink to="/">
            <div className="flex px-10 w-[100%] ">
              <img src={logo2} className="lg:block md:block hidden" alt="" />
              <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
            </div>
          </NavLink>
        </div>
        <div>
          <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          < Craousel/>
            <div className=" md:w-1/2 lg:w-[35%] px-5">
              <form className="bg-white shadow-md rounded  rounded-2xl  mb-4">
                <NavLink to={"/register"}>
                  <div className="px-4 py-2 cursor-pointer">
                    <img src={arrow22} alt="" />
                  </div>
                </NavLink>
                <div>
                  <img
                    className="w-full rounded-[20px] w-[100%]"
                    src={vtwo}
                    alt="none"
                  />
                </div>
                <div className="text-center  mt-5 lg:text-[1.56vw] font-semibold  p-1   text-[#C31A7F]">
                  <h1>OTP Verification</h1>
                </div>
                <div className="text-center lg:text-[1.2vw] py-4">
                  Enter the OTP sent to you
                </div>

                <div className="flex pl-4  justify-center relative items-center   ">
                  <PinInput
                    ref={pinInputRef}
                    length={4}
                    id="pin"
                    value={pin}
                    onComplete={handlePinChange}
                    inputStyle={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "27px",
                      textAlign: "center",
                      marginRight: "30px",
                    }}
                  ></PinInput>
                </div>
                {otpErr && <p className="text-center text-red-500">{otpErr}</p>}

                <div className="text-center py-4 flex mt-4 mb-4 gap-1 justify-center text-[18px] text-[1vw]">
                  <p className=" text-[18px] lg:text-[1vw]">
                    Didn't recieved the OTP?
                  </p>
                  <p
                    className="text-center  text-[18px] lg:text-[1vw] text-[18px]  text-[#C31A7F] cursor-pointer"
                    // onClick={resendOtp}
                  >
                    Resend OTP
                  </p>
                </div>
                {otpResent && (
                  <p className="text-center   text-[#C31A7F]">
                    New OTP is Sent
                  </p>
                )}

                <div className="flex justify-center py-2">
                  <div className="py-5">
                    <button
                      type="submit"
                      onClick={verifyOTP}
                      className=" bg-[#C31A7F] text-white lg:text-[1.1vw] px-2 text-center py-[12px] px-[60px] rounded-xl "
                    >
                      {isVerifing ? "Verifing..." : "Verify"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}


export default LoginOTP
import React, { useRef, useState } from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import WelcomeScreen from '../Photos/WelcomeScreen.png'
import Video from '../Photos/Video.png'
import { Link, useNavigate } from 'react-router-dom'
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
    const Useremail = JSON.parse(sessionStorage.getItem("email_phone"));

    // resend OTP
    const resendOtp = async () => {
        try {
            const { data } = await axios.post(`${baseurl}/api/otpsend`, {
                email_phone: Useremail.email_phone,
                type : "sinup"
            });
            
            if (data.status === true) {
                setOtpResent(true);
                sessionStorage.setItem(
                  "user_otp",
                  JSON.stringify({ user_otp: data.otp })
                );
                setPin(data.otp)
                pinInputRef.current.clear();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //Verify otp
    const [isVerifing, setIsVerifing] =useState()
    const verifyOTP = async (e) => {
        setIsVerifing(true)
        e.preventDefault()
        try {
            console.log(JSON.parse(sessionStorage.getItem("email_phone")))
            const { data } = await axios.post(`${baseurl}/api/otpverify`, {
                email_phone: Useremail.email_phone,
                otpnumber: pin,
            });
            console.log('Response:', data);
            sessionStorage.getItem(JSON.stringify({ user_otp: data.otp }))

            if (data.status === true) {
                navigate('/password');
                setIsVerifing(false)
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
          <Link to="/">
            <div className="flex px-10 w-[100%] ">
              <img src={logo2} className="lg:block md:block hidden" alt="" />
              <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
            </div>
          </Link>
        </div>
        <div>
          <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
            {/* <div className=' hidden lg:block w-[55%] mt-20  flex flex-col items-center justify-center '>
                        <div className=' flex flex-col items-center justify-center gap-4'>
                            
                            <div className='ml-[10%]'>
                            
                                <img src={c7} className='h-[350px] w-[450px]' alt='none' />
                            </div>

                            <div className=' mt-5 flex flex-col items-center justify-center gap-1 '>
                                <h1 className='text-center text-[36px] font-semibold '>Hospital visits, easier.</h1>
                                <p className='text-center text-[18px] font-medium '>Upload and manage your medical records and reports,</p>
                                <p className='text-center text-[18px] font-medium '> all in one place.</p>
                            </div>

                            <div className='flex flex-row items-center gap-4 mt-4 '>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#C31A7F]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                            </div>
                        </div>
                    </div> */}
 {/* <div className='hidden md:block lg:block w-[50%]   flex flex-col items-center justify-center   '>
                        <div className='flex flex-col items-center justify-center gap-4 '>

                            <div className=''>

                                <img src={c7} className='w-[24vw]' alt='none' />
                            </div>

                            <div className='  flex flex-col items-center justify-center mt-4  '>
                                <h1 className='text-center text-[2.67vw] font-bold '>Hospital visits, easier.</h1>
                                <p className='text-center font-medium text-[1.33vw] mt-2 '>Upload and manage your medical records and reports,</p>
                                <p className='text-center font-medium text-[1.33vw] mt-2 '>all in one place.</p>
                            </div>
                            <div className='flex flex-row items-center gap-4 mt-4 '>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#C31A7F]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                            </div>
                        </div>
                    </div> */}
          < Craousel/>

            {/* right side */}
            {/* <div className='h-[100vh]  flex lg:items-center'>
                        <div className='lg:h-[650px] md:w-[660px] lg:w-[501px] sm:w-[330px] h-[550px] lg:mr-[140px] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]' style={{
                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <img className='object-contain rounded-[20px]' src={vtwo} alt='none' />
                            </div>
                            <div className='text-center lg:text-3xl mt-5 text-[24px] font-semibold  p-1   text-[#C31A7F]'>
                                <h1>OTP Verification</h1>
                            </div>
                            <div className='text-center py-4'>Enter the OTP sent to you</div>

                            <div className='flex pl-4  justify-center relative items-center   '>

                                <PinInput

                                    ref={pinInputRef}
                                    length={4}

                                    id='pin'
                                    value={pin}
                                    onComplete={handlePinChange}
                                    inputStyle={{
                                        border: 'none',
                                        borderBottom: '1px solid black',
                                        width: '40px',
                                        textAlign: 'center',
                                        marginRight: '30px',
                                    }}
                                ></PinInput>

                            </div>
                            {otpErr && <p className='text-center text-red-500'>{otpErr}</p>}

                            <div className='text-center py-4 flex mt-4 mb-4 gap-1 justify-center'>
                                <p>Didn't recieved the OTP?</p>
                                <p className='text-center   text-[#C31A7F] cursor-pointer' onClick={resendOtp}>Resend OTP</p>
                            </div>
                            {otpResent && <p className='text-center   text-[#C31A7F]'>New OTP is Sent</p>}

                            <div className='flex justify-center py-2'>


                     

                                <div className='w-[40%]' onClick={verifyOTP}>
                                    <h2 className='bg-[#C31A7F] cursor-pointer font-semibold  text-center p-3 rounded-lg text-white'>Verify</h2>
                                </div>

                            </div>



                        </div>
                    </div> */}

            <div class=" md:w-1/2 lg:w-[35%] px-5">
              <form class="bg-white shadow-md rounded  rounded-2xl  mb-4">
                <Link to={"/register"}>
                  <div className="px-4 py-2 cursor-pointer">
                    <img src={arrow22} alt="" />
                  </div>
                </Link>

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
                    onClick={resendOtp}
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
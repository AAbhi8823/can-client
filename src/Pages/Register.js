import React, { useRef, useState, useEffect } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";
import vibird1 from "../Photos/vibird1.gif";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsGenderAmbiguous, BsStackOverflow } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import CarouselMain from "../Components/CarouselMain";
import c4 from "../Photos/c4.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Signup } from '../Api/HandleApi'
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import LoginOTP from "./LoginOTP";
import "./Register.css";
import $ from "jquery";
import "select2"; // Import Select2 after jQuery
import { useNavigate } from "react-router-dom";
import Logo from "../Photos/Logo.png";
import can1 from "../Photos/can1.png";
import register1 from "../Photos/register1.png";
import TodayIcon from "@mui/icons-material/Today";
import logo2 from "../Photos/logo2.png";
import logoCAn from "../Photos/LogoCAn.png";
import Cookies from "js-cookie";
import Craousel from '../Components/Craousel'
import elite1 from '../Photos/elite1.gif'
const Register = () => {
  const navigate = useNavigate();

  const[isOtpSending, setIsOtpSending] =useState()
  const handleRegistration = async () => {
    setIsOtpSending(true)
    
    const userData = {
      username: Username,
      email_phone: email,
      gender: gender,
      date_of_birth: startDate,
    };

    localStorage.setItem("userValue", JSON.stringify({ ...userData }));

    try {
      const response = await axios.post(`${baseurl}/api/otpsend`, {
        email_phone: email,
        type: "sinup",
      });
      console.log("registerOTP : ", response);
      sessionStorage.setItem(
        "email_phone",
        JSON.stringify({ email_phone: email })
      );
      sessionStorage.setItem(
        "user_otp",
        JSON.stringify({ user_otp: response.data.otp })
      );
      sessionStorage.setItem("username", userData.username );

      if (response.data.status === true) {
        navigate("/loginotp");
        setIsOtpSending(false)
      } else {
        setError("(Email already Exist)");
        window.alert("Email already Exist");
        setIsOtpSending(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectRef = useRef(null);

  useEffect(() => {
    $(selectRef.current).select2({
      minimumResultsForSearch: Infinity,
    });

    $(selectRef.current).on("change", function () {
      const selectedValue = $(this).val();
      setGender(selectedValue);
    });

    return () => {
      $(selectRef.current).select2("destroy");
      $(selectRef.current).off("change");
    };
  }, []);

  //Email input box
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [gender, setGender] = useState("");

  // const handleGender = (e) => {
  //     setGender(e.target.value)
  // }

  const handleBtno = () => {
    console.log(gender);
  };
  const handleEmailChange = (event) => {
    const enteredValue = event.target.value;
    setEmail(enteredValue);

    // Regular expression patterns to check if entered text is in email or mobile number format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/; // Assuming a 10-digit mobile number format

    if (!emailPattern.test(enteredValue) && !mobilePattern.test(enteredValue)) {
      setError("(Invalid Email or Mobile Number)");
    } else {
      setError("");
    }
  };

  //before continue
  const [Username, setUsername] = useState("");
  // const [gender, setgender] = useState('')
  const [startDate, setStartDate] = useState("");
  const [check, setcheck] = useState(false);

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  const handledobChange = (date) => {
    setStartDate(date);
  };
  const currentDate = new Date().toISOString().slice(0, 10);

  // const handleChange = (e) => {
  //     setgender(e.target.value);
  // };

  function handleCheckChange(e) {
    setcheck(!check);
  }

  const openDatePicker = () => {
    document.getElementById("dateOfBirth").click();
  };

  return (
    <>
      <div className="grid flex justify-start center-1">
        <Link to="/">
          <div className="flex px-10 w-[100%]">
            <img src={logo2} className="lg:block md:block hidden" alt="" />
            <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
          </div>
        </Link>
      </div>

      {/* <div className="grid grid-cols-2 flex px-20">
                <div className=''>

                    <div className='hidden lg:block mt-10  '>
                        <div className=' flex flex-col items-center justify-center  '>

                            <div className=' flex flex-col items-center justify-center'>

                                <img src={c4} className='w-1/2' alt='none' />
                            </div>

                            <div className='  flex flex-col items-center justify-center mt-4  '>
                                <h1 className='text-center text-[2.343vw] font-bold '>WELCOME TO CAN!</h1>
                                <p className='text-center font-medium text-[1.16vw] mt-2 '>CAN is a safe place to share strength hope and ask for help.</p>
                                <p className='font-semibold'></p>
                                <p className='text-center text-[1.16vw] font-medium '>Lets fight against cancer , together</p>
                            </div>
                            <div className='flex flex-row items-center gap-4 mt-5 '>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#C31A7F]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                            </div>
                        </div>
                    </div>
                </div> 
         <div className='px-20'>
                    <div className='   form backdrop-blur-md item-center rounded-[20px] bg-[#D0F5D3] bg-opacity-10'>
                        <div>
                            <img src={vibird1} className='w-fit' alt='none' />
                        </div>

                        <div className='text-center pt-0 text-[1.95vw] font-semibold p-2   text-[#C31A7F]'>
                            <h1 className='text-[18px]'>Register</h1>
                        </div>
                        <div className=' text-center flex justify-center gap-1'>
                            <p className='text-[1.17vw] text-[18px]'>Have an account?</p>
                            <p className='text-[#3C37FF]  text-[1.17vw] font-semibold '>
                                <Link to={`/LoginForm`}>
                                    Sign in</Link></p>
                        </div>
                        <div className='p-4'>
                            <div className='border-2 lg:h-12 h-12  mt-1   px-2 rounded-[20px] flex items-center justify-center '>
                                <h1 className='font-bold flex items-center w-max h-full px-3 '><VscAccount /></h1>
                                <div className='    bg-[#000] h-[2.27vw] w-[0.5px]  text-[1.30vw]'></div>
                                <input placeholder='Enter full name' className='border-none w-full bg-transparent placeholder: outline-none px-2'
                                    value={Username} onChange={changeUsername} />
                            </div>

                            <div className='border-2 lg:h-12 h-12  mt-3   px-2 rounded-[20px] flex items-center '>
                                <h1 className='font-bold flex items-center w-max h-full px-3 '><AiOutlineMail /></h1>
                                <div className='     bg-[#000] h-[35px] w-[0.5px]  text-[20px]'></div>
                                <input placeholder='Email/phone no.' className='border-none w-full bg-transparent placeholder: outline-none px-2'
                                    value={email}
                                    onChange={handleEmailChange} />
                                <div className='text-red-400 lg:text-xs text-[10px]  lg:w-[50%] '>{error && <p>{error}</p>}</div>
                            </div>

                            <div className='border-2 lg:h-12 h-12  mt-3  px-2 rounded-[20px] flex items-center '>
                                <h1 className='font-bold flex items-center w-max h-full px-3 '><BsGenderAmbiguous /></h1>
                                <div className='     bg-[#000] h-[2.27vw] w-[0.5px]  text-[1.30vw] '></div>

                                <select
                                    value={gender}
                                    id="gender"
                                    ref={selectRef}
                                    name="gender"
                                    className=" py-2 w-full bg-red rounded-md focus:outline-none focus:none bg-transparent px-2 "
                                >
                                    <option disabled selected value="">Choose Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className='border-2 lg:h-12 h-12   mt-3  px-2 rounded-[20px] flex items-center '>
                                <h1 className='font-bold flex items-center w-max h-full px-3 ' ><SlCalender id='dateOfBirth' type='date' /></h1>
                                <div className='     bg-[#000] h-[35px] w-[0.5px]  text-[1.27vw] '></div>

                                <label htmlFor="dateOfBirth"></label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    value={startDate}
                                    max={currentDate}
                                    onChange={handledobChange}
                                    className='w-full pl-2 focus:outline-none focus:none bg-transparent '

                                />
                            </div>
                        </div>
                        <div className=' flex text-center px-5' >
                            <h1 className='text-[0.97vw]'><input type='checkbox' className='' value={check} onChange={handleCheckChange} />By Continuing, you would agree our <Link className='underline font-semibold text-[0.97vw]' to={'/TermCondition'} >Terms of Service</Link> and <Link className='underline font-semibold text-[0.97vw]' to={'/PrivatePolicy'} >Privacy Policy.</Link></h1>
                        </div>
                        <div className='flex justify-center lg:py-3 p-[10px]'
                            >

                                {
                                    Username && email && startDate && check ? (<button onClick={handleRegistration} className=' bg-[#C31A7F] text-center py-[12px] px-[60px] rounded-xl text-white' type='submit'>Continue</button>) : (<button className=' bg-[#C31A7F] opacity-50 text-center py-[12px] px-[60px] rounded-xl text-white'>Continue</button>)
                                }

                            </div>

                    </div>
                </div>
            </div> */}
      <div className=" ">
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          {/* <div className="hidden md:block lg:block w-[50%]   flex flex-col items-center justify-center   ">
            <div className="flex flex-col items-center justify-center gap-4 ">
              <div className="">
                <img src={c4} className="w-[28vw]" alt="none" />
              </div>

              <div className="  flex flex-col items-center justify-center mt-4  ">
                <h1 className="text-center text-[2.67vw] font-bold ">
                  WELCOME TO CAN!
                </h1>
                <p className="text-center font-medium text-[1.33vw] mt-2 ">
                  CAN is a safe place to share strength hope and ask for help.
                </p>
                <p className="font-semibold"></p>
                <p className="text-center text-[1.33vw]  font-medium ">
                  Lets fight against cancer , together
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 mt-5 ">
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#C31A7F]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
              </div>
            </div>
          </div>  */}
          < Craousel/>
          <div class=" md:w-1/2 lg:w-[35%] px-5">
            <div>
              <img src={elite1} className="w-[100%]" alt="none" />
            </div>

            <div className="text-center text-[22px] lg:text-[1.95vw] font-semibold    text-[#C31A7F]">
              <h1 className="">Register</h1>
            </div>
            <div className="px-0 px-4 lg:px-10">
              <div className=" text-center flex justify-center ">
                <p className="lg:text-[1.17vw] text-[20px]">Have an account?</p>
                <p className="text-[#3C37FF] px-2 lg:text-[1.17vw] text-[18px]">
                  <Link to={`/LoginForm`}>Sign in</Link>
                </p>
              </div>

              <div className="border-2 lg:h-[3vw] h-12 mt-1   rounded-[20px] flex items-center justify-center ">
                <h1 className="font-bold flex items-center w-max h-full px-3 lg:text-[1.30vw] text-[18px]">
                  <VscAccount />
                </h1>
                <div className="     inher-1 bg-[#000] h-[3.3vh] lg:h-[2.27vw] w-[0.5px]  text-[1.30vw]"></div>
                <input
                  placeholder="Enter full name"
                  className="border-none w-full bg-transparent placeholder: outline-none  ml-3 text-[18px] lg:text-[1vw]"
                  value={Username}
                  onChange={changeUsername}
                />
              </div>
              <div className="border-2 lg:h-[3vw] h-12  mt-3    rounded-[20px] flex items-center ">
                <h1 className="font-bold flex items-center w-max h-full px-3 lg:text-[1.30vw] text-[18px]">
                  <AiOutlineMail />
                </h1>
                <div className="   inher-1 bg-[#000] h-[3.3vh] lg:h-[2.27vw] w-[0.5px]  text-[1.30vw]"></div>
                <input
                  placeholder="Email/phone no."
                  className="border-none w-full bg-transparent ml-3 placeholder: outline-none text-[18px] lg:text-[1vw]"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="text-red-400 lg:text-xs text-[10px]  lg:w-[50%] ">
                {error && <p>{error}</p>}
              </div>
              <div className="border-2 lg:h-[3vw] h-12  mt-3  rounded-[20px] flex items-center ">
                <h1 className="font-bold flex items-center w-max h-full px-3 lg:text-[1.30vw] text-[18px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M112 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-31 31L112 78.1l7-7c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-7 7 15.2 15.2C187.7 107.6 220.5 96 256 96s68.3 11.6 94.9 31.2l68.8-68.8-31-31c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9h96c8.8 0 16 7.2 16 16v96c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-31-31-68.8 68.8C404.4 187.7 416 220.5 416 256c0 80.2-59 146.6-136 158.2V432h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v8c0 13.3-10.7 24-24 24s-24-10.7-24-24v-8H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h16V414.2C155 402.6 96 336.2 96 256c0-35.5 11.6-68.3 31.2-94.9L112 145.9l-7 7c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l7-7L58.3 92.3l-31 31c-4.6 4.6-11.5 5.9-17.4 3.5S0 118.5 0 112V16C0 7.2 7.2 0 16 0h96zM352 256a96 96 0 1 0 -192 0 96 96 0 1 0 192 0z" />
                  </svg>{" "}
                </h1>
                <div className="   inher-1 bg-[#000] h-[3.3vh] lg:h-[2.27vw] w-[0.5px]  text-[1.30vw]"></div>

                <select
                  value={gender}
                  id="gender"
                  ref={selectRef}
                  name="gender"
                  className=" py-2 w-full bg-red rounded-md focus:outline-none focus:none bg-transparent lg:px-10 text-[18px] lg:text-[2vw] "
                >
                  <option className="" disabled selected value="">
                    Choose Gender
                  </option>
                  <option className="" value="male">
                    Male
                  </option>
                  <option className="" value="female">
                    Female
                  </option>
                  <option className=" " value="other">
                    Other
                  </option>
                </select>
              </div>
               

              <div
                className="border-2 lg:h-[3vw] h-12   mt-3  rounded-[20px] flex items-center "
                onClick={openDatePicker}
              >
                <h1 className="font-bold flex items-center w-max h-full px-3 lg:text-[1.30vw] text-[18px]">
                  {/* <TodayIcon className="" /> */}

                  <AiOutlineCalendar />
                </h1>
                <div className="    inher-1 bg-[#000] h-[3.3vh] lg:h-[2.27vw] w-[0.5px]  text-[1.30vw] "></div>

                <label htmlFor="dateOfBirth"></label>
                <DatePicker
                  type="date"
                  id="dateOfBirth"
                  selected={startDate}
                  max={currentDate}
                  onChange={handledobChange}
                  className="border-none w-full bg-transparent placeholder: outline-none  ml-3 text-[18px] lg:text-[1vw]"
                  placeholderText="Enter DOB"
                />
              </div>
            </div>
            <div className=" flex text-center justify-center mt-6 px-5">
              <h1 className="">
                <input
                  type="checkbox"
                  className="mr-2 font-bold    lg:text-[1.30vw] text-[18px]"
                  value={check}
                  onChange={handleCheckChange}
                />
                By Continuing, you would agree our{" "}
                <Link
                  className="underline font-semibold lg:text-[0.97vw] text-[13px]"
                  to={"/TermCondition"}
                >
                  Terms of Service <br />
                </Link>{" "}
                and{" "}
                <Link
                  className="underline font-semibold lg:text-[0.97vw] text-[13px]"
                  to={"/PrivatePolicy"}
                >
                  Privacy Policy.
                </Link>
              </h1>
            </div>
            <div className="flex justify-center lg:py-3 p-[10px]">
              {Username && email && startDate && check ? (
                <button
                  onClick={handleRegistration}
                  className=" bg-[#C31A7F] lg:text-[1.1vw] px-2 text-center py-[12px] px-[60px] rounded-xl text-white"
                  type="submit"
                >
                  {isOtpSending ? "Continue..." : "Continue"}
                </button>
              ) : (
                <button
                  className=" bg-[#C31A7F] opacity-50 text-center lg:text-[1.1vw] py-[12px] px-[60px] rounded-xl text-white"
                  disabled
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

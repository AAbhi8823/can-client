import React, { useRef, useState, useEffect } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import "./Register.css";
import $ from "jquery";
import "select2";
import { useNavigate } from "react-router-dom";
import Craousel from "../Components/Craousel";
import elite1 from "../Photos/elite1.gif";
const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("male");
  const [isOtpSending, setIsOtpSending] = useState(false);
  const selectRef = useRef(null);
  const [Username, setUsername] = useState("");
  const [mobilenumber,setMobilenumber]=useState()
  const [startDate, setStartDate] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async () => {
    setIsOtpSending(true);
    const userData = {
      full_name: Username,
      phone_number: mobilenumber,
      email:email,
      gender: gender,
      date_of_birth: startDate.toString(), // Ensure correct date format
      agreed_To_Terms: check,
    };
    try {
      const response = await axios.post(
        `${baseurl}/user/user-register`,
        userData
      );
      console.log("User registration", response);
      if (response.data.status === true) {
        navigate("/loginotp");
        localStorage.setItem("userValue", JSON.stringify({ ...userData }));
      } else {
        setError("(Email already Exist)");
        window.alert("Email already Exist");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsOtpSending(false);
    }
  };

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

  const handleEmailChange = (event) => {
    const enteredValue = event.target.value;
    setEmail(enteredValue);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;

    if (!emailPattern.test(enteredValue) && !mobilePattern.test(enteredValue)) {
      setError("(Invalid Email or Mobile Number)");
    } else {
      setError("");
    }
  };

  const numberChage=(event)=>{
    setMobilenumber(event.target.value)
  }
  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handledobChange = (date) => {
    setStartDate(date);
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  const handleCheckChange = () => {
    setCheck(!check);
  };

  const openDatePicker = () => {
    document.getElementById("dateOfBirth").click();
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const isFormValid = Username && email && startDate && check;

  return (
    <>
      <div className="grid flex justify-start center-1">
        <Link to="/">
          <div className="flex px-10 w-[100%]">
            <img src={LogoCAn} className="lg:block md:block hidden" alt="" />
            <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
          </div>
        </Link>
      </div>
      <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
        <Craousel />
        <div className=" md:w-1/2 lg:w-[35%] px-5">
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
            <div className="border-2 lg:h-[3vw] h-12 mt-1   rounded-[20px] flex items-center justify-center ">
              <h1 className="font-bold flex items-center w-max h-full px-3 lg:text-[1.30vw] text-[18px]">
                <VscAccount />
              </h1>
              <div className="     inher-1 bg-[#000] h-[3.3vh] lg:h-[2.27vw] w-[0.5px]  text-[1.30vw]"></div>
              <input
                placeholder="Number"
                className="border-none w-full bg-transparent placeholder: outline-none  ml-3 text-[18px] lg:text-[1vw]"
                value={mobilenumber}
                onChange={numberChage}
              />
            </div>
            <div className="border-2 lg:h-[3vw] h-12  mt-3    rounded-[20px] flex items-center ">
              <h1 className="font-bold flex items-center w-max h-full px-3 lg:text-[1.30vw] text-[18px]">
                <AiOutlineMail />
              </h1>
              <div className="   inher-1 bg-[#000] h-[3.3vh] lg:h-[2.27vw] w-[0.5px]  text-[1.30vw]"></div>
              <input
                placeholder="Email"
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
                defaultValue={"DEFAULT"}
                id="gender"
                ref={selectRef}
                onChange={handleGenderChange}
                name="gender"
                className="py-2 w-full bg-red rounded-md focus:outline-none focus:none bg-transparent lg:px-10 text-[18px] lg:text-[2vw]"
              >
                <option disabled defaultValue="DEFAULT">
                  Choose Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
    </>
  );
};

export default Register;

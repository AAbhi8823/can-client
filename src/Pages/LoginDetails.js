import React, { useState } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";
import five from "../Photos/five.gif";
import { AiOutlineMail } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { SlCalender } from "react-icons/sl";
import { NavLink, useNavigate } from "react-router-dom";
import CarouselMain from "../Components/CarouselMain";
import c4 from "../Photos/c4.png";
import PageImg from "../Photos/p8.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo2 from "../Photos/logo2.png";
import logoCAn from "../Photos/LogoCAn.png";
import arrow22 from "../Photos/arrow22.png";
import LoginCraousel from "../Components/LoginCraousel";
const LoginDetails = () => {
    const navigate = useNavigate();
  //Email input bo
  //before continue
  const [Username, setUsername] = useState("");
  const [gender, setgender] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (e) => {
    setgender(e.target.value);
  };

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  const LoginDetail= async()=>{
    const userValue = JSON.parse(localStorage.getItem("userValue")) || {};
    userValue.username = Username;
    userValue.gender = gender;
    userValue.date_of_birth = startDate;
    localStorage.setItem("userValue", JSON.stringify(userValue));
    console.log(userValue)
    navigate("/registerimage")
  }



  

  

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

      <div className=" ">
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center ">
          <LoginCraousel />

          <div className=" md:w-1/2 lg:w-[35%] px-5">
            <form className="bg-white shadow-md rounded  rounded-2xl  mb-4">
              <NavLink to={"/newusertitle"}>
                <div className="px-4 py-2 cursor-pointer">
                  <img src={arrow22} alt="" />
                </div>
              </NavLink>
              <div>
                <img
                  src={five}
                  className="object-contain w-[100%] rounded-[20px]"
                  alt="Video"
                />
              </div>
              <div className="text-center lg:text-[2.67vw] text-[34px]  font-semibold p-2  text-[#C31A7F]">
                <h1>Your Details</h1>
              </div>
              <div className="p-4">
                <div className="border-2 h-14 lg:h-[4vw] my-4 mx-5 px-2 rounded-[20px] flex items-center justify-center gap-4">
                  <h1 className="font-bold flex  items-center w-max h-full lg:px-2 px-1">
                    <VscAccount className="lg:text-[1vw]" />
                  </h1>
                  <div className="font-bold  bg-[#000] h-[35px] w-[1px] inher-1 inline-block lg:text-[1.40vw] text-[20px]"></div>
                  <input
                    placeholder="Enter full name"
                    className="border-none w-full bg-transparent lg:text-[1.30vw]  placeholder:p-2 outline-none"
                    value={Username}
                    onChange={changeUsername}
                  />
                </div>

                <div className="border-2 lg:h-[4vw] h-14 mx-5  px-2 rounded-[20px] flex items-center gap-4">
                  <h1 className="font-bold flex items-center w-max h-full lg:px-2 px-1">
                    <BsGenderAmbiguous className="lg:text-[1vw]" />
                  </h1>
                  <div className="font-bold bg-[#000] lg:h-[3vw] inher-1  h-[35px] w-[1px] inline-block text-[20px]"></div>

                  <select
                    value={gender}
                    id="gender"
                    name="gender"
                    onChange={handleChange}
                    className=" py-2 w-full border-0 lg:text-[1.10vw] lg:h-[6vh] rounded-md focus:outline-none focus:none bg-transparent "
                  >
                    <option className="text-[#7E7E7E]" value="default">
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="border-2 lg:h-[4vw] h-14 mx-5 my-4 px-2 rounded-[20px] flex items-center gap-4">
                  <h1 className="font-bold flex items-center w-max h-full lg:px-2 px-1">
                    <SlCalender className="lg:text-[1vw]" />
                  </h1>
                  <div className="font-bold bg-[#000] h-[35px] inher-1 w-[1px] inline-block text-[20px]"></div>

                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Date of Birth "
                    className="outline-none border-0 lg:text-[1.30vw] bg-transparent overflow-hidden"
                  />
                </div>
              </div>
              <div className="flex justify-center py-5">
                {Username && gender && startDate ? (
                  <div className="w-[40%]">
                    <button
                      onClick={LoginDetail}
                      className="bg-[#C31A7F] lg:text-[1vw] text-[18px]  text-center p-3 rounded-xl text-white"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <div className="w-[40%]">
                    <h2 className="bg-[#C31A7F] opacity-50 lg:text-[1vw] text-[18px] text-center p-3 rounded-xl text-white">
                      Continue
                    </h2>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginDetails;

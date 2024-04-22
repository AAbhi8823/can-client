import React, { useEffect } from "react";
import CANa from "../Photos/CANa.png";
import profilePic from "../Photos/UserProfile.png";
import bottomGrass from "../Photos/bottomGrass.png";
import leavesPic from "../Photos/leaves.png";
import leaveSecPic from "../Photos/cornerLeaf.png";
import "./ProfileSuccessAdd.css";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookies from "js-cookie";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import logo2 from "../Photos/logo2.png";
import LogoCAn from "../Photos/LogoCAn.png";
import behindGrras from "../Photos/behinggrass.png";
import { base_token } from "../Api/baseUrl";
import logo from "../Photos/LogoCAn.png";
function ProfileSuccessAdd() {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const userValue = JSON.parse(localStorage.getItem("userValue")) || {};
  console.log("userValue::>>>>",userValue);
  const fullDate = userValue.date_of_birth;
  const dateOfBirth = fullDate ? fullDate.split("T")[0] : "";

  useEffect(() => {
    if (token) {
      showData(token);
      setData(location.state);
    } else {
      console.log("no token");
    }
  }, [token, location.state]);

  // const handleSuccess = () => {

  //   navigate("/");
  //   localStorage.clear();
  // };


  const handleSuccess = async () => {
    try {
      const response = await axios.post(`${baseurl}/user/user-register`, userValue, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      if (response.status === 200) {
        console.log("Data sent successfully:", response.data);
        localStorage.clear();
        navigate("/");
      } else {
        console.error("Error sending data to the server");
        // Handle the error as per your requirement
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as per your requirement
    }
  };
  

  const showData = async (token) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/get-root-user`, {
        headers: {
          Authorization: `Bearer ${base_token}`,
        },
      });
      if (data && data.data && data.data.length > 0) {
        setUserData(data.data[0]);
        console.log("User data:", data.data[0]);
      } else {
        console.error("Error fetching user data");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const isoDateString = data?.createdAt;
  const date = new Date(isoDateString);

  // Options for formatting the date
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="grid flex justify-start center-1">
        <div className="flex px-10 w-[100%]">
          <img src={logo2} className="lg:block md:block hidden" alt="" />
          <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
        </div>
      </div>
      <div className="flex justify-center p-[20px]">
        <div className="p-[20px] md:w-[28%] profile_success">
          <div className="flex justify-center p-[20px]">
            <img src={logo} alt="not found" className="w-[80px] h-[80px]" />
          </div>
          <div className="text-[#C31A7F] font-semibold text-center lg:text-[1.7vw] text-[25px] p-[20px]  flex justify-center">
            Profile Successfully added!
          </div>
          <div className="justify-center bg-[#C31A7F] py-6 p-[10px] rounded-lg">
            <div className="flex justify-center grid grid-rows-1 grid-cols-2 w-full lg:w-[70%] m-auto">
              <div className="flex justify-center">
                <Avatar
                  alt=""
                  src={userData?.profile_photo}
                  sx={{ width: 80, height: 80 }}
                />
              </div>
              <div className="leading-6">
                <p className="text-white text-lg">{userValue.username}</p>
                <p className="text-white font-[100] text-[16px]">
                  {userValue.profile_category?.category_Name} {userValue.gender}
                </p>
                <p className="text-white font-[100] text-[16px]">
                  {userValue.email}
                </p>
              </div>
            </div>
            <div className="text-end">
              <p className="text-white text-[12px]">{dateOfBirth}</p>
            </div>
          </div>
          <div className="text-center p-[20px] text-[20px] lg:text-[1.2vw] ">
            Your account has been successfully Created.
          </div>
          <div className="cursor-pointer py-[50px]  ">
            <div
              onClick={handleSuccess}
              className="  text-[20px] lg:text-[1.2vw] bg-[#C31A7F]  text-center p-3 rounded-xl text-white font-semibold"
            >
              Finish
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 w-[100%] grid-cols-2 term-logo fixed bottom-0">
        <div className="relative">
          <img
            src={bottomGrass}
            alt="not found"
            className="object-fit absolute z-20 w-[100%] "
          />
          <img
            src={behindGrras}
            alt="grras"
            className="absolute object-fit top-0 left-0 w-full h-auto z-10 "
          />
        </div>
        <div className="relative">
          <img src={bottomGrass} alt="not found" className="w-[100%] " />
          <img
            src={behindGrras}
            alt="grras"
            className="w-full absolute top-0 z-[-99] "
          />
        </div>
      </div>
      <div className="term-logo">
        <div>
          <img src={leavesPic} alt="not found" className="leaves_img " />
        </div>
        <div>
          <img src={leaveSecPic} alt="not found" className=" leaf_postion" />
        </div>
      </div>
    </div>
  );
}

export default ProfileSuccessAdd;

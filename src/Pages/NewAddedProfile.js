import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import logo2 from "../Photos/logo2.png";
import LogoCAn from "../Photos/LogoCAn.png";
import behindGrras from "../Photos/behinggrass.png";
import bottomGrass from "../Photos/bottomGrass.png";
import leavesPic from "../Photos/leaves.png";
import leaveSecPic from "../Photos/cornerLeaf.png";
import logo from "../Photos/LogoCAn.png";
function ProfileSuccessAdd(props) {
  const base_token=Cookies.get("token");
  const [userData, setUserData] = useState({});
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const userValue = JSON.parse(localStorage.getItem("userValue")) || {};
  const fullDate = userValue.date_of_birth;
  const dateOfBirth = fullDate ? fullDate.split("T")[0] : "";
  const location = useLocation();
  // const userData = location.state?.userData;
  // const userValue = location.state?.userValue;

  console.log("props:::><><><>",location)
  useEffect(() => {
    if (token) {
      showData(token);
      setData(location.state);
    } else {
      console.log("no token");
    }
  }, [token, location.state]);

  const handleSuccess = async () => {
    localStorage.clear();
    navigate("/");
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

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="flex justify-start center-1">
        <div className="flex px-10 w-[100%]">
          <img src={logo2} className="lg:block md:block hidden" alt="" />
          <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
        </div>
      </div>
      <div className="flex justify-center p-[20px]">
        <div className="p-[10px]  profile_success">
          <div className="flex justify-center p-[20px]">
            <img src={logo} alt="not found" className="w-[80px] h-[80px]" />
          </div>
          <div className="text-[#C31A7F] font-semibold text-center lg:text-[20px] text-[20px] pb-[20px]  flex justify-center">
            Profile Successfully added!
          </div>
          <div className="justify-center bg-[#C31A7F] p-[10px] rounded-lg">
            <div className="flex justify-center">
              <div className="flex w-full lg:w-[100%] m-auto">
                <div className="flex justify-unset items-center">
                  <Avatar
                    alt=""
                    src={userData?.profile_photo}
                    sx={{ width: 70, height: 70 }}
                  />
                </div>
                <div className="flex flex-col justify-center pl-3">
                  <p className="text-white text-lg" style={{textTransform: "capitalize", fontWeight: '600'}}>{userValue.username}</p>
                  <p className="text-white font-[100] text-[15px]" style={{ wordbreak: 'break-all', textTransform: "capitalize", fontWeight: '600'  }}>
                    {userValue.profile_category?.category_Name}{" "}
                    {userValue.gender}
                  </p>
                  <p className="text-white font-[100] text-[15px]">
                    {userValue.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-end">
              <p className="text-white text-[12px]">{dateOfBirth}</p>
            </div>
          </div>

          <div className="text-center p-[18px] text-[18px] pt-5 lg:text-[18px] ">
            Your account has been successfully Created.
          </div>
          <div className="cursor-pointer pt-3 pb-5">
            <div
              onClick={handleSuccess}
              className="  text-[15px]  bg-[#C31A7F]  text-center py-2 p-3  rounded-xl text-white font-semibold"
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

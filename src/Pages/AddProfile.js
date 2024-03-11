import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import PinInput from "react-pin-input";
import Cookies from "js-cookie";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Avatar from "@mui/material/Avatar";
import logo2 from "../Photos/logo2.png";
import LoginCraousel from "../Components/LoginCraousel";
import LogoCAn from "../Photos/LogoCAn.png";
import vtwo from "../Photos/vtwo.gif";
import lock from "../Photos/lock.png";
import { base_token } from "../Api/baseUrl";
const AddProfile = () => {
  const [pin, setPin] = useState("");
  const [repin, setRepin] = useState("");
  const [error, setError] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [perData, setPerData] = useState([]);
  const [userBoxId, setUserBoxId] = useState("");
  const [getDiv, setDiv] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [userid, setUserId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const token = Cookies.get("token");
  console.log("token::>>", token);
  const navigate = useNavigate();
  const [creatPin_open, setCreatPin_open] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    console.log("getToken:::::>>>");
    try {
      const response = await axios.get(`${baseurl}/user/get-root-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPerData(response.data.resData.data);
      console.log("Ankursingh::::::>>>>", response.data.resData);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const mainPin = async () => {
    setIsVerifying(true);
    try {
      const dataPin = await axios.post(
        `${baseurl}/userprofile/user-profile-login-pin`,
        {
          pin: loginPin,
          profile_id: userid
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("sdkvjsfkvbdsbfvkubdsifbsifbsrfbsrufv",dataPin.data.resData.status)
      if (dataPin.data.resData.status === true) {
        localStorage.setItem("active_user", userid);
        navigate("/home");
      } else {
        setErrMsg(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
    setIsVerifying(false);
  };

  const handlePinChange = (value) => {
    setPin(value);
  };

  const handleRepinChange = (value) => {
    setRepin(value);
    setError(
      pin === value
        ? "Pins are equal"
        : "Pins do not match, Please re-enter the pin correctly!"
    );
  };

  const creatPin = () => {
    if (token) {
      navigate("/NewUserTitle");
    } else {
      console.log("Token not present");
    }
  };

  const getUser = (boxId) => {
    setUserBoxId(boxId);
    setDiv(!getDiv);
  };

  const goToPin = () => {
    setDiv(!getDiv);
  };

  const handlePinChange1 = (value) => {
    setLoginPin(value);
  };

  return (
    <>
      {creatPin_open && (
        <div
          className="fixed inset-0 flex items-center justify-center lg:p-0 p-2 bg-black bg-opacity-50 z-50 "
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div className="bg-white h-max  rounded-3xl">
            <div className="relative flex lg:py-6  py-4 lg:px-4 items-center flex-col">
              <div className="absolute top-3 right-4">
                <RxCross2 size={15} onClick={creatPin} />
              </div>
              <div className="text-xl  font-semibold">Create a Pin</div>
              <p className=" text-[14px]  text-center px-3 pt-2">
                Its your space, so add a profile lock to keep your account
                information with you
              </p>
              <div className=" text-2xl py-1 flex flex-row items-center justify-center w-full gap-4 ">
                <p className="text-xs  font-semibold flex justify-center w-[14%] pt-8 ">
                  PIN
                </p>
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
              <div className=" text-2xl py-1 flex flex-row items-center justify-center gap-4 w-full  ">
                <p className="text-xs  font-semibold flex justify-center w-[14%] pt-8">
                  Re Enter
                </p>
                <PinInput
                  length={4}
                  id="repin"
                  value={repin}
                  onComplete={handleRepinChange}
                  inputStyle={{
                    border: "none",
                    borderBottom: "1px solid black",
                    width: "30px",
                    textAlign: "center",
                    marginRight: "30px",
                  }}
                ></PinInput>
              </div>
              <div className="w-[40%] pt-5 flex flex-col items-center  ">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="flex flex-col justify-end pt-7">
                  <button
                    className={`w-48 h-12 bg-[#efc31a33] font-bold rounded-[20px] text-white items-center mx-auto ${
                      error && error === "Pins are equal"
                        ? "bg-[#efc31a]"
                        : "pointer-events-none"
                    }`}
                    disabled={error && error !== "Pins are equal"}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {getDiv && (
        <div
          className="fixed inset-0 flex items-center justify-center lg:p-0 p-2 bg-black bg-opacity-50 z-50  "
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div className="bg-white h-max lg:w-[30%] w-[340px] rounded-3xl">
            <div className="relative flex py-6  items-center flex-col">
              <div className="absolute top-3 right-4 ">
                <RxCross2 size={15} onClick={goToPin} />
              </div>
              <div className="text-xl ">
                Enter {perData && perData.username} Pin
              </div>
              {errMsg && (
                <div className="text-red-400 lg:text-xs">
                  Please Enter the correct pin!
                </div>
              )}
              <div className="text-2xl py-6 flex flex-row items-center justify-center w-full">
                <p className="text-xs  font-semibold flex justify-center w-[14%] pt-8 ">
                  PIN
                </p>
                <PinInput
                  length={4}
                  id="pin"
                  value={loginPin}
                  onComplete={handlePinChange1}
                  inputStyle={{
                    border: "none",
                    borderBottom: "1px solid black",
                    width: "30px",
                    textAlign: "center",
                    marginRight: "30px",
                  }}
                ></PinInput>
              </div>
              <div className="flex justify-end w-[80%] pt-4">
                {loginPin.length === 4 ? (
                  <div
                    className="bg-[#C31A7F] text-center px-6 py-2 cursor-pointer rounded-xl text-white"
                    onClick={mainPin}
                  >
                    {isVerifying ? "Verifying..." : "Continue"}
                  </div>
                ) : (
                  <div className="bg-[#C31A7F] text-center px-6 py-2 cursor-pointer rounded-xl text-white opacity-50 ">
                    Continue
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid flex justify-start center-1">
        <NavLink to="/">
          <div className="flex px-10 w-[100%]">
            <img src={logo2} className="lg:block md:block hidden" alt="" />
            <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
          </div>
        </NavLink>
      </div>
      <div>
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          <LoginCraousel />

          <div className="md:w-1/2 lg:w-[35%] px-5">
            <form className="bg-white shadow-md rounded  rounded-2xl  mb-4">
              <div>
                <img
                  src={vtwo}
                  className="w-full w-[100%] rounded-[20px]"
                  alt="none"
                />
              </div>

              <div className="p-4 mx-4 lg:text-[1.7vw]   text-[25px] font-semibold text-center">
                <h1 className="text-[#C31A7F]">
                  Select the profile you wish to <br /> continue with{" "}
                </h1>
              </div>

              <div className="h-[60%] w-[100%] mt-2 relative">
                <div className="flex justify-center  pt-[65px] pb-[65px] ">
                  {console.log("perData::>>>", perData)}
                  {perData &&
                    perData.map((userget, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setUserId(userget._id);
                          getUser(userget._id);
                          
                        }}
                        className="w-[141px] mb-1 h-[130px] rounded-3xl mx-2 flex flex-col justify-center items-center cursor-pointer"
                        style={{
                          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
                          background:
                            userBoxId === userget._id ? "#c31a75" : "#FEE5EA",
                          color: userBoxId === userget._id ? "white" : "black",
                        }}
                      >
                        <h1 className="font-semibold text-lg mt-5 ">
                          {userget.username}
                        </h1>
                        <p className="text-sm">{userget.full_name}</p>
                        <p className="text-sm">{userget.root_user}</p>
                        <img
                          src={lock}
                          style={{
                            filter:
                              userBoxId === userget._id
                                ? "brightness(0) invert(1)"
                                : "",
                          }}
                          alt="none"
                          className="h-5 w-5"
                        />
                        <div className="absolute top-[28px] rounded-full overflow-hidden bg-white p-[3px]">
                          <Avatar
                            alt=" "
                            src={userget.profile_image}
                            sx={{ width: 56, height: 56 }}
                          />
                        </div>
                      </div>
                    ))}
                  {perData && perData.length < 3 && (
                    <div
                      className="w-[141px] mb-1 mx-2 h-[130px] bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer "
                      style={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)" }}
                    >
                      <div onClick={creatPin} className="w-[45%] h-[100%]">
                        <div className="h-full  rounded-3xl flex flex-col justify-center items-center ">
                          <h1 className="font-semibold text-lg">
                            <IoAddCircleOutline />
                          </h1>
                          <p className="text-sm text-center">Add Profile</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center px-[40px] text-[#C9C9C9] ">
                  You can add the profile of your Caregiver by clicking on the
                  Add profile button.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProfile;

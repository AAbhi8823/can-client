import React, { useState } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";
import account from "../Photos/account.jpg";
import CarouselMain from "../Components/CarouselMain";
import { IoAddCircleOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import PinInput from "react-pin-input";
import { baseurl } from "../Api/baseUrl";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import logo2 from "../Photos/logo2.png";
import Craousel from "../Components/Craousel";
import lock from "../Photos/lock.png";
import { base_token } from "../Api/baseUrl";

const ShowProfile = () => {
  const navigate = useNavigate();
  const [singleuserData, setsingleuserData] = useState([]);
  const [personId, setPersonId] = useState();
  const [showPinPopup, setShowPinPopup] = useState(false);
  const [pin, setPin] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [isverifying, setIsVerifying] = useState(false);
  const [perData, setPerData] = useState(null);
  const [userID, setUserID] = useState(null); // Change initial state to null

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          `${baseurl}/user/get-root-user`,
          {
            headers: {
              Authorization: `Bearer ${base_token}`,
            },
          }
        );
        console.log("data:::>>>", data.resData);
        if (data?.resData?.status === true) {
          setsingleuserData(data?.resData?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [base_token]);

  const changeColor = (gotId) => {
    setPersonId(gotId);
  };

  const goToProfile = () => {
    const activeUser = localStorage.getItem("active_user");
    if (activeUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const goToPin = () => {
    setShowPinPopup(!showPinPopup);
  };

  const handlePinChange = (value) => {
    setLoginPin(value);
  };

  const mainPin = async () => {
    setIsVerifying(true);
    // Validate the PIN (add your validation logic here)
    try {
      const response = await axios.post(
        `${baseurl}/userprofile/user-profile-login-pin`,
        {
          pin: loginPin,
          profile_id: userID, // Send the selected profile ID
        },
        {
          headers: {
            Authorization: `Bearer ${base_token}`,
          },
        }
      );

      console.log("Ankurkjffrf", response);
      if (response.data.resData.status=== true) {
        setShowPinPopup(false);
        navigate("/");
      } else {
        // Handle invalid PIN
        console.error("Invalid PIN");
        // Reset PIN input
        setLoginPin("");
      }
    } catch (error) {
      console.error("Error validating PIN:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsVerifying(false);
    }
  };

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
      <div>
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          <Craousel />
          <div className=" md:w-1/2 lg:w-[35%] px-5">
            <form>
              <div className="p-4 mx-4 text-[1.62vw] text-12   font-semibold text-center">
                <h1 className="text-[#C31A7F]">
                  Select the profile you wish to <br /> continue with{" "}
                </h1>
              </div>
              <div className="h-[80%] w-[100%] mt-2 relative">
                <div className="bg-white shadow-md rounded rounded-2xl  mb-4">
                  <div className="flex justify-center  pt-[65px] pb-[65px]  ">
                    {singleuserData.map((userBox) => (
                      <div
                        key={userBox.CANID}
                        onClick={() => {
                          setUserID(userBox._id); // Store the profile ID when clicked
                          changeColor(userBox.CANID);
                          setShowPinPopup(true);
                        }}
                        style={{
                          background:
                            personId === userBox.CANID ? "#c31a75" : "#FEE5EA",
                          color: personId === userBox.CANID ? "white" : "black",
                        }}
                        className=" lg:w-[8vw] lg:h-[8vw] w-[171px]  h-[130px] rounded-3xl mx-2 flex flex-col justify-center items-center cursor-pointer"
                      >
                        <h1 className="font-semibold mt-[10px] text-center text-lg">
                          {userBox.profile_name}
                        </h1>
                        <p className="text-sm">{userBox.user_profile}</p>
                        <img src={lock} />
                        <div className="absolute top-[28px] rounded-full overflow-hidden bg-white p-[3px] ">
                          <Avatar
                            alt=""
                            src={userBox.profile_image}
                            sx={{ width: 56, height: 56 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center lg:text-[1vw] px-[40px] text-[#C9C9C9] ">
                    You can add the new profile by clicking on the Add profile
                    button on profile page.
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      {showPinPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white max-h-[70%] lg:w-[30%] w-[340px] rounded-3xl">
            <div className="relative flex py-6 items-center flex-col">
              <div className="absolute top-3 right-4">
                <RxCross2 size={15} onClick={goToPin} />
              </div>
              <div className="text-xl">
                Enter {perData && perData.username} Pin
              </div>
              <div className="text-2xl py-6 flex flex-row items-center justify-center w-full">
                <p className="text-xs font-semibold flex justify-center w-[14%] pt-8 ">
                  PIN
                </p>
                <PinInput
                  length={4}
                  value={loginPin}
                  onChange={handlePinChange}
                  inputStyle={{
                    border: "none",
                    borderBottom: "1px solid black",
                    width: "30px",
                    textAlign: "center",
                    marginRight: "30px",
                  }}
                />
              </div>
              <div className="flex justify-end w-[80%] pt-4">
                {loginPin.length === 4 ? (
                  <div
                    className="bg-[#C31A7F] text-center px-6 py-2 cursor-pointer rounded-xl text-white"
                    onClick={mainPin}
                  >
                    {isverifying ? "Verifying..." : "Continue"}
                  </div>
                ) : (
                  <div className="bg-[#C31A7F] text-center px-6 py-2 cursor-pointer rounded-xl text-white opacity-50">
                    Continue
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
};

export default ShowProfile;

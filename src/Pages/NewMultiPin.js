import React, { useRef, useState } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";
import Video from "../Photos/Video.png";
import CarouselMain from "../Components/CarouselMain";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SelfCare from "../Photos/SelfCare.png";
import vibird1 from "../Photos/vibird1.gif";
import PinInput from "react-pin-input";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import logo2 from "../Photos/logo2.png";
// import { Cookies } from 'react-cookie'
import arrow22 from "../Photos/arrow22.png";
import Cookies from "js-cookie";
import Craousel from "../Components/Craousel";

const Newmultipin = () => {
  const [pin, setPin] = useState("");
  const [repin, setRepin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  // const cookie = new Cookies()
  const location = useLocation();
  console.log(location.state);

  const registerUserAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let profile = location.state;
      const userValue = JSON.parse(localStorage.getItem("userValue")) || {};
      userValue.profile_pin = pin;
      userValue.profile_pin = repin;
      localStorage.setItem("userValue", JSON.stringify(userValue));

      const formdata = new FormData();
      formdata.set("username", userValue.username);
      formdata.set("email", userValue.email);
      formdata.set("gender", userValue.gender);
      formdata.set("date_of_birth", userValue.date_of_birth);
      formdata.set("password", userValue.password);
      formdata.set("profile_category", userValue.categoryId);
      formdata.set("profile_pin", userValue.profile_pin);
      formdata.set("confirmPassword", userValue.confirmPassword);
      formdata.set("profile_photo", profile);

      const { data } = await axios.post(
        `${baseurl}/api/userAccountregister`,
        formdata
      );
      console.log(data);

      if (data.status === true) {
        console.log("Successfully Registered");
        console.log("User account registered successfully!");
        Cookies.set("token", data.token, { expires: 7 });
        setLoading(false);
        navigate("/newaddedprofile", {
          state: data.data._id,
        });
      }
      if (data.status === false) {
        console.log("Failed to register user account.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      // Handle error as required
    }
  };

  const handlePinChange = (value) => {
    setPin(value);
    console.log("Pin value:", value);
  };

  const handleRepinChange = (value) => {
    setRepin(value);
    console.log("Repin value:", value);

    if (pin === value) {
      setError("Pins are equal");
    } else {
      setError("Pins do not match, Please re-enter the pin correctly!");
    }
  };

  return (
    <>
      <div className="grid flex justify-start center-1">
        <NavLink to={"/"}>
          <div className="flex px-10 w-[100%]">
            <img src={logo2} alt="" />
          </div>
        </NavLink>
      </div>
      <div>
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          {/* <div className="hidden md:block lg:block w-[50%]   flex flex-col items-center justify-center   ">
            <div className="flex flex-col items-center justify-center gap-4 ">
              <div className="">
                <img src={SelfCare} alt="none" className="w-[20vw]" />
              </div>

              <div className="mt-2 flex flex-col items-center justify-center gap-1 ">
                <h1 className="text-center lg:text-[2.23vw] text-[32px]  font-semibold">
                  A companion to your relaxation.
                </h1>
                <p className="text-center lg:text-[1.12vw] text-[18px] font-medium ">
                  Listen to our evergreen radio, do guided meditations, and
                </p>
                <p className="text-center lg:text-[1.12vw] text-[18px] font-medium ">
                  record your memories to relax and unwind.
                </p>
              </div>

              <div className="flex flex-row items-center gap-4 mt-3">
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[0.78vw] w-[0.78vw] rounded-full bg-[#C31A7F]"></div>
              </div>
            </div>
          </div> */}
          <Craousel />

          <div className=" md:w-1/2 lg:w-[35%] px-5">
            <form
              onSubmit={registerUserAccount}
              className="bg-white shadow-md rounded  rounded-2xl  mb-4"
            >
              <NavLink to={"/Registerimage"}>
                <div className="px-4 py-2 cursor-pointer">
                  <img src={arrow22} alt="" />
                </div>
              </NavLink>
              <div>
                <img src={vibird1} className="w-[100%]" alt="Video" />
              </div>

              <div className="text-center lg:text-[30px] lg:text-[1.60vw] text-[24px]  font-semibold p-1  text-[#C31A7F]">
                <h1 className="lg:text-[1.60vw]">Create a PIN</h1>
              </div>
              <div className="mt-2 flex flex-col items-center justify-center ">
                <p className="lg:text-[1.20vw] text-[14px] font-medium text-center ">
                  Its your space, so add a profile lock to keep your account
                  information with you
                </p>
              </div>
              <div className="grid grid-cols-1 pin-code">
                <div className="flex ">
                  <label className=" lg:text-[1.1vw] text-[14px] align-bottom px-1  flex items-end justify-center ">
                    {" "}
                    PIN&nbsp; &nbsp; &nbsp; &nbsp;
                  </label>
                  <PinInput
                    length={4}
                    id="pin"
                    value={pin}
                    onComplete={handlePinChange}
                    inputStyle={{
                      border: "none",
                      borderBottom: "1px solid black",
                      textAlign: "center",
                      marginRight: "30px",
                      width: "18px",
                    }}
                  ></PinInput>
                </div>

                <div className="flex  ">
                  <label className=" lg:text-[1.1vw] text-[14px] align-bottom px-1 flex items-end justify-center ">
                    Re Enter
                  </label>
                  <PinInput
                    length={4}
                    id="repin"
                    value={repin}
                    onComplete={handleRepinChange}
                    inputStyle={{
                      border: "none",
                      borderBottom: "1px solid black",
                      textAlign: "center",
                      marginRight: "30px",
                      width: "18px",
                    }}
                  ></PinInput>
                </div>
              </div>

              {error && <p className="text-green-500 text-center">{error}</p>}

              <div className="flex flex-col justify-center  ">
                <button
                  type="submit"
                  className={`w-[40%] p-3 rounded-lg bg-  bg-[#C31A7F] lg:text-[1vw] text-[18px] font-bold rounded-[20px]  text-white items-center mx-auto ${
                    error && error === "Pins are equal"
                      ? "  bg-[#C31A7F]"
                      : "pointer-events-none"
                  }`}
                  disabled={error && error !== "Pins are equal"}
                >
                  {loading ? (
                    <h1 className="lg:text-[1vw] text-[18px]">Loading...</h1>
                  ) : (
                    <h1 className="lg:text-[1vw] text-[18px]">Continue</h1>
                  )}
                </button>
              </div>
              <div className="flex justify-center py-10 gap-3"></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newmultipin;

import React, { useState } from "react";
import HomeNav from "../Components/HomeNav";
import { TiMediaRecord } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import account from "../Photos/account.jpg";
import { IoMdClose } from "react-icons/io";
import SideMenu from "../Components/SideMenu";
import Page from "../Layouts/Pages";
import TabPanel from "./TabPanel";
import { NavLink } from "react-router-dom";
import MeetingDetails from "./MeetingDetails";
function MeetingProfile({ value }) {
  const [selectedOption, setSelectedOption] = useState("Today");

  const handleItemClick = (item) => {
    setSelectedOption(item);
  };

  const meetingDesc = "this is the meeting desc";

  //Enrolled

  const [enrolled, setEnrolled] = useState();
  function enroll() {
    setEnrolled(!enrolled);
  }

  //Join meeting section
  const [join, setJoin] = useState(false);

  const joinMeeting = () => {
    setJoin(!join);
  };

  const User = "Sierra";

  const [joinWith, setJoinWith] = useState(true);

  const joinWithName = () => {
    setJoinWith(!joinWith);
  };

  const [EnterName, setEnterName] = useState("");

  function HandleEnterName(e) {
    setEnterName(e.target.value);
  }

  return (
    <>
      <TabPanel value={value} index={1}>
        <div
          className=" lg:p-0 p-4 mt-10 shrink-0 w-[100%]  bg-[#C31A7F]  bg-white rounded-[30px] border-[1px]"
          style={{
            // boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
            background: "none",
            border: "none",
          }}
        >
          <div
            className="flex bg-white p-2 gap-4 rounded-2xl shadow-lg"
            style={{
              display: "flex",
              width: "45%",
              justifyContent: "space-around",
            }}
          >
            <h2
              className={`px-2 ${
                selectedOption === "Upcoming"
                  ? "font-bold text-black  transition duration-300"
                  : "text-[#C4C4C4] cursor-pointer"
              }`}
              onClick={() => handleItemClick("Upcoming")}
            >
              Upcoming
            </h2>
            <h2
              className={`px-2 ${
                selectedOption === "History"
                  ? "font-bold text-black  transition duration-300"
                  : "text-[#C4C4C4] cursor-pointer"
              }`}
              onClick={() => handleItemClick("History")}
            >
              History
            </h2>
            <h2
              className={`px-2 ${
                selectedOption === "Saved"
                  ? "font-bold text-black  transition duration-300"
                  : "text-[#C4C4C4] cursor-pointer"
              }`}
              onClick={() => handleItemClick("Saved")}
            >
              Saved
            </h2>
          </div>
          {/* background */}
          <div className="bg-[#FEF8FD] h-full mt-10">
            {/* Join meeting sections */}
            {selectedOption === "Upcoming" && (
              <>
                <MeetingDetails />
              </>
            )}

            {/* meeting page */}
            {selectedOption === "History" && <MeetingDetails />}

            {/* History */}
            {selectedOption === "Saved" && (
              <div className="">
                <div >
                  <div className="bg-white shadow-xl mt-8 flex justify-between px-10 rounded-2xl py-2">
                    <div className="flex flex-col items-center justify-center w-[12%]">
                      <p className="text-xs">23 Dec</p>
                      <p className="font-semibold text-[#CF4899] text-[14px]">
                        11:00 - 12:15PM
                      </p>
                    </div>

                    <div className="flex items-center   w-[20%]">
                      <div className="w-[12%] rounded-full overflow-hidden shadow-md">
                        <img src={account} alt="none" />
                      </div>
                      <div className="mx-2  ">
                        <h2 className="font-semibold">Sierra Ferguson</h2>
                        <p className="text-xs mb-1">Cancer Fighter</p>
                        <div className="flex justify-between text-xs text-[#CF4899] font-semibold">
                          <h3 class="text-sm/[13px]">Team CAN</h3>
                          <h3 class="text-sm/[13px]">Virtual</h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-max ">
                      <h2 className=" w-full h-max ">
                        <p className="font-semibold ">Meeting description :-</p>{" "}
                        {meetingDesc}
                      </h2>
                    </div>

                    <div className="flex items-center">Active accounts</div>

                    <div className="flex flex-col justify-center items-center">
                      <p className="text-[#CF4899] bg-[#efc41944] font-semibold px-4 rounded-2xl">
                        Recorded
                      </p>
                      <p className="text-sm text-[#C4C4C4]    ">
                        Duration :- 50 min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </TabPanel>{" "}
    </>
  );
}

export default MeetingProfile;

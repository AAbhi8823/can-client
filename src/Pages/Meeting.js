import React, { useState } from "react";
import HomeNav from "../Components/HomeNav";
import { TiMediaRecord } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import account from "../Photos/account.jpg";
import { IoMdClose } from "react-icons/io";
// import SideMenu from "../Components/SideMenu";
import Page from "../Layouts/Pages";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";


const Meeting = () => {
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

  const [EnterName, setEnterName] = useState('')

  function HandleEnterName(e) {
    setEnterName(e.target.value)
  }

  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/LoginForm");
    }
  }, []);

  return (
    <Page pageContent={

      <>

        <div className="bg-[#FEF8FD] h-full">
          {/* top bar */}
          <div className="pl-[10%] pr-[6%] flex justify-between pt-8">
            <div className=" cursor-pointer ">
              {selectedOption === "Today" && (
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TiMediaRecord color="red" />
                  Live Meeting
                </h2>
              )}

              {selectedOption === "Meeting" && (
                <h2 className="text-xl font-semibold cursor-pointer">Meeting</h2>
              )}

              {selectedOption !== "Today" && selectedOption !== "Meeting" && (
                <h2 className="text-xl font-semibold cursor-pointer">History</h2>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex items-center bg-white gap-2 p-2 rounded-2xl shadow-lg px-4">
                <FiSearch />
                <input placeholder="search" className="outline-none" />
              </div>
              <div className="flex bg-white p-2 gap-4 rounded-2xl shadow-lg">
                <h2
                  className={`px-2 ${selectedOption === "Today"
                      ? "font-bold text-black  transition duration-300"
                      : "text-[#C4C4C4] cursor-pointer"
                    }`}
                  onClick={() => handleItemClick("Today")}
                >
                  Today
                </h2>
                <h2
                  className={`px-2 ${selectedOption === "Meeting"
                      ? "font-bold text-black  transition duration-300"
                      : "text-[#C4C4C4] cursor-pointer"
                    }`}
                  onClick={() => handleItemClick("Meeting")}
                >
                  Meeting
                </h2>
                <h2
                  className={`px-2 ${selectedOption === "History"
                      ? "font-bold text-black  transition duration-300"
                      : "text-[#C4C4C4] cursor-pointer"
                    }`}
                  onClick={() => handleItemClick("History")}
                >
                  History
                </h2>
              </div>
            </div>
          </div>

          {/* Join meeting sections */}
          {selectedOption === "Today" && (
            <>
              <div className="pl-[10%] pr-[6%]  ">
                <div className="bg-white shadow-xl mt-8 flex flex-wrap justify-between px-10 rounded-2xl py-2">
                  <div className="flex items-center font-semibold text-[#CF4899]   w-[20%] ">
                    11:00 - 12:15PM
                  </div>

                  <div className="flex items-center    w-[20%] ">
                    <div className="w-[12%] rounded-full overflow-hidden shadow-md">
                      <img src={account} alt="none" />
                    </div>
                    <div className="mx-2  ">
                      <h2 className="font-semibold">Sierra Ferguson</h2>
                      <p className="text-xs">Cancer Fighter</p>
                      <div className="flex justify-between text-xs text-[#CF4899] font-semibold">
                        <h3>Team CAN</h3>
                        <h3>Virtual</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-max  w-[20%] ">
                    <h2 className=" w-full h-max ">
                      <p className="font-semibold ">Meeting description :-</p>{" "}
                      {meetingDesc}
                    </h2>
                  </div>

                  <div className="flex items-center justify-center w-[20%] ">Active accounts</div>

                  <div className="flex items-center justify-center w-[20%] ">
                    <h2
                      className="bg-[#C31A7F] text-white px-8 py-1 rounded-xl"
                      onClick={joinMeeting}
                    >
                      Join
                    </h2>
                  </div>

                  {join && (
                    <div
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                      style={{ backdropFilter: "blur(1px)" }}
                    >
                      {joinWith && (
                        <div className="w-[35%] h-[40%] bg-white rounded-2xl">
                          <div className="flex items-center justify-center pt-6">
                            <h1 className="font-semibold text-lg">
                              Join {User}'s meeting
                            </h1>
                            <div className="absolute right-[35%]">
                              <div onClick={joinMeeting}>
                                <IoMdClose />
                              </div>
                            </div>
                          </div>

                          <div className=" h-full flex justify-center pt-6 mx-5">
                            <div
                              className="w-[45%] h-[60%] bg-[#efc41965] rounded-2xl m-3 flex items-center justify-center flex-wrap text-lg"
                              onClick={joinWithName}
                            >
                              Join with name
                            </div>
                            <div className="w-[45%] h-[60%] bg-[#ed839a65] rounded-2xl m-3 flex items-center justify-center flex-wrap text-lg">
                              Join Anonymously
                            </div>
                          </div>
                        </div>
                      )}

                      {!joinWith && (
                        <div className="w-[35%] h-[40%] bg-white rounded-2xl">
                          <div className="flex items-center justify-center pt-6">
                            <h1 className="font-semibold text-lg">
                              Enter your name
                            </h1>

                            <div className="absolute right-[35%]">
                              <div onClick={joinMeeting}>
                                <IoMdClose />
                              </div>
                            </div>
                          </div>

                          <div className=" h-full flex flex-col items-center mt-[8%] gap-8 ">
                            <div className="border-2 w-[80%] rounded-2xl border-gray-300 p-2">
                              <input
                                placeholder="Enter your name"
                                className="outline-none p-[2%]"
                                value={EnterName}
                                onChange={HandleEnterName}
                              />
                            </div>

                            {EnterName ? (
                              <div className="w-[80%] rounded-2xl p-[3%] text-center bg-[#efc41965] font-semibold cursor-pointer">
                                <NavLink to='/MeetingActive'>
                                  Join now
                                </NavLink>
                              </div>

                            ) : (
                              <div className="w-[80%] rounded-2xl p-[3%] text-center bg-[#efc41965] opacity-40 cursor-pointer font-semibold">

                                Join now

                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-full flex justify-end">
                  <h1 className="text-right px-4 mr-10 bg-[#efc41949]  text-[#C31A7F] rounded-xl w-max mt-3">
                    View all
                  </h1>
                </div>
              </div>

              {/* upcoming meeting */}
              <div className="pl-[10%] pr-[6%] ">
                <h1 className="text-xl font-semibold pt-10">
                  Upcoming meeting
                </h1>
                <div className="bg-white shadow-xl mt-8 flex justify-between px-10 rounded-2xl py-2">
                  <div className="flex flex-col items-center w-[10%]">
                    <p className="text-xs">23 Dec</p>
                    <p className="text-sm">Start's On</p>
                    <p className="font-semibold text-[#CF4899] text-sm">
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
                        <h3>Team CAN</h3>
                        <h3>Virtual</h3>
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

                  <div className="flex items-center">
                    <h2 className="bg-[#CF4899] text-white px-8 py-1 rounded-xl">
                      Enrolled
                    </h2>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* meeting page */}
          {selectedOption === "Meeting" && (
            <div className="">
              <div className="pl-[10%] pr-[6%] ">
                <div className="bg-white shadow-xl mt-8 flex justify-between px-10 rounded-2xl py-2">
                  <div className="flex flex-col items-center justify-center w-[10%]">
                    <p className="text-xs">23 Dec</p>
                    <p className="font-semibold text-[#CF4899] text-[14px] mt-1">
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
                        <h3>Team CAN</h3>
                        <h3>Virtual</h3>
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

                  <div className="flex items-center">
                    {enrolled && (
                      <h2
                        className="bg-[#CF4899] text-white px-8 py-1 rounded-xl cursor-pointer"
                        onClick={enroll}
                      >
                        Enroll
                      </h2>
                    )}
                    {!enrolled && (
                      <div className="  py-1 flex items-center gap-2 ">
                        <div className="text-[#CF4899] font-semibold text-sm">
                          Enrolled
                        </div>
                        <div
                          onClick={enroll}
                          className="bg-[#CF4899] text-white rounded-xl p-2 text-sm cursor-pointer"
                        >
                          Opt Out
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {selectedOption === "History" && (
            <div className="">
              <div className="pl-[10%] pr-[6%] ">
                <div className="bg-white shadow-xl mt-8 flex justify-between px-10 rounded-2xl py-2">
                  <div className="flex flex-col items-center justify-center w-[10%]">
                    <p className="text-xs">23 Dec</p>
                    <p className="font-semibold text-[#CF4899]">
                      11:00 - 12:15PM
                    </p>
                  </div>

                  <div className="flex items-center   w-[20%]">
                    <div className="w-[12%] rounded-full overflow-hidden shadow-md">
                      <img src={account} alt="none" />
                    </div>
                    <div className="mx-2  ">
                      <h2 className="font-semibold">Sierra Ferguson</h2>
                      <p className="text-xs">Cancer Fighter</p>
                      <div className="flex justify-between text-xs text-[#CF4899] font-semibold">
                        <h3>Team CAN</h3>
                        <h3>Virtual</h3>
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

      </>
    } />
  );
};

export default Meeting;

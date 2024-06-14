import React, { useState, useEffect } from "react";
import { TiMediaRecord } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import account from "../Photos/account.jpg";
import { IoMdClose } from "react-icons/io";
import Page from "../Layouts/Pages";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import "./Meeting.css";


const Meeting = () => {
  const [selectedOption, setSelectedOption] = useState("today");
  const [meetings, setMeetings] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [join, setJoin] = useState(false);
  const [joinWith, setJoinWith] = useState(true);
  const [enterName, setEnterName] = useState("");
  const [currentZoomLink, setCurrentZoomLink] = useState("");

  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedOption(item);
  };

  const enroll = () => {
    setEnrolled(!enrolled);
  };

  const joinMeeting = (zoomLink) => {
    setJoin(!join);
    if (zoomLink) {
      setCurrentZoomLink(zoomLink);
    }
  };

  const joinWithName = () => {
    setJoinWith(!joinWith);
  };

  const handleEnterName = (e) => {
    setEnterName(e.target.value);
  };

  useEffect(() => {
    if (!token) {
      navigate("/LoginForm");
    } else {
      getMeeting();
    }
  }, [selectedOption]);

  const getMeeting = async () => {
    try {
      const response = await axios.get(`${baseurl}/meeting/get-meeting-by-filter/${selectedOption}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response:::", response);
      setMeetings(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinNow = () => {
    window.location.href = currentZoomLink;
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderActionButtons = (meeting) => {
    if (selectedOption === "today") {
      return (
        <h2 className="bg-[#C31A7F] text-white px-8 py-1 rounded-xl cursor-pointer" onClick={() => joinMeeting(meeting?.join_url)}>
          Join
        </h2>
      );
    } else if (selectedOption === "upcoming") {
      return (
        <h2 className="bg-[#4CAF50] text-white px-8 py-1 rounded-xl cursor-pointer" onClick={() => enroll()}>
          Register
        </h2>
      );
    } else {
      return (
        <h2 className="bg-gray-400 text-white px-8 py-1 rounded-xl cursor-not-allowed opacity-50">
          Ended
        </h2>
      );
    }
  };

  return (
    <Page
      pageContent={
        <div className="bg-[#FEF8FD] h-full">
          {/* top bar */}
          <div className="pl-[20px] pr-[20px] lg:pl-[10%] lg:pr-[6%] flex justify-between pt-8 flex-col md:flex-row">
            <div className="cursor-pointer mb-3 md:mb-0">
              {selectedOption === "today" && (
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TiMediaRecord color="red" />
                  Live Meeting
                </h2>
              )}
              {selectedOption === "upcoming" && (
                <h2 className="text-xl font-semibold cursor-pointer">
                  Upcoming
                </h2>
              )}
              {selectedOption === "history" && (
                <h2 className="text-xl font-semibold cursor-pointer">History</h2>
              )}
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex items-center bg-white gap-2 p-2 rounded-2xl shadow-lg px-4">
                <FiSearch />
                <input placeholder="search" className="outline-none" />
              </div>
              <div className="flex bg-white p-2 gap-4 rounded-2xl shadow-lg">
                <h2
                  className={`px-2 ${
                    selectedOption === "Today"
                      ? "font-bold text-black transition duration-300"
                      : "text-[#C4C4C4] cursor-pointer"
                  }`}
                  onClick={() => handleItemClick("today")}
                >
                  Today
                </h2>
                <h2
                  className={`px-2 ${
                    selectedOption === "upcoming"
                      ? "font-bold text-black transition duration-300"
                      : "text-[#C4C4C4] cursor-pointer"
                  }`}
                  onClick={() => handleItemClick("upcoming")}
                >
                  Upcoming
                </h2>
                <h2
                  className={`px-2 ${
                    selectedOption === "history"
                      ? "font-bold text-black transition duration-300"
                      : "text-[#C4C4C4] cursor-pointer"
                  }`}
                  onClick={() => handleItemClick("history")}
                >
                  History
                </h2>
              </div>
            </div>
          </div>

          {/* Meetings Section */}
          <div className="pl-[20px] pr-[20px] lg:pl-[10%] lg:pr-[6%]">
            {meetings.map((meeting, index) => (
              <div key={index} id="meet-box" className="meet-box bg-white shadow-xl mt-8 flex overflow-auto justify-between px-5 rounded-2xl py-2">
                <div className="flex items-center font-semibold text-[#CF4899] w-[max-content] pr-2">
                  {formatDate(meeting?.start_time)}
                </div>
                <div className="flex items-center w-[max-content] pr-2">
                  <div className="rounded-full overflow-hidden shadow-md">
                    <img className="w-[60px]" src={account} alt="none" />
                  </div>
                  <div className="mx-2">
                    <h2 className="font-semibold">{meeting.organizer}</h2>
                    <p className="text-xs">{meeting.role}</p>
                    <div className="flex justify-between text-xs text-[#CF4899] font-semibold">
                      <h3>{meeting.team}</h3>
                      <h3>{meeting.type}</h3>
                    </div>
                  </div>
                </div>
                <div className="flex w-max w-[max-content] pr-2">
                  <h2 className="w-full h-max">
                    <p className="font-semibold">Meeting description :-</p> {meeting?.topic}
                  </h2>
                </div>
                <div className="flex items-center justify-center w-[max-content] pr-2">
                  Active accounts
                </div>
                <div className="flex items-center justify-center w-[max-content] pr-2">
                  {renderActionButtons(meeting)}
                </div>
              </div>
            ))}
          </div>

          {join && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ backdropFilter: "blur(1px)" }}>
              {joinWith && (
                <div className="w-[35%] h-[40%] bg-white rounded-2xl">
                  <div className="flex items-center justify-center pt-6">
                    <h1 className="font-semibold text-lg">Join Meeting</h1>
                    <div className="absolute right-[35%]">
                      <div onClick={() => joinMeeting()}>
                        <IoMdClose />
                      </div>
                    </div>
                  </div>
                  <div className="h-full flex justify-center pt-6 mx-5">
                    <div className="w-[45%] h-[60%] bg-[#efc41965] rounded-2xl m-3 flex items-center justify-center flex-wrap text-lg" onClick={joinWithName}>
                      Join with name
                    </div>
                    <div className="w-[45%] h-[60%] bg-[#ed839a65] rounded-2xl m-3 flex items-center justify-center flex-wrap text-lg" onClick={handleJoinNow}>
                      Join Anonymously
                    </div>
                  </div>
                </div>
              )}
              {!joinWith && (
                <div className="w-[35%] h-[40%] bg-white rounded-2xl">
                  <div className="flex items-center justify-center pt-6">
                  <h1 className="font-semibold text-lg">Enter your name</h1>
                    <div className="absolute right-[35%]">
                      <div onClick={() => joinMeeting()}>
                        <IoMdClose />
                      </div>
                    </div>
                  </div>
                  <div className="h-full flex flex-col items-center mt-[8%] gap-8">
                    <div className="border-2 w-[80%] h-12 rounded-xl">
                      <input className="w-full h-full pl-4" value={enterName} onChange={handleEnterName} placeholder="Type your name" />
                    </div>
                    {enterName && (
                      <div className="bg-[#C31A7F] text-white px-8 py-1 rounded-xl cursor-pointer" onClick={handleJoinNow}>
                        Join now
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      }
    />
  );
};

export default Meeting;


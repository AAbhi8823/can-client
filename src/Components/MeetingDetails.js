import React from "react";
import account from "../Photos/account.jpg";
import './MeetingDetails.css'
function MeetingDetails({ selectedOption, meetingDesc, enrolled, enroll }) {
  return (
    <div className="">
    <div className="">
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
  );
}

export default MeetingDetails;

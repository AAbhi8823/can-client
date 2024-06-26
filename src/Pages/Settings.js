import React, { useState } from "react";
import Page from "../Layouts/Pages";
import { AiOutlineBell } from "react-icons/ai";
import { BsPersonSlash } from "react-icons/bs";
import { VscKey } from "react-icons/vsc";
import SetPassword from "../Components/SetPassword";
import BlockedAccounts from "./BlockedAccounts";
import Notification from "./Notification";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("notification");

  const handleChangeTab = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <Page
      pageContent={
        <>
          <div className=" flex flex-col  h-full w-full">
            {/* background */}
            <div className="px-20 py-6">
              <h1 className="font-[600] lg:md:text-[30px] text-[18px]">
                Settings/ Change your Pin
              </h1>
            </div>
            <div className="flex lg:md:flex-row flex-col items-start justify-center h-calc(100% -[50px]) w-full lg:md:mx-0 px-2 gap-10">
              <div className=" flex-col flex w-[100%]">
                <div className="flex flex-col w-[100%] flex-wrap">
                  <div
                    className="flex flex-col bg-white rounded-[25px] border-[0.5px] border-[#dfdede] cursor-pointer"
                    style={{
                      boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div
                      className={`flex flex-row gap-3 pb-4 pt-6 px-8 rounded-t-[25px] ${
                        selectedTab === "notification" ? "bg-[#C31A7F]/25" : ""
                      }`}
                      onClick={() => handleChangeTab("notification")}
                    >
                      <div className="flex pt-[4px]">
                        <AiOutlineBell size={20} className="  text-[#C31A7F]" />
                      </div>
                      <div className=" flex flex-col">
                        <h3 className=" text-[18px]">Notification</h3>
                        <p className="text-[14px] text-[#7E7E7E] ">
                          Select the kinds of notifications you get about your
                          activities, interests, and recommendations.
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div
                      className={`flex flex-row gap-3 py-4 px-8 ${
                        selectedTab === "blockedAccounts"
                          ? "bg-[#C31A7F]/25"
                          : ""
                      }`}
                      onClick={() => handleChangeTab("blockedAccounts")}
                    >
                      <div className="flex pt-[4px]">
                        <BsPersonSlash size={20} className="  text-[#C31A7F]" />
                      </div>
                      <div className=" flex flex-col">
                        <h3 className="font-semibold text-[18px]">
                          Blocked Accounts
                        </h3>
                        <p className="text-[14px] text-[#7E7E7E]">
                          Manage the accounts, words, and notifications that
                          you’ve blocked.
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div
                      className={`flex flex-row gap-3 py-4 px-8 ${
                        selectedTab === "changePassword"
                          ? "bg-[#C31A7F]/25"
                          : ""
                      }`}
                      onClick={() => handleChangeTab("changePassword")}
                    >
                      <div className="flex pt-[4px]">
                        <VscKey size={20} className="  text-[#C31A7F]" />
                      </div>
                      <div className=" flex flex-col">
                        <h3 className="font-semibold text-[18px]">
                          Change Your Password
                        </h3>
                        <p className="text-[14px] text-[#7E7E7E]">
                          Change your password at any time.
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="flex-col justify-center  items-start flex lg:md:w-[60%] w-full">
                {selectedTab === "changePassword" && <SetPassword />}
                {selectedTab === "blockedAccounts" && <BlockedAccounts />}
                {selectedTab === "notification" && <Notification />}
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Settings;

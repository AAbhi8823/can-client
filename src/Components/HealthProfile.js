import React, { useRef, useState, useEffect } from "react";
import account from "../Photos/account.jpg";
import Icon from "../Photos/Icon.png";
import TabPanel from "./TabPanel";
import flight from "../Photos/MoreIcons/flight.png";
import share from "../Photos/MoreIcons/share.png";
import { BsDownload } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";

function HealthProfile({ value }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blood_group = queryParams.get("blood_group");
  const height = queryParams.get("height");
  const weight = queryParams.get("weight");
  const name = queryParams.get("name");
  const dob = queryParams.get("dob");
  const gender = queryParams.get("gender");
  const cancer_type = queryParams.get("cancer_type");
  const cancer_stage = queryParams.get("cancer_stage");
  const current_treatment = queryParams.get("current_treatment");
  const last_treatment = queryParams.get("last_treatment");
  const presiding_doctor = queryParams.get("presiding_doctor");

  const hospital_details_primary = queryParams.get("hospital_details_primary");
  const hospital_details = queryParams.get("hospital_details");
  const emergencyContacts = [];
  for (const key of queryParams.keys()) {
    if (key.startsWith("emergency_name_")) {
      const index = key.substring("emergency_name_".length);
      const name = queryParams.get(`emergency_name_${index}`);
      const phone = queryParams.get(`emergency_phone_${index}`);
      emergencyContacts.push({ name, phone });
    }
  }

  return (
    <>
      <TabPanel value={value} index={3}>
        <div
          className=" lg:p-7 p-4 mt-10 shrink-0 w-[100%]  bg-[#C31A7F]  bg-white rounded-[30px] border-[1px]"
          style={{
            boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="bg-white flex flex-col  rounded-[30px]  gap-6  relative   ">
            <div className="w-fit left-0 top-0 absolute ml-0 flex flex-nowrap gap-4 p-4 flex-row  bg-[#EFC31933] ">
              <p>Fit to Fly</p>
              <img src={flight} alt="flight" />
            </div>

            <div className="flex flex-row w-full p-2 justify-end">
              <div className="flex lg:gap-4  gap-2">
                <div className="bg-[#c31a7f38]  p-2 rounded-[12px] cursor-pointer flex justify-center items-center w-9 shadow-md">
                  <img src={share} />
                </div>
                <div className="bg-[#c31a7f38]   text-[#C31A7F] px-3 py-2 rounded-[12px] cursor-pointer flex justify-center shadow-md w-9 items-center">
                  <BsDownload className="flex flex-grow" />
                </div>
                <div className="bg-[#c31a7f38]    text-[#C31A7F] px-3 py-2 bold rounded-[12px] cursor-pointer flex justify-center shadow-md  w-9 items-center">
                  <MdOutlineModeEditOutline className="flex flex-grow" />
                </div>
              </div>
            </div>

            <div className=" lg:flex-row flex-col flex lg:gap-10 lg:px-10 px-2 gap-2 lg:justify-center">
              <div className="flex flex-col bg-transparent gap-10 w-full lg:w-1/3 lg:h-full px-3">
                <div className=" border-[#C4C4C4] flex border-[1px] bg-[#FCF5FA] rounded-[20px] flex-col w-full">
                  <div className="flex flex-nowrap relative flex-row py-4 px-14 items-center justify-center">
                    <div className="absolute flex top-1 left-0 ">
                      <img src={Icon} />
                    </div>
                    <div className="flex  rounded-full overflow-hidden justify-center items-center">
                      <img src={account} width={100} />
                    </div>
                  </div>
                  <div className="flex justify-center text-center ">
                    <p className="font-[600] text-[18px]">{name}</p>
                  </div>
                  <div className="flex flex-row gap-4 py-4 px-14 items-center justify-center">
                    <div className="flex flex-col text-[12px] font-500">
                      <p className="text-[12px] font-[500]">Fighter</p>
                    </div>
                    <div className="color-[#C4C4C4] w-1 flex"> |</div>
                    <div className="flex flex-col flex-nowrap">
                      <p className="text-[14px] font-[500]">42 years</p>
                    </div>
                  </div>
                </div>
                <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] flex-row  py-6 justify-evenly w-full ">
                  <div className="flex flex-col border-r-2 border-[#C4C4C4]">
                    <h2 className="lg:text-[12px] text-[14px]   px-2  text-[#C31A7F]">
                      Weight
                    </h2>
                    <p>{weight}</p>
                  </div>
                  <div className="flex flex-col border-r-2 border-[#C4C4C4]">
                    <h2 className="lg:text-[12px] text-[14px]  px-2  text-[#C31A7F]">
                      Height
                    </h2>
                    <p>{height} </p>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="lg:text-[12px] text-[14px] px-2   text-[#C31A7F]">
                      Blood
                    </h2>
                    <p>{blood_group}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-transparent gap-10  w-full lg:w-1/3 px-3">
                <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] gap-4 flex-col items-start py-6 px-4 justify-evenly w-full h-full">
                  <div className="flex flex-row justify-around items-start w-full ">
                    <div className="flex flex-col items-start px-3 border-r-2 border-[#C4C4C4]">
                      <h2 className="lg:text-[12px] text-[14px]    text-[#C31A7F]">
                        Cancer
                      </h2>
                      <p>{cancer_type}</p>
                    </div>
                    <div className="flex flex-col px-2">
                      <h2 className="lg:text-[12px] text-[14px]    text-[#C31A7F]">
                        Stage
                      </h2>
                      <p>{cancer_stage}</p>
                    </div>
                  </div>
                  <hr className="w-full border-[#C4C4C4] my-2" />
                  <div className="flex flex-row gap-4 justify-evenly w-full ">
                    <div className="flex flex-col   border-r-2 border-[#C4C4C4]">
                      <h2 className="lg:text-[12px] text-[14px] flex  px-2  text-[#C31A7F] ">
                        Current Treatment
                      </h2>
                      <p>{current_treatment}</p>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="lg:text-[12px] text-[14px]    text-[#C31A7F]">
                        Last Treatment
                      </h2>
                      <p>{last_treatment}</p>
                    </div>
                  </div>
                </div>
                <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] flex-col py-6 px-4 justify-evenly w-full ">
                  <h2 className="lg:text-[12px] text-[14px]    text-[#C31A7F] ">
                    Emergency Contact
                  </h2>
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex flex-row justify-between">
                      <p>{contact.name}</p>
                      <p>{contact.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex px-3 lg:px-0 lg:w-1/3">
                <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] lg:h-fit  gap-4 flex-col items-start py-6 px-4 justify-evenly w-full ">
                  <div className="flex flex-row justify-evenly items-start w-full  ">
                    <div className="flex flex-col items-start px-4 border-r-2 border-[#C4C4C4]">
                      <h2 className="lg:text-[12px] text-[14px]   text-[#C31A7F] ">
                        Presiding Doctor
                      </h2>
                      <p>{presiding_doctor}</p>
                    </div>
                    <div className="flex flex-col px-2">
                      <h2 className="lg:text-[12px] text-[14px]    text-[#C31A7F]">
                        Hospital Details (primary)
                      </h2>
                      <p>{hospital_details_primary}</p>
                    </div>
                  </div>
                  <hr className="w-full border-[#C4C4C4] my-4" />
                  <div className="flex flex-col justify-center items-center w-full ">
                    <h2 className="lg:text-[12px] text-[14px]   text-[#C31A7F] ">
                      Hospital Details
                    </h2>
                    <p>{hospital_details}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row px-10">
              <h1 className=" lg:text-[22px] text-[20px]   text-[#C31A7F]">
                Certificates
              </h1>
            </div>
            <div className="flex lg:flex-row flex-col w-full gap-10 px-10">
              <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] flex-row  py-6 px-4 justify-evenly lg:w-1/2 w-full">
                <h2 className="lg:text-[16px] text-[14px]    text-[#C31A7F]">
                  Aadhar Card
                </h2>
                <p className="text-[#7E7E7E]">123</p>
                <p className="text-[#7E7E7E]">123</p>
                <p className="text-[#7E7E7E]">123</p>
              </div>
              <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] flex-row py-6 px-4 justify-evenly lg:w-1/2 w-full">
                <h2 className="lg:text-[16px] text-[14px]   text-[#C31A7F]">
                  Fit to Fly
                </h2>
                <p className="text-[#7E7E7E]">123</p>
                <p className="text-[#7E7E7E]">123</p>
                <p className="text-[#7E7E7E]">123</p>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
    </>
  );
}
export default HealthProfile;

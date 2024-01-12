import Page from "../Layouts/Pages";
import React, { useRef, useState, useEffect } from "react";
import account from "../Photos/account.jpg";
import Icon from "../Photos/Icon.png";
import flight from "../Photos/MoreIcons/flight.png";
import share from "../Photos/MoreIcons/share.png";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import { FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";

const HealthCard2 = ({ healthCardData }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const dob = queryParams.get("dob");
  const gender = queryParams.get("gender");
  const blood_group = queryParams.get("blood_group");
  const height = queryParams.get("height");
  const weight = queryParams.get("weight");
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

  const [userHealthCard, setHealthCardData] = useState()
  const fetchHealthData = async () => {
    const token = Cookies.get("token");
    const id = localStorage.getItem("active_user");
    try {
      const response = await axios.get(
        `${baseurl}/api/healthcard?token=${token}&id=${id}`
      );
      if (response.data) {
        setHealthCardData(response.data.data); 
        console.log(response.data.data)
      } else {
        console.log("No data received from the API");
      }
    } catch (error) {
      console.log("Error fetching health data:", error);
    }
  };

  const DOB = new Date(userHealthCard?.date_of_birth);
  const currentData = new Date()

  const yearOfBirth = DOB.getFullYear();
  const currentYear = currentData.getFullYear();

  const age = currentYear - yearOfBirth;
  console.log("The person is " + age + " years old.");

  const generatePDF = () => {
    const pdf = new jsPDF();
    let y = 10;

    // Generate PDF content
    const keysToPrint = [
      "patientsname",
      "date_of_birth",
      "blood_group",
      "height",
      "weight",
      "cancer_type",
      "cancer_stage",
      "current_treatment",
      "last_treatment",
      "presiding_doctor",
      "hospital_details_primary",
      "hospital_details",
      "emergencyContacts",
    ]; // Replace with your desired keys

    // Generate PDF content for specific keys
    keysToPrint.forEach((key, index) => {
      if (Object.prototype.hasOwnProperty.call(userHealthCard, key)) {
        const value = userHealthCard[key];
        pdf.text(10, y + index * 10, `${key}: ${value}`);
      }
    });

    // Save the PDF with a specific name
    pdf.save("HealthCard.pdf");
  };

  useEffect(() => {
    fetchHealthData();
  }, []);


  return (
    <Page
      pageContent={
        <>
          <div className="bg-[#FEF8FD] lg:h-full h-fit flex flex-col gap-4 w-full px-3 lg:px-12 lg:py-4">
            <h1 className="text-[16px] font-semibold">HealthCard</h1>

            <div className="bg-white flex flex-col  rounded-[30px]  gap-6  relative   lg:overflow-hidden overflow-hidden py-4">
              <div className="w-fit left-0 top-0 absolute ml-0 flex flex-nowrap gap-4 p-4 flex-row  bg-[#EFC31933] ">
                <p>Fit to Fly</p>
                <img src={flight} alt="flight" />
              </div>

              <div className="flex flex-row w-full p-2 justify-end">
                <div className="flex lg:gap-4  gap-2">
                  <div className="bg-[#c31a7f38]  p-2 rounded-[12px] cursor-pointer flex justify-center items-center w-9 shadow-md">
                    <img src={share} alt="img" />
                  </div>
                  <div className="bg-[#c31a7f38]   text-[#C31A7F] px-3 py-2 rounded-[12px] cursor-pointer flex justify-center shadow-md w-9 items-center">
                    <BsDownload
                      className="flex flex-grow"
                      onClick={generatePDF}
                    />
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
                        <img
                          src={userHealthCard?.userid?.profile_photo}
                          width={100}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex justify-center text-center ">
                      <p className="font-[600] text-[18px]">
                        {userHealthCard?.patientsname}
                      </p>
                    </div>
                    <div className="flex flex-row gap-4 py-4 px-14 items-center justify-center">
                      <div className="flex flex-col text-[14px] font-500">
                        <p className="text-[14px] font-[500]">Fighter</p>
                      </div>
                      <div className="color-[#C4C4C4] w-1 flex"> |</div>
                      <div className="flex flex-col flex-nowrap">
                        <p className="text-[14px] font-[500]">{age} years</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] flex-row  py-6 justify-center w-full ">
                    <div className="flex flex-col w-1/3 items-center px-[12px] border-r-2 border-[#C4C4C4]">
                      <h2 className="lg:text-[16px] text-[14px]     text-[#C31A7F]">
                        Weight
                      </h2>
                      <p>{userHealthCard?.weight} KGs</p>
                    </div>
                    <div className="flex flex-col w-1/3 items-center px-[12px] border-r-2 border-[#C4C4C4]">
                      <h2 className="lg:text-[16px] text-[14px]    text-[#C31A7F]">
                        Height
                      </h2>
                      <p>{userHealthCard?.height} CMs</p>
                    </div>
                    <div className="flex flex-col w-1/3 items-center px-[12px]">
                      <h2 className="lg:text-[16px] text-[14px]    text-[#C31A7F]">
                        Blood
                      </h2>
                      <p>{userHealthCard?.blood_group}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-transparent gap-10 h-full w-full lg:w-1/3 px-3">
                  <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] gap-4 flex-col items-start py-6 px-4 justify-evenly w-full h-full">
                    <div className="flex flex-row justify-between items-start w-full ">
                      <div className="flex flex-col items-center w-1/2 px-3 border-r-2 border-[#C4C4C4]">
                        <h2 className="lg:text-[16px] text-[14px]    text-[#C31A7F]">
                          Cancer
                        </h2>
                        <p>{userHealthCard?.cancer_type}</p>
                      </div>
                      <div className="flex flex-col px-2 w-1/2 items-center">
                        <h2 className="lg:text-[16px] text-[14px]    text-[#C31A7F]">
                          Stage
                        </h2>
                        <p>{userHealthCard?.cancer_stage}</p>
                      </div>
                    </div>
                    <hr className="w-full border-[#C4C4C4] my-2" />
                    <div className="flex flex-row justify-between w-full ">
                      <div className="flex flex-col w-1/2  px-3  items-center border-r-2 border-[#C4C4C4]">
                        <h2 className="lg:text-[16px] text-[14px] flex    text-[#C31A7F] ">
                          Current Treatment
                        </h2>
                        <p>{userHealthCard?.current_treatment}</p>
                      </div>
                      <div className="flex flex-col w-1/2 items-center px-2">
                        <h2 className="lg:text-[16px] text-[14px]    text-[#C31A7F] ">
                          Last Treatment
                        </h2>
                        <p>{userHealthCard?.last_treatment}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] flex-col py-6 px-4 justify-evenly w-full ">
                    <h2 className="lg:text-[16px] text-[14px]    text-[#C31A7F] whitespace-nowrap">
                      Emergency Contact
                    </h2>
                    {emergencyContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-between"
                      >
                        <p>{contact.name}</p>
                        <p>{contact.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex px-3 lg:px-0 lg:w-1/3">
                  <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] lg:h-fit  gap-4 flex-col items-start py-6 px-4 justify-evenly w-full ">
                    <div className="flex flex-row justify-between w-full  ">
                      <div className="flex flex-col  items-center w-1/2 px-4 border-r-2 justify-center border-[#C4C4C4]">
                        <h2 className="lg:text-[16px] text-[14px]   text-[#C31A7F] ">
                          Presiding Doctor
                        </h2>
                        <p>{userHealthCard?.presiding_doctor}</p>
                      </div>
                      <div className="flex flex-col items-center text-center w-1/2 px-2">
                        <h2 className="lg:text-[16px] text-[14px]    text-[#C31A7F]">
                          Hospital Details (primary)
                        </h2>
                        <p>{userHealthCard?.hospital_details_primary}</p>
                      </div>
                    </div>
                    <hr className="w-full border-[#C4C4C4] my-4" />
                    <div className="flex flex-col justify-center items-center w-full ">
                      <h2 className="lg:text-[16px] text-[14px]   text-[#C31A7F] whitespace-nowrap">
                        Hospital Details
                      </h2>
                      <p>{userHealthCard?.hospital_details}</p>
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
                  <a
                    href={userHealthCard?.aadhaarCard}
                    className="flex items-center gap-2 cursor-pointer"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Aadhaar <FaFileDownload />
                  </a>
                </div>
                <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] flex-row py-6 px-4 justify-evenly lg:w-1/2 w-full">
                  <h2 className="lg:text-[16px] text-[14px]   text-[#C31A7F]">
                    Fit to Fly
                  </h2>
                  <a
                    href={userHealthCard?.fit_to_fly_Certificate}
                    className="flex items-center gap-2 cursor-pointer"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Fit to Fly <FaFileDownload />
                  </a>
                </div>
                <div className="border-[#C4C4C4] border-[1px] bg-[#FCF5FA] flex rounded-[20px] flex-row py-6 px-4 justify-evenly lg:w-1/2 w-full">
                  <h2 className="lg:text-[16px] text-[14px]   text-[#C31A7F]">
                    Biopsy Certificate
                  </h2>
                  <a
                    href={userHealthCard?.biopsy}
                    className="flex items-center gap-2 cursor-pointer"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Biopsy <FaFileDownload />
                  </a>
                </div>
              </div>

              <div className="flex justify-end px-10">
                <NavLink to={"/HealthRecord1"}>
                
                  
                    <h2 className="text-[#3F75F3]">All Medical records</h2>
                  
                </NavLink>
              </div>
            </div>
          </div>
        </>
      }
    ></Page>
  );
};

export default HealthCard2;

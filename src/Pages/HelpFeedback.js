import React, { useState } from "react";
import Page from "../Layouts/Pages";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import {
  FaRegSmile,
  FaRegFrown,
  FaRegMeh,
  FaRegLaughBeam,
} from "react-icons/fa";

const HelpFeedback = () => {
  const [showAns, setShowAns] = useState([]);
  const [rotateArrow, setRotateArrow] = useState([]);
  const handleShowAns = (index) => {
    setShowAns((prevShowAns) => {
      const updatedShowAns = [...prevShowAns];
      updatedShowAns[index] = !updatedShowAns[index];
      return updatedShowAns;
    });
  };

  const handleRotateArrow = (index) => {
    setRotateArrow((prevRotateArrow) => {
      const updatedRotateArrow = [...prevRotateArrow];
      updatedRotateArrow[index] = !updatedRotateArrow[index];
      return updatedRotateArrow;
    });
  };

  const [emojie, setEmojie] = useState(null);
  const handleEmojie = (text) => {
    setEmojie(text);
  };
  const questionsAndAnswers = [
    {
      question: "How to join a meeting?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus.",
    },
    // Add more question-answer pairs here as needed
    {
      question: "How to save posts in feeds?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus. Lorem ipsum dolor sit amet,",
    },
    {
      question: "How to add my Medicine or Appointment for Reminder?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus",
    },
    {
      question: "How to add my all health records?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada lectus eu tristique finibus.",
    },
  ];
  return (
    <Page
      pageContent={
        <>
          {/* screen  */}
          <div className="flex flex-col bg-[#FEF8FD] min-h-full lg:md:px-20 px-3 py-1">
            {/* 2 column divide  */}
            {/* Help/Feedback */}

            {/* title */}
            <div className="flex py-5">
              <div>
                
                <h1 className="text-[40px] font-[500] text-[#212B27]">
                  Help/ Feedback
                </h1>
              </div>
            </div>
            {/* questions block */}
            <div className="flex lg:md:flex-row flex-col gap-4">
              <div className="flex flex-col lg:md:w-3/4 w-full gap-3">
                {/* mapping question and answer blocks */}
                {questionsAndAnswers.map((qa, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:px-10 px-2 py-6 bg-white rounded-[20px] border-[0.5px] border-[#e6e5e5]"
                    style={{
                      boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div className="flex flex-row justify-between py-4">
                      <div className="font-[500] text-[18px] text-[#444]">
                        Q{index + 1}.  &nbsp; {qa.question}
                      </div>
                      <div
                        className={`flex items-center font-[500] text-[26px] cursor-pointer ${
                          rotateArrow[index]
                            ? "transition-all rotate-180 ease-in-out duration-300"
                            : ""
                        }`}
                        onClick={() => {
                          handleShowAns(index);
                          handleRotateArrow(index);
                        }}
                      >
                        <MdKeyboardArrowDown />
                      </div>
                    </div>
                    <div
                      className={`flex flex-row ${
                        showAns[index]
                          ? " transform transition-transform ease-in-out duration-300 visible"
                          : " hidden"
                      }  `}
                    >
                      <div className="flex flex-col">
                        <p className="py-4">
                          <hr />
                        </p>
                        <div className="flex flex-row gap-9 py-4 text-[#9a9a9a] ">
                          Ans.
                          <p className="">{qa.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col justify-center gap-3 lg:md:w-1/4">
                {/* Contact us card */}
                <div
                  className="flex flex-col rounded-[25px] text-[14px] font-[500] gap-3 px-2 py-4 text-center justify-center bg-white"
                  style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <h1 className="font-[600] text-[25px] leading-10">
                    Contact Us
                  </h1>
                  <p className="text-[#555555] ">
                    Reaching us is easy! Let us know your queries. We would love
                    to hear from you!
                  </p>
                  <div className="flex flex-row gap-4 text-[#555555] ">
                    <GrMail size={16} className="text-[#C4C4C4]" />
                    <a href="" className=" underline">
                      support@carebynd.com
                    </a>
                  </div>
                  <div className="flex flex-row gap-4 text-[#555555]">
                    <BsTelephoneFill size={16} className="text-[#C4C4C4]" />
                    281-430-2345
                  </div>
                  <div className="flex flex-row gap-4 text-[#555555] text-left">
                    <TiLocation size={22} className="text-[#C4C4C4]" />
                    A47, Lorem ipsum dummy, State, Country-01001
                  </div>
                </div>

                <div
                  className="flex flex-col rounded-[25px] text-[14px] gap-3 px-12 py-4 text-center text-[#555555] justify-center bg-white"
                  style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <h2 className="font-[600] text-[18px]">Give us feedback</h2>
                  <p>What do you think about this CAN?</p>
                  <hr />
                  <div className="flex flex-col">
                    <div>
                      {" "}
                      <h3 className="font-[600] text-[14px]">{emojie}</h3>
                    </div>
                    <div className="flex flex-row items-center justify-evenly gap-4 py-3 cursor-pointer">
                      <FaRegFrown
                        size={25}
                        onClick={() => handleEmojie("Dissatisfied")}
                        className={` rounded-[15px] ${
                          emojie === "Dissatisfied"
                            ? "  text-[#C31A7F] ring-8 ring-[#f9e2ef] "
                            : ""
                        }`}
                      />
                      <FaRegMeh
                        size={25}
                        onClick={() => handleEmojie("Neutral")}
                        className={` rounded-[15px] ${
                          emojie === "Neutral"
                            ? "  text-[#C31A7F] ring-8 ring-[#f9e2ef] "
                            : ""
                        }`}
                      />
                      <FaRegSmile
                        size={25}
                        onClick={() => handleEmojie("Satisfied")}
                        className={` rounded-[15px] ${
                          emojie === "Satisfied"
                            ? "  text-[#C31A7F] ring-8 ring-[#f9e2ef] "
                            : ""
                        }`}
                      />
                      <FaRegLaughBeam
                        size={25}
                        onClick={() => handleEmojie("Excellent")}
                        className={` rounded-[15px] ${
                          emojie === "Excellent"
                            ? "  text-[#C31A7F] ring-8 ring-[#f9e2ef] "
                            : ""
                        }`}
                      />
                    </div>
                    {emojie && (
                      <div className="flex flex-col w-full pt-2">
                        <p className="font-[500] self-start px-2 pb-1">
                          Where can we improve?
                        </p>
                        <textarea
                          placeholder="Type here..."
                          className="bg-[#e5e5e5] rounded-[15px] p-2 outline-none"
                          height={20}
                        />
                        <div className="justify-center items-center flex p-2">
                          <button className=" bg-[#C31A7F] text-white rounded-[10px] w-fit py-2 px-6">
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default HelpFeedback;

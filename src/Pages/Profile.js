import React, { useState } from "react";
import HomeNav from "../Components/HomeNav";
import { AiOutlineCamera } from "react-icons/ai";
import { BsCameraReels } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Roles_fighter_banner from "../Photos/Roles_Fighter_banner.png";
import account from "../Photos/account.jpg";
import climberEverest from "../Photos/climberEverest.webp";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { SlPaperPlane } from "react-icons/sl";
import { TfiGallery } from "react-icons/tfi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";
import FloatingChat from "../Components/FloatingChat";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [details, setDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredVideo, setIsHoveredVideo] = useState(false);
  const location = useLocation();
  const { userID } = location.state || {};
  console.log("Profile::::;;::;;",location)

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterVideo = () => {
    setIsHoveredVideo(true);
  };

  const handleMouseLeaveVideo = () => {
    setIsHoveredVideo(false);
  };

  function ShowDetails() {
    setDetails(!details);
  }

  return (
    <>
      <div className="h-[100vh] ">
        <div>
          <HomeNav />
        </div>
        <div className="bg-[#FEF8FD] flex flex-col">
          {/* Left side */}
          <div className="bg-white w-[57%]  ml-[13%] h-[52%] mt-8 rounded-2xl shadow-xl relative ">
            <div className="w-full h-[60%] overflow-hidden">
              <img
                src={Roles_fighter_banner}
                alt="img.roles.fighter"
                className="w-full h-full"
              />
              <div className="absolute top-[20%] right-[18%] text-white">
                <h1 className="text-3xl font-semibold py-2">Fighter</h1>
                <p className="text-xl">I will defeat cancer</p>
              </div>
            </div>

            <div className="rounded-full overflow-hidden absolute top-[40%] left-[10%] w-[20%] h-[%] bg-white flex justify-center items-center ">
              <div className="">
                <img
                  src={account}
                  alt="account.jpg"
                  className="w-[100%] h-[%] p-1 rounded-full"
                />
              </div>
            </div>

            <div className="absolute bottom-[20%] left-[25%] flex justify-center items-center bg-[#FFF6FB] rounded-full p-2">
              <AiOutlineCamera size={20} />
            </div>

            <div className="ml-[30%] w-[] h-[40%] flex pt-2 flex-col mr-4">
              <div className=" w-full h-max items-center justify-between flex ">
                <h1 className="text-2xl  font-semibold">Iqra Aziz</h1>
                <p className="text-sm font-semibold">CAN ID: ABC1212 </p>
              </div>

              <div className="flex justify-between">
                <h2 className="  text-[#C31A7F]">Cancer fighter</h2>
                {/* <div className="flex items-center gap-2 p-2 bg-[#c31a7f37] rounded-2xl">
                  <MdOutlineModeEdit />
                  <h2 className="">Edit profile</h2>
                </div> */}
              </div>

              <div className="mt-4">
                <hr />
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="bg-white w-[57%]  ml-[13%] h-[52%] mt-8 rounded-2xl shadow-xl p-6">
            <h1 className="font-semibold">POSTS</h1>
            <div
              className="pt-4 w-[40%] relative "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={climberEverest} alt="climber.jpg" />

              {/* show details of the post */}
              {details && (
                <div
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                  style={{ backdropFilter: "blur(2px)" }}
                >
                  <div className="w-[70%] h-[70%] bg-[#FDF4F9] rounded-3xl flex overflow-hidden">
                    {/* Left side (Photo) */}
                    <div className="w-[60%]">
                      <img
                        src={climberEverest}
                        alt="none"
                        className="object-cover h-[100%] w-[100%]"
                      />
                    </div>

                    {/* Right side (Details) */}
                    <div className="w-[40%] mt-8 mx-6 relative">
                      <div className=" flex h-max items-center gap-2">
                        <div className="rounded-full overflow-hidden  h-max w-[20%]">
                          <img src={account} alt="none" className="" />
                        </div>

                        <div className="flex flex-col  w-full">
                          <div className="flex flex-row items-center justify-between w-full">
                            <div className="flex flex-row gap-2 items-center">
                              <h1 className="font-semibold">Sierra Ferguson</h1>
                              <p className="text-xs text-[#7E7E7E]">
                                15 hrs ago
                              </p>
                            </div>

                            <div onClick={ShowDetails}>
                              <IoMdClose />
                            </div>
                          </div>

                          <div className="flex gap-2 items-center ">
                            <h1 className="text-xs p-2 px-4 bg-[#efc4194c] rounded-2xl">
                              Blogger
                            </h1>
                            <h1 className="text-xs font-semibold   text-[#C31A7F]">
                              Cancer Fighter
                            </h1>
                          </div>
                        </div>
                      </div>

                      {/* heading */}
                      <div className="font-semibold mt-2">
                        <h1>Cancer Survivor Stories: Bethany</h1>
                      </div>

                      {/* content */}
                      <div className="text-[80%]">
                        Bethany was running in a half marathon when she began to
                        feel ill. She thought that her celiac disease may have
                        flared up due to something she had eaten, but when she
                        didn’t get better, she decided to see a doctor. What
                        followed was a series of misdiagnoses celiac disease may
                        have flared up due to something she had eaten, but when
                        she didn’t get better, she decided to see a doctor.
                      </div>

                      {/* comments */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className="w-[10%] rounded-full overflow-hidden">
                          <img src={account} alt="none" />
                        </div>

                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <h1 className="font-semibold">Sierra Ferguson</h1>
                              <p className="text-xs   text-[#C31A7F]">
                                Cancer Fighter
                              </p>
                              <p className="text-xs items-center">
                                <AiOutlineHeart />
                              </p>
                            </div>
                            <div className="text-xs text-[#7E7E7E]">
                              15 hrs ago
                            </div>
                          </div>
                          <div className="text-sm">better luck next time</div>
                        </div>
                      </div>
                      {/* input section */}
                      <div className="absolute bottom-4">
                        <div className="flex gap-3 w-full bg-transparent">
                          <img
                            src={account}
                            alt="none"
                            className="rounded-full w-[10%] h-[60%] shadow-md "
                          />
                          <input
                            placeholder="Write here..."
                            className="outline-none w-full bg-transparent "
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          <div className="flex w-[25%] justify-between  gap-2 items-center ">
                            <TfiGallery color="#C4C4C4" size={18} />
                            <HiOutlineGif color="#C4C4C4" size={20} />
                            <HiOutlineLocationMarker
                              color="#C4C4C4"
                              size={20}
                            />
                            <GrEmoji color="#C4C4C4" size={20} />
                          </div>
                          <div className="bg-[#efc419] text-white p-0.5 px-6 rounded-xl">
                            Post
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* on Hover */}
              {isHovered && (
                <div
                  className="absolute top-0 mt-4 text-white bg-[#00000063] h-[92%] w-full"
                  onClick={ShowDetails}
                >
                  <p className="absolute right-2 ">2w</p>
                  <div className="absolute bottom-0 text-sm">
                    <div className="flex gap-2 px-2">
                      <h1>Iqra Aziz</h1>
                      <p>Cancer Fighter</p>
                    </div>
                    <div className="flex gap-2 px-2">
                      Cancer Survivor Stories Bethany
                    </div>

                    <div className="flex gap-2 px-2 items-center">
                      <AiOutlineHeart size={18} /> 2k
                      <FaRegComment size={16} /> 1k
                      <SlPaperPlane size={16} /> 1.5k
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-right text-[#1877F2]">See more</p>
          </div>

          {/* Videos */}
          <div className="bg-white w-[57%]  ml-[13%] h-[52%] mt-8 rounded-2xl shadow-xl p-6">
            <h1 className="font-semibold">VIDEOS</h1>
            <div
              className="pt-4 w-[40%] relative "
              onMouseEnter={handleMouseEnterVideo}
              onMouseLeave={handleMouseLeaveVideo}
            >
              <div className="relative">
                <img src={climberEverest} alt="climber.jpg" />
                <div className="absolute top-2 left-2">
                  <BsCameraReels size={20} color="white" />
                </div>
              </div>

              {/* on Hover */}
              {isHoveredVideo && (
                <div className="absolute top-0 mt-4 text-white bg-[#00000063] h-[92%] w-full">
                  <p className="absolute right-2 ">2w</p>
                  <div className="absolute bottom-0 text-sm">
                    <div className="flex gap-2 px-2">
                      <h1>Iqra Aziz</h1>
                      <p>Cancer Fighter</p>
                    </div>
                    <div className="flex gap-2 px-2">
                      Cancer Survivor Stories Bethany
                    </div>

                    <div className="flex gap-2 px-2 items-center">
                      <AiOutlineHeart size={18} /> 2k
                      <FaRegComment size={16} /> 1k
                      <SlPaperPlane size={16} /> 1.5k
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-right text-[#1877F2]">See more</p>
          </div>
          <FloatingChat />
        </div>
      </div>
    </>
  );
};

export default Profile;

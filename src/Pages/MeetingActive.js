import React, { useState, useRef } from "react";
import video from "../Photos/MoreIcons/video.png";
import videocall1 from "../Photos/videocall1.png";
import emotions from "../Photos/MoreIcons/emotions.png";
import microphone from "../Photos/MoreIcons/microphone.png";
import hand from "../Photos/MoreIcons/hand.png";
import sharescreen from "../Photos/MoreIcons/sharescreen.png";
import call from "../Photos/MoreIcons/call.png";
import profile from "../Photos/MoreIcons/profile.png";
import message from "../Photos/MoreIcons/message.png";
import videocall2 from "../Photos/videocall2.png";
import micOpen from "../Photos/MoreIcons/micOpen.png";
import pin from "../Photos/MoreIcons/pin.png";

const MeetingActive = () => {
  const [micOn, setMicOn] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const handleMic = () => {
    setMicOn(!micOn);
  };
  const [pinOpen, setPin] = useState(true);
  const handlePin = () => {
    setPin(!pinOpen);
  };
  const blocksData = [
    {
      micOn: true,
      pinOpen: true,
      videocall2Src: videocall2,
      name: "Ishita Sharma",
      role: "Cancer Fighter",
    },
    {
      micOn: true,
      pinOpen: true,
      videocall2Src: videocall2,
      name: "Ishita Sharma",
      role: "Cancer Fighter",
    },
    {
      micOn: true,
      pinOpen: true,
      videocall2Src: videocall2,
      name: "Ishita Sharma",
      role: "Cancer Fighter",
    },
    {
      micOn: true,
      pinOpen: true,
      videocall2Src: videocall2,
      name: "Ishita Sharma",
      role: "Cancer Fighter",
    },
    {
      micOn: true,
      pinOpen: true,
      videocall2Src: videocall2,
      name: "Ishita Sharma",
      role: "Cancer Fighter",
    },
    // Add more data objects for additional blocks if needed
  ];
  const toggleCamera = () => {
    setCameraActive(!cameraActive); // Toggle camera status
    if (cameraActive) {
      // If camera is active, stop the stream
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } else {
      // If camera is not active, start the stream
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
  };

  return (
    <>
      {/* Video call screen */}
      <div className="flex flex-col w-full h-screen px-10 bg-[#FFF6FB]">
        {/* Top title bar */}
        <div className="flex flex-row justify-between">
          {/* Title space */}
          <div className="flex flex-col mt-4">
            <h2 className="text-pink-600 text-start text-[14px] font-medium tracking-wide ">
              Team CAN
            </h2>
            <h2 className="text-black text-[16px] font-medium tracking-wide">
              agenda, about it, meeting description agenda,
            </h2>
            <p className="text-gray-500 text-start text-[12px] font-medium tracking-wide">
              Cancer Fighter
            </p>
          </div>
        </div>
        {/* middle video section */}
        <div className="flex flex-row w-full gap-2 h-[75%]">
          <div className="relative py-2 rounded-[20px] w-3/5">
            <p
              className="mt-6 end-9 w-fit absolute p-2 bg-[rgba(11,19,19,0.2)] rounded-[16px] backdrop-filter backdrop-blur-[8px] bg-opacity tracking-wide text-white text-[12px]"
              onClick={handleMic}
            >
              {micOn ? (
                <img src={micOpen} alt="Mic On" className="h-[18px]" />
              ) : (
                <img src={microphone} alt="Mic Off" className="h-[18px]" />
              )}
            </p>
            <img
              src={videocall1}
              className="rounded-[20px]"
              style={{ boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.05)" }}
            />
            <div className="-mt-12 ml-6 w-fit px-4 py-2 bg-[rgba(11,19,19,0.2)] rounded-[16px] backdrop-filter backdrop-blur-[8px]  tracking-wide text-white text-[12px]">
              Siddhant Sharma
            </div>
          </div>
          {/* Other participants screen */}
          <div className="flex flex-col w-2/5 overflow-y-scroll scroll-m-1">
            {/* Video call screen */}
            <div className="flex flex-wrap gap-2">
              {blocksData.map((block, index) => (
                <div className="relative w-fit py-2" key={index}>
                  <div className="flex absolute flex-col gap-1 mt-4 end-4">
                    <p
                      className="p-1 bg-[rgba(11,19,19,0.2)] rounded-[16px] backdrop-filter backdrop-blur-[8px] bg-opacity tracking-wide text-white"
                      onClick={handleMic}
                    >
                      {block.micOn ? (
                        <img src={micOpen} alt="Mic On" className="h-[16px]" />
                      ) : (
                        <img
                          src={microphone}
                          alt="Mic Off"
                          className="h-[16px]"
                        />
                      )}
                    </p>
                    <p
                      className="p-1 bg-[rgba(11,19,19,0.2)] rounded-[16px] backdrop-filter backdrop-blur-[8px] bg-opacity tracking-wide text-white"
                      onClick={handlePin}
                    >
                      {block.pinOpen ? (
                        <img src={pin} alt="Pinned" className="h-[16px]" />
                      ) : (
                        <img src={""} alt="Unpinned" className="h-[16px]" />
                      )}
                    </p>
                  </div>
                  <img
                    src={block.videocall2Src}
                    className="rounded-[20px] h-[250px] w-[280px]"
                    style={{
                      boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.05)",
                    }}
                    alt="Video Call"
                  />

                  <div className="flex flex-col -mt-14 ml-2 w-fit px-4 p-1 bg-[rgba(0,0,0,0.4)] rounded-[16px] backdrop-filter backdrop-blur-[0px] text-white">
                    <p className="text-[12px] tracking-wide">{block.name}</p>
                    <p className="text-[10px]">{block.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>{" "}
        </div>{" "}
        {/** middle video section ends */}
        {/* buttons section */}
        <div className=" flex flex-row py-6 justify-end w-full">
          <div className="flex flex-row gap-4 justify-center items-center [w-60%]">
            <button
              className={`flex justify-center items-center p-2 bg-[#00000020] w-[45px] h-[45px] rounded-[20px] hover:bg-[#C31A7F] hover:shadow-lg`}
              onClick={handleMic}
            >
              {" "}
              {micOn ? (
                <img src={micOpen} alt="Mic On" />
              ) : (
                <img src={microphone} alt="Mic Off" />
              )}
            </button>
            <button
              className="flex justify-center items-center p-2 bg-[#00000020] w-[45px] h-[45px] rounded-[20px] hover:bg-[#C31A7F] hover:shadow-lg"
              onClick={toggleCamera}
            >
              <video
                ref={videoRef}
                style={{ display: cameraActive ? "block" : "none" }} // Hide/show the video element based on camera status
              />
            </button>
            <button className="flex justify-center items-center p-2 bg-[#00000020] w-[45px] h-[45px] rounded-[20px] hover:bg-[#C31A7F] hover:shadow-lg">
              <img src={sharescreen} alt="Share Screen" />
            </button>
            <button className="flex justify-center items-center p-2 bg-[#00000020] w-[45px] h-[45px] rounded-[20px] hover:bg-[#C31A7F] hover:shadow-lg">
              <img src={hand} alt="Hand" />
            </button>
            <button className="flex justify-center items-center p-2 bg-[#00000020] w-[45px] h-[45px] rounded-[20px] hover:bg-[#C31A7F] hover:shadow-lg">
              <img src={emotions} alt="Emotions" />
            </button>
            <button className="flex justify-center items-center p-2 bg-[#00000020] w-[45px] h-[45px] rounded-[20px] hover:shadow-lg bg-[#EA4335]">
              <img src={call} alt="Call" />
            </button>
          </div>
          <div className="flex w-[40%] justify-end">
            <div className="flex"></div>
            <div className="flex flex-row gap-4 pr-2">
              <button className="flex justify-center items-center p-2 bg-[#00000020] w-[45px] h-[45px] rounded-[20px] hover:bg-[#C31A7F] hover:shadow-lg">
                <img src={profile} alt="Profile" />
              </button>
              <button className="flex justify-center items-center p-2 bg-[#00000020] w-[45px] h-[45px] rounded-[20px] hover:bg-[#C31A7F] hover:shadow-lg">
                <img src={message} alt="Message" />
              </button>
            </div>
          </div>
          {/* buttons section ends */}
        </div>
      </div>
    </>
  );
};

export default MeetingActive;

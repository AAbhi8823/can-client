import React, { useEffect, useRef, useState } from "react";
import { GoFileMedia } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import { TfiGallery } from "react-icons/tfi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import account from "../Photos/account.jpg";
import { IoCloseCircleSharp } from "react-icons/io5";
import gallery from "../Photos/gallery.png";
import gificon from "../Photos/gifIcon.png";
import location from "../Photos/location.png";
import smily from "../Photos/smily.png";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BiArrowBack } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookie from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = ({ close_createPost, getPostData }) => {
  const navigate = useNavigate();
  const [zindex, setzindex] = useState(Number);
  const [image, setImage] = useState(null);
  const hiddenChooseImage = useRef(null);
  const [modalLocation, setModalLocation] = useState(false);
  const [postEmoji, setpostEmoji] = useState(false);
  const pickerRef = useRef(null);
  const [input, setInput] = useState("");
  const [mainImg, setMainImg] = useState();

  const toggleLocation = () => {
    setModalLocation(!modalLocation);
  };

  const hideImage = () => {
    setImage(false);
  };

  const uploadImage = () => {
    hiddenChooseImage.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setMainImg(file);
  };

  const open_TextArea = () => {
    console.log("hello bro");
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setInput(input + emoji);
  };

  const handlePickerFocus = () => {
    setpostEmoji(true);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const [navUser, setNavuser] = useState();

  useEffect(() => {
    const activeUser = async () => {
      const token = Cookie.get("token");
      const homeUser = localStorage.getItem("active_user");
      try {
        const userData = await axios.post(
          `${baseurl}/api/singleuser?token=${token}`,
          {
            id: `${homeUser}`,
          }
        );
        console.log("createPost:", userData.data.data);
        setNavuser(userData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    activeUser();
  }, []);

  const [postData, setPostData] = useState();
  const [isPosting, setIsPosting] = useState();

  const handlePost = async () => {
    setIsPosting(true);
    const token = Cookie.get("token");
    const activeUser = localStorage.getItem("active_user");
    const formInfo = new FormData();
    formInfo.set("content", input);
    formInfo.set("post_image", mainImg);
    formInfo.set("userId", activeUser);
    try {
      const createPost = await axios.post(
        `${baseurl}/api/createpost?token=${token}`,
        formInfo,
        {
          headers: {
            "Content-Type": "multipart/formData",
          },
        }
      );

      if (createPost) {
        console.log("api working")
        
        toast.success("Posted Successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        window.location.reload();
      } else {
        console.log("api error")
      }

      // console.log(createPost)
      // setPostData(createPost)
      // getPostData(createPost);
      setIsPosting(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {postEmoji && (
        <div
          className="absolute top-52 lg:top-56 lg:left-96"
          style={{ left: "535px", zIndex: "26" }}
          ref={pickerRef}
        >
          <Picker
            data={data}
            emojiSize={26}
            emojiButtonSize={34}
            onEmojiSelect={addEmoji}
            maxFrequentRows={0}
            theme="light"
            category="apple"
            autoFocus={true}
            onFocus={handlePickerFocus}
            icons="solid"
          />
        </div>
      )}

      {modalLocation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="lg:w-[500px] lg:h-[500px] w-[350px] h-[500px] bg-[#FFFFFF] flex flex-col  rounded-[30px] relative">
            <div className="flex flex-row items-center gap-14 lg:gap-32  justify-evenly p-5">
              <BiArrowBack
                onClick={() => {
                  toggleLocation();
                  setzindex(0);
                }}
              />
              <h1 className="text-[18px] font-semibold">Search For Location</h1>
              <IoMdClose
                onClick={() => {
                  toggleLocation();
                  setzindex(0);
                }}
              />
            </div>
            <div className=" relative p-4">
              <CiSearch size={20} className="absolute top-6 left-6 " />

              <input
                placeholder="Where are you ?"
                className=" w-full h-9 outline-none rounded-[15px] px-10 placeholder:text-[12px] placeholder:font-semibold   bg-[#FEF8FD]  "
              />
            </div>

            <div className="flex flex-row items-center gap-3 p-3">
              <div className="bg-[#FEF8FD] w-8 h-8 rounded-full flex items-center justify-center ">
                <GrLocation />
              </div>
              <div>
                <p className="text-[14px] font-semibold">India</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3 p-3">
              <div className="bg-[#FEF8FD] w-8 h-8 rounded-full flex items-center justify-center ">
                <GrLocation />
              </div>
              <div>
                <p className="text-[14px] font-semibold">Delhi ,India</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3 p-3">
              <div className="bg-[#FEF8FD] w-8 h-8 rounded-full flex items-center justify-center ">
                <GrLocation />
              </div>
              <div>
                <p className="text-[14px] font-semibold">Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50 bg-[#989898] bg-opacity-[0.5] "
        style={{ zIndex: "1" }}
      >
        <div className="bg-white p-2  lg:w-[50%] relative  rounded-[30px] ">
          <input
            type="file"
            accept="image/*"
            ref={hiddenChooseImage}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <div className="w-full pt-1 px-5  rounded-full overflow-hidden flex gap-2 ">
            {/* <img src={account} alt='none' className='w-[10%] rounded-full' /> */}
            {/* <Avatar
              alt=" "
              src={account}
              sx={{ width: 56, height: 56 }}
            /> */}
            <Avatar
              alt={navUser?.username}
              sx={{ width: 46, height: 46 }}
              src={navUser?.profile_photo}
            />
            <div className="flex justify-center flex-col">
              {/* <input value={input} onChange={handleInput} placeholder='Write here...' className='w-full outline-none lg:text-[20px] text-[14px]' /> */}
              <p className="text-[18px] font-[500]">{navUser?.username}</p>
              <p className="text-[12px] font-semibold text-[#C31A7F]">
                {navUser?.profile_category.category_Name}
              </p>
            </div>
          </div>
          {/* <div className='p-[10px] flex-col flex items-center justify-center  max-h-[50vh] min-h-[50vh]'>

          </div> */}

          <div className="p-[10px]  max-h-[50vh] min-h-[50vh]">
            {/* <textarea placeholder='Start typing what’s on your mind...' className='outline-none border-none' cols={85} /> */}
            <div className="px-[10px] py-[5px]">
              <input
                type="text"
                value={input}
                onChange={handleInput}
                placeholder="Start typing what’s on your mind..."
                className="w-full outline-none border-none"
              />
            </div>
            <div
              className={`flex justify-center flex-col items-center w-[100%] h-[38vh] rounded-[30px] ${
                image ? "" : "border border-dashed border-gray-500 border-2"
              } `}
            >
              {image ? (
                <>
                  <img
                    src={image}
                    alt="Uploaded"
                    className="rounded-[30px]"
                    style={{
                      height: "calc(100% - 280px)",
                      objectFit: "contain",
                      position: "absolute",
                      width: "100%",
                    }}
                  />
                  <button
                    className="absolute cursor-pointer rounded-full bg-black bg-opacity-40 top-6 right-6 "
                    onClick={hideImage}
                  >
                    <IoCloseCircleSharp color="white" size={24} />
                  </button>
                </>
              ) : (
                <>
                  <div
                    onClick={close_createPost}
                    className="absolute cursor-pointer rounded-full bg-black bg-opacity-40 top-6 right-6"
                  >
                    <IoCloseCircleSharp color="white" size={24} />
                  </div>
                  <div className="font-[600]">Select Files to begin</div>
                  <div className="p-[10px] text-[#969696] text-[12px] ">
                    Share images or a single video in your post
                  </div>
                  <button
                    className="bg-[#C31A7F] cursor-pointer text-white px-4 p-2 rounded-2xl"
                    onClick={uploadImage}
                  >
                    Upload Image
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-5 px-[10px] py-[15px]">
              <Tooltip title="Post">
                <img
                  src={gallery}
                  className="w-5 cursor-pointer opacity-50"
                  alt="none"
                  onClick={uploadImage}
                />
              </Tooltip>

              <Tooltip title="Location">
                <img
                  src={location}
                  className="w-5 cursor-pointer opacity-50"
                  alt="none"
                  onClick={() => {
                    toggleLocation();
                    setzindex(-9);
                  }}
                />
              </Tooltip>

              <Tooltip title="Emoji">
                <img
                  src={smily}
                  className="w-5 cursor-pointer opacity-50 hover:text-slate-300 "
                  alt="none"
                  onClick={() => setpostEmoji(!postEmoji)}
                />
              </Tooltip>
            </div>
          </div>
          <div className="p-2 text-end border-t border-[#F0F0F0]">
            <button
              onClick={handlePost}
              className="bg-[#C31A7F] text-white px-[30px] py-2 text-center rounded-full"
            >
              {isPosting ? "Posting..." : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;

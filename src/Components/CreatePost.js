import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = ({ close_createPost }) => {
  const navigate = useNavigate();
  const hiddenChooseImage = useRef(null);
  const [image, setImage] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [input, setInput] = useState("");
  const [navUser, setNavuser] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

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
        setNavuser(userData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    activeUser();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setMainImg(file);
  };

  const hideImage = () => {
    setImage(null);
    setMainImg(null);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };


  const handlePost = async () => {
    setIsPosting(true);
    const token = Cookie.get("token");
    const formInfo = new FormData();
    formInfo.set("post_title", input);
    formInfo.set("media_files", mainImg);
    // formInfo.set("userId", activeUser);
    try {
      const createPost = await axios.post(
        `${baseurl}/mystory/add-story`,
        formInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (createPost) {
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
      }
  
      setIsPosting(false);
    } catch (error) {
      console.log(error);
    }
  };
  


  // const handlePost = async () => {
  //   setIsPosting(true);
  //   const token = Cookie.get("token");
  //   const activeUser = localStorage.getItem("active_user");
  //   const formInfo = new FormData();
  //   formInfo.set("content", input);
  //   formInfo.set("post_image", mainImg);
  //   formInfo.set("userId", activeUser);
  //   try {
  //     const createPost = await axios.post(
  //       `${baseurl}/mystory/add-story`,
  //       formInfo,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/formData",
  //         },
  //       }
  //     );

  //     if (createPost) {
  //       toast.success("Posted Successfully!", {
  //         position: "top-center",
  //         autoClose: 2000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: false,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       window.location.reload();
  //     }

  //     setIsPosting(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50 bg-[#989898] bg-opacity-[0.5]">
        <div className="bg-white p-2 lg:w-[50%] relative rounded-[30px] ">
          <input
            type="file"
            accept="image/*"
            ref={hiddenChooseImage}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <div className="w-full pt-1 px-5  rounded-full overflow-hidden flex gap-2 ">
            <Avatar
              alt={navUser?.username}
              sx={{ width: 46, height: 46 }}
              src={navUser?.profile_photo}
            />
            <div className="flex justify-center flex-col">
              <p className="text-[18px] font-[500]">{navUser?.username}</p>
              <p className="text-[12px] font-semibold text-[#C31A7F]">
                {navUser?.profile_category.category_Name}
              </p>
            </div>
          </div>

          <div className="p-[10px]  max-h-[50vh] min-h-[50vh]">
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
                    <IoMdClose color="white" size={24} />
                  </button>
                </>
              ) : (
                <>
                  <div
                    onClick={close_createPost}
                    className="absolute cursor-pointer rounded-full bg-black bg-opacity-40 top-6 right-6"
                  >
                    <IoMdClose color="white" size={24} />
                  </div>
                  <div className="font-[600]">Select Files to begin</div>
                  <div className="p-[10px] text-[#969696] text-[12px] ">
                    Share images or a single video in your post
                  </div>
                  <button
                    className="bg-[#C31A7F] cursor-pointer text-white px-4 p-2 rounded-2xl"
                    onClick={() => hiddenChooseImage.current.click()}
                  >
                    Upload Image
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-5 px-[10px] py-[15px]">
              <Tooltip title="Post">
                <GrLocation
                  size={24}
                  className="cursor-pointer opacity-50"
                  onClick={() => {}}
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

import React, { useEffect, useRef, useState } from "react";
import TabPanel from "./TabPanel";
import FlippingImage from "../Components/FlipImage";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import climberEverest from "../Photos/climberEverest.webp";
import VerticalAppointment from "../Components/VerticalAppointment";
import VerticalMedicine from "../Components/VerticalMedicine";
import account from "../Photos/account.jpg";
import premium from "../Photos/premium.png";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { SlPaperPlane } from "react-icons/sl";
import { BsBookmarkDash } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import SingleLineCalendar from "../Components/SingleLineCalender";
import VerticalSLC from "../Components/VericalSLC";
import FloatingChat from "../Components/FloatingChat";
import Page from "../Layouts/Pages";
import { RxCross2 } from "react-icons/rx";
import gallery from "../Photos/gallery.png";
import gificon from "../Photos/gifIcon.png";
import location from "../Photos/location.png";
import smily from "../Photos/smily.png";
import { TfiGallery } from "react-icons/tfi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import Send from "../Photos/Send.png";
import commentIcon from "../Photos/commentIcon.png";
import save from "../Photos/save.png";
import saved from "../Photos/saved.png";
import { MdPanoramaVerticalSelect } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { BsCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import CreatePost from "../Components/CreatePost";
import { BsLink45Deg } from "react-icons/bs";
import { CiFaceSmile } from "react-icons/ci";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { BiCheckCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import blockuser from "../Photos/blockuser.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SelectLabels from "../Components/SelectLabels";

import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookie from "js-cookie";

import Tooltip from "@mui/material/Tooltip";
// import SkeletonFile from '../Pages/Skeleton'
import Skeleton from "@mui/material/Skeleton";
import Cookies from "js-cookie";

function MyStory({ value }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [Count, setCount] = useState(0);
  const [MainPost, setMainPost] = useState();
  const [isHovered, setIsHovered] = useState(false);

  const emojiButtonRef = useRef(null);
  const pickerRef = useRef(null);
  // const [heart, setHeart] = useState()
  const [heart1, setHeart1] = useState();
  const [createPost, setCreatePost] = useState(false);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const [reportButton, setReportButton] = useState(false);
  const [checked, setChecked] = useState([]);
  const [showThanku, setThanku] = useState(false);
  const [showlocation, setShowLacation] = useState(false);
  const [showgif, setShowgif] = useState(false);
  const [userBlock, setUserBlock] = useState(false);
  const [userblocked, setUserBlocked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const para =
    "Bethany was running in a half marathon when she began to feel ill. She thought that her celiac disease may have flared up due to something she had eaten, but when she didn’t get better, she decided to see a doctor. What followed was a series of misdiagnoses is the etc";

  const handleReadMore = () => {
    setShowFullContent(true);
  };

  //  gif data
  const GifImage = [
    { id: 1, image: "climberEverest.Webp" },
    { id: 2, image: "climberEverest.Webp" },
    { id: 3, image: "climberEverest.Webp" },
    { id: 4, image: "climberEverest.Webp" },
    { id: 5, image: "climberEverest.Webp" },
    { id: 6, image: "climberEverest.Webp" },
  ];

  // blocked user
  const toggleBlockedTab = () => {
    setUserBlocked(!userblocked);
  };

  // block user
  const deletePost = async(postid) => {
    console.log(postid)
    const token = Cookies.get("token")
    try {
      const data = await axios.delete(`${baseurl}/deletepost/${postid}?token=${token}`);
      if (data) {
        console.log(data)
      } else {
        console.log("api error")
      }
    } catch (error) {
      console.log(error)
    }
  };

  // location and GIF
  const toggleLocation = () => {
    setShowLacation(!showlocation);
  };

  const toggleGif = () => {
    setShowgif(!showgif);
  };

  // emoji
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setInput(input + emoji);
  };

  // share button functionality
  const checkList = [
    {
      id: 1,
      name: "Sierra Ferguson",
      image: "account2.jpg",
      description: "Works at National Museum",
    },
    {
      id: 2,
      name: "Sierra Ferguson",
      image: "account2.jpg",
      description: "Works at National Museum",
    },
    {
      id: 3,
      name: "Sierra Ferguson",
      image: "account2.jpg",
      description: "Works at National Museum",
    },
    {
      id: 4,
      name: "Sierra Ferguson",
      image: "account2.jpg",
      description: "Works at National Museum",
    },
    {
      id: 5,
      name: "Sierra Ferguson",
      image: "account2.jpg",
      description: "Works at National Museum",
    },
    {
      id: 6,
      name: "Sierra Ferguson",
      image: "account2.jpg",
      description: "Works at National Museum",
    },
    {
      id: 7,
      name: "Sierra Ferguson",
      image: "account2.jpg",
      description: "Works at National Museum",
    },
  ];

  const handleCheck = (event, item) => {
    if (event.target.checked) {
      setChecked([...checked, item]);
    } else {
      setChecked(checked.filter((checkedItem) => checkedItem.id !== item.id));
    }
  };

  const handleRemoveItem = (item) => {
    setChecked(checked.filter((checkedItem) => checkedItem.id !== item.id));
  };

  const isChecked = (item) => {
    return checked.some((checkedItem) => checkedItem.id === item.id);
  };

  const toggleShareButton = () => {
    setShareButton(!shareButton);
  };

  const [commentModel, setcommentModel] = useState([]);

  const toggleContent = (commentItem) => {
    setShowContent(!showContent);
    setcommentModel(commentItem);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const toggleReportButton = () => {
    setReportButton(!reportButton);
  };

  const togglethanku = () => {
    setThanku(!showThanku);
  };

  const [LikeID, setLikeID] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  const likeButton = async (likeID) => {
    document.getElementById("likeButtonColorless").style.color = "red";
    console.log(likeID);
    const Postid = likeID;
    const postUserId = localStorage.getItem("active_user");
    const posttoken = Cookie.get("token");

    try {
      const LikeData = await axios.post(
        `${baseurl}/api/createLike?token=${posttoken}`,
        {
          post_id: `${Postid}`,
          userId: `${postUserId}`,
          is_like: true,
        }
      );
      setLikeID(true);
      if (LikeData) {
        setLikedPosts((prevLikedPosts) => ({
          ...prevLikedPosts,
          [likeID]: true,
        }));
        // HomePost();
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  function likeButton1() {
    setHeart1(!heart1);
  }

  function open_post() {
    setCreatePost(true);
  }

  // const para = 'Bethany was running in a half marathon when she began to feel ill. She thought that her celiac disease may have flared up due to something she had eaten, but when she didn’t get better, she decided to see a doctor. What followed was a series of misdiagnoses is the etc'

  // three dots
  const [threeDots, setThreeDots] = useState(false);

  function threeDotsToggle(postId) {
    setThreeDots((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }

  //outclick from three dots
  const threeDotsOutClick = useRef(null);

  const handleClickOutsidethreeDots = (event) => {
    if (
      threeDotsOutClick.current &&
      !threeDotsOutClick.current.contains(event.target)
    ) {
      setThreeDots(false);
    }
  };

  // const [userId, setUser] = useState()

  // const showactiveId = () => {
  //     setUser(localStorage.getItem('active_user'))
  // }

  // console.log(token)

  // console.log(userId)

  useEffect(() => {
    // showactiveId()

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
        console.log("Home:", userData);
      } catch (error) {
        console.log(error);
      }
    };

    activeUser();

    // const activeUser = axios.post(`${baseurl}/api/singleuser`, {
    //     id: userId
    // })
    //     .then((res) => {
    //         console.log(res)
    //     })
    const handleClickOutside = (event) => {
      if (
        (emojiButtonRef.current &&
          emojiButtonRef.current.contains(event.target)) ||
        (pickerRef.current && pickerRef.current.contains(event.target))
      ) {
        return;
      }

      setShowEmoji(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    document.addEventListener("click", handleClickOutsidethreeDots, true);
    return () => {
      document.removeEventListener("click", handleClickOutsidethreeDots, true);
    };
  }, []);

  // emoji
  // useEffect(() => {

  // }, []);

  // emoji
  const handlePickerFocus = () => {
    setShowEmoji(true);
  };

  //vertical calender , appointments and Medicine
  const [vertical, setVertical] = useState("Upcoming");

  const toggleVertical = (item) => {
    setVertical(item);
  };

  const [comVal, setComVal] = useState();

  const takeValue = (e) => {
    // e.preventDefault()
    setComVal(e.target.value);
  };

  const handleCom = () => console.log(comVal);

  const postApidata = (postData) => {
    // console.log(postData.data.msg)
    if (postData.data.msg === "post create successfully") {
      // console.log("successfully created")
      setCreatePost(false);
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
    }
  };

  const [Loading, setLoading] = useState(true);
  const [filter, setfilter] = useState("most_likes");

  const [homePost, sethomePost] = useState(
    [ { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } }]
  );

  const userid = localStorage.getItem("active_user");
  const [isPostLoading, setPostLoading] = useState(true);
  // const HomePost = async () => {
  //   try {
  //     const HomePosttoken = Cookie.get("token");
  //     const homePost = await axios.post(
  //       `${baseurl}/api/getsingleuserdata?token=${HomePosttoken}`,
  //       {
  //         key: "mypost",
  //         userid: userid,
  //       }
  //     );
  //     sethomePost(homePost.data.data);
  //     setPostLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setPostLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const postId = homePost._id;

  useEffect(() => {
    // HomePost();
  }, []);

  useEffect(() => {}, []);

  // const [postComId, setPostComId] = useState()
  // setPostComId(commentModel._id)
  const handleComInput = (e) => {
    setComVal(e.target.value);
  };
  const handleComment = async () => {
    const CommentToken = Cookie.get("token");
    const commentUserId = localStorage.getItem("active_user");
    const postComID = commentModel._id;
    try {
      const CommentData = await axios.post(
        `${baseurl}/api/createcomment?token=${CommentToken}`,
        {
          post_id: postComID,
          userId: commentUserId,
          message: comVal,
        }
      );
      console.log("commentData:", CommentData);
    } catch (error) {
      console.log(error);
    }
    // console.log({
    //     msg: comVal,
    //     comID: postComID,
    //     comTok: CommentToken
    // })
  };

  // const [postId, setPostId] = useState()

  const [isPosting, setIsPosting] = useState();

  const handlePost = async () => {
    setIsPosting(true);
    const token = Cookie.get("token");
    const activeUser = localStorage.getItem("active_user");
    const formInfo = new FormData();
    formInfo.set("content", input);
    formInfo.set("userId", activeUser);
    try {
      const createPost = await axios.post(
        `${baseurl}/api/createpost?token=${token}`,
        formInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (createPost) {
        setIsPosting(false);
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
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isSaved, setIsSaved] = useState();

  const savePost = async (posiID) => {
    const token = Cookie.get("token");
    const userId = localStorage.getItem("active_user");
    try {
      const saveThePost = await axios.post(
        `${baseurl}/api/savepost?token=${token}`,
        {
          postid: posiID._id,
          userid: userId,
        }
      );
      if (saveThePost.data.status == true) {
        toast.success("Post Saved", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        setIsSaved(true);
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Other content for Section 1 */}
      <TabPanel value={value} index={0}>
        <div
          className=" lg:p-7 p-4 mt-10 shrink-0 w-[100%]  rounded-[30px] border-[1px]"
          style={{
            boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          {homePost?.map((homePostItems, index) => {
            // setPostId( "postID : ", homePostItems?._id)
            const createdAt = new Date(homePostItems?.createdAt);
            const formattedDate = createdAt.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });
            return (
              <div
                key={index}
                className=" lg:p-7 p-4 mt-1  md-w-[100%] mb-3 shrink-0 bg-[#C31A7F] bg-white rounded-[30px] border-[1px]"
                style={{
                  boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
                }}
              >
                <div className=" flex items-center gap-2">
                  <FlippingImage data={homePostItems?.userId?.profile_photo} />
                  <div className="flex  w-full items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="font-semibold">
                          {homePostItems?.userId?.username}
                        </h1>
                        <p className="text-xs text-[#7E7E7E]">
                          {formattedDate}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-[12px] font-semibold   text-[#C31A7F]">
                          {
                            homePostItems?.userId?.profile_category
                              ?.category_Name
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex  items-center justify-between relative  pb-6">
                      <div className="flex flex-row items-center ">
                        <BsThreeDots
                          className="cursor-pointer"
                          onClick={() => threeDotsToggle(homePostItems?._id)}
                        />
                      </div>
                      {threeDots[homePostItems?._id] && (
                        <div
                          className=" w-max h-max bg-white  shadow-2xl absolute top-0 right-7 "
                          ref={threeDotsOutClick}
                        >
                          <p
                            className="p-2 px-4 cursor-pointer hover:bg-[#C31A7F] hover:text-[#fff] border"
                            onClick={() => deletePost(homePostItems?._id)}
                          >
                            Delete Post
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <p className="py-2 text-[#484848] text-[13px] text-left md:shrink-0 md:text-left md:text-[14px] ">
                    {!showFullContent ? (
                      <>
                        {homePostItems.content?.length <= 250 ? (
                          homePostItems.content
                        ) : (
                          <>
                            {homePostItems.content?.slice(0, 250)}
                            <button
                              className="text-black font-semibold underline text-[13px] md:text-[14px] cursor-pointer"
                              onClick={handleReadMore}
                            >
                              Read More
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      homePostItems.content
                    )}
                  </p>
                </div>

                <div className="pt-3 ">
                  {homePostItems?.image ? (
                    <div className=" rounded-3xl w-full overflow-hidden h-[40vh]">
                      <img
                        src={homePostItems?.image}
                        className="w-full h-full object-cover"
                        alt="Not found"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className=" pt-7 flex justify-between">
                  <div className="flex  items-center gap-7">
                    <div
                      className="flex flex-row gap-2 items-center"
                      onClick={() => likeButton(homePostItems?._id)}
                    >
                      {likedPosts[homePostItems?._id] ? (
                        <AiFillHeart
                          className="cursor-pointer"
                          size={24}
                          color="red"
                        />
                      ) : (
                        <AiOutlineHeart
                          className="cursor-pointer"
                          size={24}
                          id="likeButtonColorless"
                        />
                      )}
                      {/* {heart ? <AiFillHeart className='cursor-pointer' size={24} color='red' /> : <AiOutlineHeart className='cursor-pointer' size={24} />} */}
                      <p className="text-[12px] font-bold">
                        {" "}
                        {homePostItems.likesCount}{" "}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={commentIcon}
                          className="w-6 cursor-pointer"
                          alt="none"
                          onClick={() => toggleContent(homePostItems)}
                        />
                        <p className="text-[12px] font-bold">
                          {homePostItems.CommentsCount}
                        </p>
                      </div>
                      {showContent && (
                        <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50 bg-[#989898] bg-opacity-[0.03] ">
                          <div className="w-[95%]  lg:w-[70%] lg:h-[70%]  bg-[#FDF4F9] rounded-3xl flex flex-col lg:flex lg:flex-row overflow-hidden">
                            <div className="lg:w-[60%] ">
                              <img
                                src={commentModel.image}
                                alt="none"
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="lg:w-[40%] flex flex-col justify-between gap-4 p-4 relative">
                              <div>
                                <div className=" flex h-max items-center gap-2">
                                  <div className="rounded-full overflow-hidden h-max w-[20%]">
                                    {commentModel.userId.profile_photo ? (
                                      <img
                                        src={commentModel.userId.profile_photo}
                                        alt="User Profile"
                                        className="rounded-full  h-12 "
                                      />
                                    ) : (
                                      <img
                                        src={blockuser}
                                        alt="Fallback User Profile"
                                        className="rounded-full"
                                      />
                                    )}
                                  </div>
                                  <div className="flex flex-col  w-full">
                                    <div className="flex flex-row items-center justify-between w-full">
                                      <div className="flex flex-row gap-2 items-center">
                                        <h1 className="font-semibold">
                                          {commentModel.userId.username}
                                        </h1>
                                        <p className="text-xs text-[#7E7E7E]">
                                          {commentModel.createdAt}
                                        </p>
                                      </div>
                                      <div
                                        className="cursor-pointer absolute right-8 top- lg:right- lg:"
                                        onClick={toggleContent}
                                      >
                                        <IoMdClose className="lg:text-[#000] " />
                                      </div>
                                    </div>
                                    <div className="flex gap-2 items-center ">
                                      <h1 className="text-xs font-semibold text-[#C31A7F]">
                                        Cancer Fighter
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                                {/* <div className='font-semibold'>
                                                                                                        <h1>Cancer Survivor Stories: Bethany</h1>
                                                                                                    </div> */}
                                <div className="text-[16px] py-[15px] ">
                                  {commentModel.content}
                                </div>
                                <div className="mt-[25px] flex items-center">
                                  <div className="w-[10%] rounded-full overflow-hidden">
                                    <img src={account} alt="none" />
                                  </div>
                                  <div className="w-full">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-3">
                                        <h1 className="font-semibold">
                                          Sierra Ferguson
                                        </h1>
                                        <p className="text-xs   text-[#C31A7F]">
                                          Cancer Fighter
                                        </p>
                                        <p className="text-xs items-centera">
                                          <AiOutlineHeart />
                                        </p>
                                      </div>
                                      <div className="text-xs text-[#7E7E7E]">
                                        15 hrs ago
                                      </div>
                                    </div>
                                    <div className="text-sm">
                                      Better luck next time
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-[25px] flex items-center gap-2">
                                  <div className="w-[10%] rounded-full overflow-hidden">
                                    <img src={account} alt="none" />
                                  </div>

                                  <div className="w-full">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-3">
                                        <h1 className="font-semibold">
                                          Sierra Ferguson
                                        </h1>
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
                                    <div className="text-sm">
                                      Better luck next time
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className=" bottom-4">
                                <div className="flex gap-3 w-full bg-transparent">
                                  <img
                                    src={account}
                                    alt="none"
                                    className="rounded-full w-[10%] h-[60%] shadow-md "
                                  />
                                  <input
                                    placeholder="Write here..."
                                    onChange={handleComInput}
                                    className="outline-none w-full bg-transparent "
                                  />
                                  <div className="flex-col cursor-pointer items-end flex justify-center">
                                    <img
                                      src={smily}
                                      className="w-6 "
                                      alt="none"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end mt-2">
                                  <div
                                    onClick={handleComment}
                                    className="bg-[#C31A7F] text-white cursor-pointer  px-[17px] py-[7px] rounded-xl"
                                  >
                                    Post
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex flex-row items-center gap-2">
                        <img
                          className="w-6 cursor-pointer"
                          src={Send}
                          alt="none"
                          onClick={toggleShareButton}
                        />
                        <p className="text-[12px] font-bold">
                          {homePostItems.share}
                        </p>
                      </div>
                      {shareButton && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                          <div className=" ">
                            <div className="lg:w-[500px]   w-[350px] bg-[#FFFFFF] flex flex-col gap-5 rounded-[20px]  ">
                              <div>
                                <div className="flex flex-row items-center justify-center relative pt-4 ">
                                  <h1 className="text-[16px] font-semibold">
                                    Share with your friends
                                  </h1>
                                  <div
                                    onClick={toggleShareButton}
                                    className="absolute right-3 cursor-pointer"
                                  >
                                    <IoMdClose />
                                  </div>
                                </div>
                                <div className=" relative p-4">
                                  <CiSearch
                                    size={20}
                                    className="absolute top-6 left-6 "
                                  />

                                  <input
                                    placeholder="Search Friends"
                                    className=" w-full h-9 outline-none rounded-[15px] px-10 placeholder:text-[12px] placeholder:font-semibold   bg-[#FEF8FD]  "
                                  />
                                </div>

                                <div className="flex flex-wrap gap-2 items-center justify-center  w-fit h-[50px]  px-3 overflow-y-scroll ">
                                  {checked.map((item,index) => (
                                    <div
                                      key={index}
                                      className={`h-8 w-36 flex items-center justify-center rounded-[15px] bg-[#c31a7f3c] relative  transition-opacity ease-in-out duration-300 mx-1 text-[12px] font-semibold ${isChecked(
                                        item
                                      )}`}
                                    >
                                      <div
                                        className="absolute -right-1 -top-1   bg-[#C31A7F] h-4 w-4 flex items-center justify-center rounded-full cursor-pointer"
                                        onClick={() => handleRemoveItem(item)}
                                      >
                                        <p className="text-[#FFFFFF] pb-0.5 text-[10px]">
                                          x
                                        </p>
                                      </div>
                                      {item.name}
                                    </div>
                                  ))}
                                </div>
                                <div className="h-[200px] overflow-y-scroll ">
                                  {checkList.map((item) => (
                                    <div
                                      key={item.id}
                                      className="flex py-3 px-3 flex-row items-center justify-between"
                                    >
                                      <div className="flex flex-row items-center gap-2 ">
                                        <img
                                          src={item.image}
                                          className="h-10 w-10 rounded-full"
                                          alt={item.name}
                                        />
                                        <div className="flex flex-col items-start gap-1  ">
                                          <span
                                            className={`${isChecked(
                                              item
                                            )} text-[14px] font-semibold`}
                                          >
                                            {item.name}
                                          </span>
                                          <span
                                            className={`${isChecked(
                                              item
                                            )} text-[10px] `}
                                          >
                                            {item.description}
                                          </span>
                                        </div>
                                      </div>
                                      <input
                                        className="accent-[#C31A7F] w-4 h-4 cursor-pointer"
                                        value={item}
                                        type="checkbox"
                                        checked={isChecked(item)}
                                        onChange={(event) =>
                                          handleCheck(event, item)
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full bg-[#FEF8FD] rounded-b-[20px]  ">
                                <div className="p-4 flex flex-row items-center ">
                                  <div className="flex flex-row gap-2 items-center w-full">
                                    <img
                                      className="h-7 w-7 rounded-full"
                                      src={account}
                                      alt="none"
                                    />
                                    <input
                                      type="text"
                                      placeholder="write here"
                                      className="bg-transparent w-full outline-none"
                                    />
                                  </div>
                                  <div>
                                    <CiFaceSmile />
                                  </div>
                                </div>
                                <div>
                                  <hr />
                                </div>
                                <div className="flex flex-row justify-between p-4">
                                  <div className="flex flex-row items-center gap-2">
                                    <BsLink45Deg color="#C31A7F" />
                                    <p className="text-[12px]   text-[#C31A7F] font-semibold">
                                      Copy NavLink
                                    </p>
                                  </div>
                                  <div className="w-16 h-7 flex items-center justify-center bg-[#efc419] text-[12px] font-semibold text-[#FFFFFF] rounded-[12px]">
                                    share
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="flex flex-row items-center gap-2 cursor-pointer"
                    onClick={() => savePost(homePostItems)}
                  >
                    {isSaved ? (
                      <div className="flex flex-row items-center gap-2 cursor-pointer">
                        <img src={saved} className="w-4" alt="none" />
                        <p className="text-[12px] font-bold">Saved</p>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center gap-2 cursor-pointer">
                        <img src={save} className="w-6" alt="none" />
                        <p className="text-[12px] font-bold">Save</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          
        </div>
      </TabPanel>
    </div>
  );
}

export default MyStory;

// MyStory.js

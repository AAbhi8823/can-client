import React, { useEffect, useRef, useState } from "react";
import VerticalAppointment from "../Components/VerticalAppointment";
import VerticalMedicine from "../Components/VerticalMedicine";
import premium from "../Photos/premium.png";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import SingleLineCalendar from "../Components/SingleLineCalender";
import VerticalSLC from "../Components/VericalSLC";
import FlippingImage from "../Components/FlipImage";
import FloatingChat from "../Components/FloatingChat";
import Page from "../Layouts/Pages";
import gallery from "../Photos/gallery.png";
import locationIcon from "../Photos/location.png";
import smily from "../Photos/smily.png";
import { IoMdClose } from "react-icons/io";
import Send from "../Photos/Send.png";
import commentIcon from "../Photos/commentIcon.png";
import save from "../Photos/save.png";
import saved from "../Photos/saved.png";
import { CiSearch } from "react-icons/ci";
import CreatePost from "../Components/CreatePost";
import { BsLink45Deg } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { BiCheckCircle } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import blockuser from "../Photos/blockuser.png";
import userIcon from "../Photos/userIcon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectLabels from "../Components/SelectLabels";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookie from "js-cookie";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import Cookies from "js-cookie";
import apis from "../Api/baseUrl";
import "./ContactUs.css";
import account from "../Photos/account.jpg";
import Slider from "react-slick";
const Home = () => {
  const base_token = Cookies.get("token");
  const emojiButtonRef = useRef(null);
  const pickerRef = useRef(null);
  const [createPost, setCreatePost] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const [reportButton, setReportButton] = useState(false);
  const [showlocation, setShowLacation] = useState(false);
  const [showgif, setShowgif] = useState(false);
  const [userBlock, setUserBlock] = useState(false);
  const [userBlocked, setUserBlocked] = useState(false);
  const [commentModel, setcommentModel] = useState([]);
  const [isCommentLoadin, setIsCommentLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const [singlePostId, setSinglePostId] = useState();
  const [isShared, setIsShared] = useState();
  const [threeDots, setThreeDots] = useState(false);
  const threeDotsOutClick = useRef(null);
  const [vertical, setVertical] = useState("Appointment");
  const [comVal, setComVal] = useState("");
  const [Loading, setLoading] = useState(true);
  const [myFriends, setMyFriends] = useState();
  const [homePost, sethomePost] = useState();
  const [isPosting, setIsPosting] = useState();
  const [isSaved, setIsSaved] = useState();
  const navigate = useNavigate();

  const GifImage = [
    { id: 1, image: "climberEverest.Webp" },
    { id: 2, image: "climberEverest.Webp" },
    { id: 3, image: "climberEverest.Webp" },
    { id: 4, image: "climberEverest.Webp" },
    { id: 5, image: "climberEverest.Webp" },
    { id: 6, image: "climberEverest.Webp" },
  ];

  const toggleBlockedTab = async (userID) => {
    console.log("postid1", userID);
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${baseurl}/user/block-user`,
        { user_id: userID },
        config
      );
      console.log("delete-story::>>", response);
      if (response) {
        console.log(response.data);
        setUserBlocked(!userBlocked);
        window.location.reload();
        
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBlockTab = () => {
    setUserBlock(!userBlock);
  };

  const toggleLocation = () => {
    setShowLacation(!showlocation);
  };

  const toggleGif = () => {
    setShowgif(!showgif);
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setInput(input + emoji);
  };

  const toggleShareButton = (postid) => {
    setShareButton(!shareButton);
    console.log("postshareid", postid);
    setSinglePostId(postid);
  };

  const sharePost = async (share_userid) => {
    setIsShared(true);
    const userid = localStorage.getItem("active_user");
    try {
      const data = await axios.post(`${baseurl}/api/sharepost`, {
        share_userid: share_userid,
        userid: userid,
        post_id: singlePostId,
      });
      if (data.data.status === true) {
        console.log("post shared");
      } else {
        console.log("api error or");
      }
    } catch (error) { }
    console.log(share_userid, singlePostId);
  };

  const handleComment = async (posiID) => {
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
      },
    };
    const body = {
      story_id: posiID,
      comment: comVal,
    };

    try {
      console.log("commentData:", posiID);
      const { data } = await axios.post(
        `${apis.GET_POST_COMMENT}`,
        body,
        config
      );
      // await getComment(posiID, commentImage);
      setShowContent(false);
      window.location.reload();
     
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleReadMore = () => {
    setShowFullContent(true);
  };

  const toggleReportButton = () => {
    setReportButton(!reportButton);
  };

  const likeButton = async (likeID) => {
    document.getElementById("likeButtonColorless").style.color = "red";
    console.log(likeID);
    const postID = likeID;
    const postToken = Cookie.get("token");

    try {
      const likeData = await axios.post(
        `${baseurl}/mystory/like-story`,
        {
          story_id: postID,
        },
        {
          headers: {
            Authorization: `Bearer ${postToken}`,
          },
        }
      );
      if (likeData) {
        setLikedPosts((prevLikedPosts) => ({
          ...prevLikedPosts,
          [likeID]: true,
        }));
        HomePost("new");
      } else {
        console.log("API error");
      }
      console.log("",likeData)
      console.log("likeData::>>",likeData)
      if (likeData?.data?.resData?.status === true) {
        toast.success(likeData?.data?.resData?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          className: "mt-[81px] ",
        });
        // setIsSaved(true);
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function open_post() {
    setCreatePost(true);
  }

  function threeDotsToggle(postId) {
    setThreeDots((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }

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
        console.log(userData.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    activeUser();
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
  }, []);

  const handlePickerFocus = () => {
    setShowEmoji(true);
  };

  const toggleVertical = (item) => {
    setVertical(item);
  };

  const postApidata = (postData) => {
    if (postData.data.msg === "post create successfully") {
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

  const HomePost = async (filter) => {
    try {
      const HomePosttoken = Cookie.get("token");
      const homePost = await axios.get(
        `${baseurl}/mystory/get-story-by-filter/${filter}`,
        {
          headers: {
            Authorization: `Bearer ${HomePosttoken}`,
          },
        }
      );
      console.log("homePost::>>>", homePost.data.resData.data);
      sethomePost(homePost.data.resData.data);
      setIsCommentLoading(!isCommentLoadin);
      console.log(homePost.data.resData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const friendList = async () => {
    const userid = localStorage.getItem("active_user");
    const token = Cookies.get("token");
    try {
      const data = await axios.post(
        `${baseurl}/api/fetchFriendList?token=${token}`,
        {
          userid: userid,
        }
      );
      if (data) {
        console.log("friend list", data.data);
        setMyFriends(data.data.data);
      } else {
        console.log("friend api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activeUser = localStorage.getItem("active_user");

  const handleComInput = (e) => {
    setComVal(e.target.value);
  };

  const handlePost = async () => {
    setIsPosting(true);
    const token = Cookie.get("token");
    const activeUser = localStorage.getItem("active_user");
    const formInfo = new FormData();
    formInfo.set("content", input);
    formInfo.set("userId", activeUser);

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

  const savePost = async (posiID) => {
    const postToken = Cookie.get("token");

    try {
      const saveThePost = await axios.post(
        `${baseurl}/mystory/add-save-story`,
        {
          story_id: posiID,
        },
        {
          headers: {
            Authorization: `Bearer ${postToken}`,
          },
        }
      );
      console.log("saveThePost::>>", saveThePost?.data?.resData?.status);
      if (saveThePost?.data?.resData?.status === true) {
        toast.success("Post Saved", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          className: "mt-[81px] ",
        });
        setIsSaved(true);
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/loginform");
    }
    getProfile();
    getPolldata();
    HomePost("new");
    friendList();
  }, []);

  const [userData, setUserData] = useState(null);

  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios(`${apis.GET_SINGLE_USER}`, config);
      console.log(
        "response:response " + JSON.stringify(response?.data?.resData?.data)
      );
      setUserData(response?.data?.resData?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("User:>>>>>", userData);

  const [commentImage, setCommentImage] = useState(null);

  const getComment = async (postID, postData) => {
    try {
      const HomePosttoken = Cookie.get("token");
      const homePost = await axios.post(
        `${baseurl}/comments/get-comments`,
        {
          story_id: postID,
        },
        {
          headers: {
            Authorization: `Bearer ${HomePosttoken}`,
          },
        }
      );
      console.log("Post:>><><><<>>>::>>", homePost);
      setShowContent(!showContent);
      setCommentImage(postData);
      
    } catch (error) {
      console.error(error);
    }
  };
  const deletePost = async (postid) => {
    console.log("postid1", postid);
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const data = await axios.delete(
        `${baseurl}/mystory/delete-story/${postid}`,
        config
      );
      console.log("delete-story::>>", data);
      if (data) {
        window.location.reload();
        console.log(data);
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterChange = (filterData) => {
    sethomePost(filterData);
    console.log("filterData:>>>>>", filterData);
  };
  const [reportReason, setReportReason] = useState("");
  const [showThanku, setShowThanku] = useState(false);

  const handleReportClick = async (postId, reason) => {
    setReportReason(reason);
    const HomePosttoken = Cookie.get("token");
    try {
      const response = await axios.post(
        `${baseurl}/report`,
        {
          post_id: postId,
          reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${HomePosttoken}`,
          },
        }
      );

      if (response.status === 200) {
        setShowThanku(true);
      } else {
        // Handle error here if needed
        console.error("Error reporting the post:", response.data);
      }
    } catch (error) {
      console.error("Error reporting the post:", error);
    }
  };
  const toggleThanku = () => {
    setShowThanku(!showThanku);
    toggleReportButton();
  };
  const [pollList, setPollList] = useState([]);
  const getPolldata = async () => {
    const info = {
      headers: {
        Authorization: `bearer ${base_token}`,
      },
    };
    try {
      const responce = await axios.get(`${baseurl}/poll/get-poll-list`, info);
      console.log("Response:>>", responce?.data?.resData?.data);
      setPollList(responce?.data?.resData?.data);
    } catch (errors) {
      console.error("Error getting");
    }
  };

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: false, // Disable default dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const getDotIndex = (slideIndex) => {
    const totalSlides = pollList.length;
    const slidesPerGroup = Math.ceil(totalSlides / 3);
    return Math.floor(slideIndex / slidesPerGroup);
  };

  const handleDotClick = (dotIdx) => {
    const slidesPerGroup = Math.ceil(pollList.length / 3);
    const targetSlide = dotIdx * slidesPerGroup;
    sliderRef.current.slickGoTo(targetSlide);
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };
  const [pollData, setPollData] = useState(pollList);

  const handleOptionClick = async (time, option) => {
    console.log("handle::>>>>",time,option);
    try {
      const response = await axios.post(`${baseurl}/poll/add-vote`, {
        poll_id: option,
        option_id: time
      }, {
        headers: {
          Authorization: `Bearer ${base_token}`
        }
      });

      const updatedPoll = response.data;
      const updatedPollData = pollData.map(poll => 
        poll.id === updatedPoll.id ? updatedPoll : poll
      );
      setPollData(updatedPollData);
    } catch (error) {
      console.error('Error updating poll option:', error);
    }
  };

  return (
    <Page
      pageContent={
        <>
          <ToastContainer />
          <div className=" h-[100%] y-scrl ">
            <div className=" lg:flex">
              <div className="bg-[#FEF8FD] lg:px-0 px-2 lg:px-10 w-[100%] flex flex-wrap justify-around">
                {/* post */}
                <div className="flex flex-col  ml-0  w-full  lg:w-[55%] ">
                  {createPost ? (
                    <CreatePost
                      close_createPost={() => setCreatePost(false)}
                      getPostData={postApidata}
                    />
                  ) : (
                    <div
                      className="bg-white pb-3  mt-8 rounded-[30px] border-[1px] border-solid border-[#D9EAFF] "
                      style={{
                        boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div className="flex px-10 pt-8 gap-3">
                        <img
                          src={userData?.profile_image}
                          alt="none"
                          className="rounded-full w-12 "
                        />
                        {console.log("comment:>>>>", userData)}
                        <input
                          value={input}
                          onChange={handleInput}
                          placeholder="Write here...."
                          className="w-full outline-none text-[20px ]"
                        />
                      </div>
                      <div className="pt-8 px-10">
                        <hr />
                      </div>
                      <div className="flex flex-row pt-4 px-10 justify-between relative">
                        <div className="flex flex-row gap-5 items-center relative">
                          <Tooltip title="Post">
                            <img
                              src={gallery}
                              className="w-5 opacity-50 cursor-pointer"
                              alt="none"
                              onClick={open_post}
                            />
                          </Tooltip>

                          <Tooltip title="Location">
                            <img
                              src={locationIcon}
                              className="w-5 opacity-50 cursor-pointer"
                              alt="none"
                              onClick={toggleLocation}
                            />
                          </Tooltip>

                          <Tooltip title="Emoji">
                            <img
                              src={smily}
                              className="w-5 opacity-50 cursor-pointer hover:text-slate-300 "
                              alt="none"
                              onClick={() => setShowEmoji(!showEmoji)}
                            />
                          </Tooltip>

                          {showgif && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-4">
                              <div className="w-[500px] h-[500px] bg-[#FFFFFF] flex flex-col  rounded-[30px] relative">
                                <div className="flex items-center justify-center relative py-7 ">
                                  <h1 className="text-[18px] font-semibold">
                                    Choose a GIF
                                  </h1>
                                  <div className="absolute right-6 top-9 ">
                                    <IoMdClose onClick={toggleGif} />
                                  </div>
                                </div>

                                <div className=" relative p-4">
                                  <CiSearch
                                    size={20}
                                    className="absolute top-6 left-6 "
                                  />

                                  <input
                                    placeholder="Search GIF"
                                    className=" w-full h-9 outline-none rounded-[15px] px-10 placeholder:text-[12px] placeholder:font-semibold   bg-[#FEF8FD]  "
                                  />
                                </div>

                                <div className="flex items-center overflow-y-scroll justify-evenly   flex-wrap">
                                  {GifImage.map((item) => (
                                    <div className="pt-6" key={item.id}>
                                      <img
                                        className="md:h-[150px] md:w-[220px] h-[120px] w-[150px] rounded-[30px]"
                                        src={item.image}
                                        alt="none"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {showlocation && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                              <div className="lg:w-[500px] lg:h-[500px] w-[350px] h-[500px] bg-[#FFFFFF] flex flex-col  rounded-[30px] relative">
                                <div className="flex flex-row items-center gap-14 lg:gap-32  justify-evenly p-5">
                                  <BiArrowBack onClick={toggleLocation} />
                                  <h1 className="text-[18px] font-semibold">
                                    Search For Location
                                  </h1>
                                  <IoMdClose onClick={toggleLocation} />
                                </div>
                                <div className=" relative p-4">
                                  <CiSearch
                                    size={20}
                                    className="absolute top-6 left-6 "
                                  />

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
                                    <p className="text-[14px] font-semibold">
                                      India
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row items-center gap-3 p-3">
                                  <div className="bg-[#FEF8FD] w-8 h-8 rounded-full flex items-center justify-center ">
                                    <GrLocation />
                                  </div>
                                  <div>
                                    <p className="text-[14px] font-semibold">
                                      Delhi ,India
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row items-center gap-3 p-3">
                                  <div className="bg-[#FEF8FD] w-8 h-8 rounded-full flex items-center justify-center ">
                                    <GrLocation />
                                  </div>
                                  <div>
                                    <p className="text-[14px] font-semibold">
                                      Mumbai
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div
                          className={`${input
                              ? "bg-[#C31A7F]  text-white p-1 py-2  px-8 rounded-xl  cursor-pointer"
                              : "bg-[#C31A7F] opacity-60 text-white p-1 py-2 px-8  rounded-xl"
                            }`}
                          onClick={handlePost}
                        >
                          {isPosting ? "Posting..." : "Post"}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="text-end"> </div>
                  <div className="text-end space-x-5 mt-2">
                    <SelectLabels onFilterChange={handleFilterChange} />
                  </div>

                  {Loading ? (
                    <>
                      <div
                        className=" lg:p-7 p-4 mt-1 mb-3 shrink-0 bg-[#C31A7F] bg-white rounded-[30px] border-[1px] w-[100%] "
                        style={{
                          boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
                        }}
                      >
                        <div className=" flex items-center gap-2">
                          <Skeleton
                            animation="wave"
                            variant="circular"
                            width={40}
                            height={40}
                          />
                          <div className="w-full">
                            <div>
                              <div className="">
                                <Skeleton
                                  animation="wave"
                                  height={20}
                                  width="80%"
                                  style={{ marginBottom: 6 }}
                                />
                              </div>
                              <div className="">
                                <p className="text-[12px] font-semibold text-[#C31A7F]">
                                  <Skeleton
                                    animation="wave"
                                    height={20}
                                    width="40%"
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-3 ">
                          <Skeleton
                            sx={{ height: 290 }}
                            animation="wave"
                            variant="rectangular"
                          />
                        </div>
                        <div className=" pt-7 ">
                          <Skeleton sx={{ width: "80%" }} />
                          <Skeleton animation="wave" height={20} width="40%" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {homePost?.map((homePostItems, index) => {
                        const createdAt = new Date(homePostItems?.createdAt);
                        const userID = "6655c2e56b00a7357ff66ad3";
                        console.log("Created::>>>>>>", userID);
                        const formattedDate = createdAt.toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          }
                        );
                        return (
                          <div
                            key={index}
                            className=" lg:p-7 p-4 mt-1  md-w-[100%] mb-3 shrink-0 bg-[#C31A7F] bg-white rounded-[30px] border-[1px]"
                            style={{
                              boxShadow:
                                "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
                            }}
                          >
                            {console.log(
                              "userid::>>>>>>>",
                              homePostItems?.user_id?._id
                            )}
                            <div className=" flex items-center gap-2">
                              <FlippingImage
                                data={homePostItems?.user_id?.profile_image}
                              />
                              <div className="flex  w-full items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h1 className="font-semibold">
                                      {homePostItems?.user_id?.full_name}
                                    </h1>
                                    <p className="text-xs text-[#7E7E7E]">
                                      {formattedDate}
                                    </p>
                                  </div>
                                  <div className="flex flex-row items-center gap-2">
                                    <p className="text-[12px] font-semibold   text-[#C31A7F]">
                                      {homePostItems?.user_id?.user_profile}
                                    </p>
                                    <p className="text-[12px] font-semibold   text-[#C31A7F]">
                                      {homePostItems?.user_id?.CANID}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex  items-center justify-between relative  pb-6">
                                  <div className="flex flex-row items-center ">
                                    <BsThreeDots
                                      className="cursor-pointer"
                                      onClick={() =>
                                        threeDotsToggle(homePostItems?._id)
                                      }
                                    />
                                  </div>
                                  {console.log(
                                    "homePostItems:>>>",
                                    homePostItems
                                  )}
                                  {threeDots[homePostItems?._id] && (
                                    <div
                                      className=" w-max h-max bg-white  shadow-2xl absolute top-0 right-7 pt-2 pb-2"
                                      ref={threeDotsOutClick}
                                    >
                                      {homePostItems?.user_id?._id ===
                                        userData?._id ? (
                                        // If the user is the self user, show the delete option
                                        <p
                                          className="p-2 px-4 cursor-pointer hover:bg-[#C31A7F] hover:text-[#fff] "
                                          onClick={() =>
                                            deletePost(homePostItems?._id)
                                          }
                                        >
                                          Delete Post
                                        </p>
                                      ) : (
                                        // If the user is not the self user, show the three options
                                        <>
                                          <p
                                            className="p-2 px-4 cursor-pointer hover:bg-[#C31A7F] hover:text-[#fff] "
                                            onClick={toggleBlockTab}
                                          >
                                            Block{" "}
                                            {homePostItems?.user_id?.full_name}
                                          </p>
                                          {userBlock && (
                                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
                                              <div className=" bg-[#FFFFFF] flex flex-col items-center py-10 gap-6 rounded-[30px] px-16 ">
                                                <div>
                                                  <img
                                                    className="w-14"
                                                    src={blockuser}
                                                    alt="none"
                                                  />
                                                </div>
                                                <div className="flex flex-col items-center gap-3">
                                                  <h1 className="  text-[#C31A7F]  text-[18px] font-semibold">
                                                    Block{" "}
                                                    {
                                                      homePostItems?.user_id
                                                        ?.full_name
                                                    }
                                                  </h1>
                                                  <p className="text-[14px] text-[#7E7E7E] font-semibold">
                                                    Do you really want to block
                                                    this user?
                                                  </p>
                                                </div>
                                                <div className="flex flex-row items-center gap-5">
                                                  <p
                                                    className="w-20 rounded-lg h-9 bg-transparent border-[#7E7E7E] border-2 flex items-center justify-center text-[14px] text-[#7E7E7E] font-semibold"
                                                    onClick={toggleBlockTab}
                                                  >
                                                    Cancel
                                                  </p>
                                                  <p
                                                    className="w-20 rounded-lg h-9 bg-[#C31A7F] text-[#FFFFFF] flex items-center justify-center text-[14px] font-semibold"
                                                    onClick={() => {
                                                      toggleBlockedTab(
                                                        homePostItems?.user_id
                                                          ?._id
                                                      );
                                                    }}
                                                  >
                                                    Block
                                                  </p>
                                                  {userBlocked && (
                                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
                                                      <div
                                                        className="bg-[#FFFFFF] flex flex-col items-center py-11 gap-7 rounded-[30px] px-32 relative "
                                                        ref={threeDotsOutClick}
                                                      >
                                                        <div className="absolute right-6 top-6  cursor-pointer">
                                                          <IoMdClose
                                                            size={18}
                                                            onClick={
                                                              toggleBlockedTab
                                                            }
                                                          />
                                                        </div>
                                                        <div>
                                                          <img
                                                            className="w-28"
                                                            src={
                                                              homePostItems
                                                                ?.user_id
                                                                ?.profile_image
                                                            }
                                                            alt="none"
                                                          />
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1">
                                                          <h1 className="  text-[#C31A7F] text-[18px] font-semibold">
                                                            {
                                                              homePostItems
                                                                ?.user_id
                                                                ?.full_name
                                                            }
                                                          </h1>
                                                          <p className="text-[14px] text-[#7E7E7E] font-semibold">
                                                            Has been Blocked
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          {/* <NavLink
                                            to={{
                                              pathname: "/profile",
                                              value: { userID },
                                            }}
                                          >
                                            <p className="p-2 px-4 cursor-pointer hover:text-[#fff]  hover:bg-[#C31A7F]">
                                              About this account
                                            </p>
                                          </NavLink> */}
                                          <p
                                            className="p-2 px-4 cursor-pointer hover:text-[#fff] hover:bg-[#C31A7F]"
                                            onClick={toggleReportButton}
                                          >
                                            Report{" "}
                                            {homePostItems?.user_id?.full_name}
                                          </p>
                                          {reportButton && (
                                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
                                              <div className="w-[500px] bg-[#FFFFFF] flex flex-col p-7 gap-3 rounded-[30px] relative">
                                                <h1 className="text-[18px] font-semibold">
                                                  Report
                                                </h1>
                                                <div className="absolute right-6 top-6 cursor-pointer">
                                                  <IoMdClose
                                                    size={18}
                                                    onClick={toggleReportButton}
                                                  />
                                                </div>
                                                <div>
                                                  <hr />
                                                </div>
                                                <div className="flex items-start text-[18px] font-semibold">
                                                  <p>
                                                    Why are you reporting this
                                                    post?
                                                  </p>
                                                </div>
                                                <div>
                                                  <hr />
                                                </div>
                                                <div className="flex items-center justify-between text-center">
                                                  <p className="text-[14px] font-semibold">
                                                    It's a spam
                                                  </p>
                                                  <HiOutlineChevronRight
                                                    className="cursor-pointer"
                                                    color="#7E7E7E"
                                                    onClick={() =>
                                                      handleReportClick(
                                                        "It's a spam"
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <hr />
                                                </div>
                                                <div className="flex items-center justify-between text-center">
                                                  <p className="text-[14px] font-semibold">
                                                    Hate speech or symbols
                                                  </p>
                                                  <HiOutlineChevronRight
                                                    className="cursor-pointer"
                                                    color="#7E7E7E"
                                                    onClick={() =>
                                                      handleReportClick(
                                                        "Hate speech or symbols"
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <hr />
                                                </div>
                                                <div className="flex items-center justify-between text-center">
                                                  <p className="text-[14px] font-semibold">
                                                    Violence or dangerous
                                                    organization
                                                  </p>
                                                  <HiOutlineChevronRight
                                                    className="cursor-pointer"
                                                    color="#7E7E7E"
                                                    onClick={() =>
                                                      handleReportClick(
                                                        "Violence or dangerous organization"
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <hr />
                                                </div>
                                                <div className="flex items-center justify-between text-center">
                                                  <p className="text-[14px] font-semibold">
                                                    False information
                                                  </p>
                                                  <HiOutlineChevronRight
                                                    className="cursor-pointer"
                                                    color="#7E7E7E"
                                                    onClick={() =>
                                                      handleReportClick(
                                                        "False information"
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <hr />
                                                </div>
                                                <div className="flex items-center justify-between text-center">
                                                  <p className="text-[14px] font-semibold">
                                                    I just don't like it
                                                  </p>
                                                  <HiOutlineChevronRight
                                                    className="cursor-pointer"
                                                    color="#7E7E7E"
                                                    onClick={() =>
                                                      handleReportClick(
                                                        "I just don't like it"
                                                      )
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          {showThanku && (
                                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
                                              <div className="w-[430px] bg-[#FFFFFF] flex flex-col items-center p-14 gap-7 rounded-[30px]">
                                                <div>
                                                  <BiCheckCircle
                                                    color="#C31A7F"
                                                    size={75}
                                                  />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                  <h1 className="text-[18px] font-semibold">
                                                    Thanks for letting us know
                                                  </h1>
                                                  <p className="text-[14px] text-[#7E7E7E] font-semibold">
                                                    Your feedback is important
                                                    in helping us keep the CAN
                                                    community safe
                                                  </p>
                                                </div>
                                                <div
                                                  className="w-40 h-9 flex items-center justify-center rounded-[10px] bg-[#C31A7F] "
                                                  onClick={toggleThanku}
                                                >
                                                  <p className="text-[#FFFFFF] text-[13px] font-semibold cursor-pointer">
                                                    Close
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="pt-5">
                              <p className="py-2 text-[#484848] text-[13px] text-left md:shrink-0 md:text-left md:text-[14px] ">
                                {!showFullContent ? (
                                  <>
                                    {homePostItems.post_title?.length <= 250 ? (
                                      homePostItems.post_title
                                    ) : (
                                      <>
                                        {homePostItems.post_title?.slice(
                                          0,
                                          250
                                        )}
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
                              {homePostItems?.media_files ? (
                                <div className="rounded-3xl w-full overflow-hidden h-[40vh]">
                                  <img
                                    src={homePostItems.media_files}
                                    className="w-full h-full object-contain"
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
                                  {homePostItems.likes.length > 0 ? (
                                    homePostItems.likes.some(
                                      (like) => like.userId === activeUser
                                    ) ? (
                                      <AiFillHeart
                                        className="cursor-pointer"
                                        size={24}
                                        color="red"
                                      />
                                    ) : likedPosts[homePostItems._id] ? (
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
                                    )
                                  ) : likedPosts[homePostItems._id] ? (
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
                                  <p className="text-[12px] font-bold">
                                    {console.log(
                                      "homePostItems::>>",
                                      homePostItems.likes.length
                                    )}
                                    {homePostItems.likes.length}
                                  </p>
                                </div>

                                <div>
                                  <div className="flex flex-row items-center gap-2">
                                    <img
                                      src={commentIcon}
                                      className="w-6 cursor-pointer"
                                      alt="none"
                                      onClick={() =>
                                        getComment(
                                          homePostItems._id,
                                          homePostItems
                                        )
                                      }
                                    />
                                    <p className="text-[12px] font-bold">
                                      {homePostItems?.comments?.length}
                                    </p>
                                  </div>

                                  {showContent && (
                                    <div
                                      className="h-model fixed inset-0 flex items-center justify-center bg-cover bg-center z-50 "
                                      style={{
                                        backgroundColor: "rgb(46 46 46 / 30%)",
                                      }}
                                    >
                                      <div className="hmodel-box w-[95%] lg:w-[70%] lg:h-[70%] bg-[#FDF4F9] rounded-3xl flex flex-col lg:flex lg:flex-row overflow-auto">
                                        <div className="lg:w-[60%]">
                                          <img
                                            src={commentImage?.media_files[0]}
                                            alt="none"
                                            className="object-cover w-full h-full"
                                          />
                                        </div>
                                        <div className="mcont-box lg:w-[40%] flex flex-col justify-between p-4 relative">
                                          <div
                                            className="comment-box pb-[10px]"
                                            style={{
                                              height: "100%",
                                              overflowY: "scroll",
                                            }}
                                          >
                                            <div className="flex h-max items-center gap-2">
                                              <div className="rounded-full overflow-hidden h-max w-[20%]">
                                                {commentImage?.user_id
                                                  ?.profile_image ? (
                                                  <img
                                                    src={
                                                      commentImage?.user_id
                                                        ?.profile_image
                                                    }
                                                    alt="User Profile"
                                                    className="w-[45px] h-[45px]"
                                                    style={{
                                                      borderRadius: "50%",
                                                      objectFit: "cover",
                                                    }}
                                                  />
                                                ) : (
                                                  <img
                                                    src={blockuser}
                                                    alt="Fallback User Profile"
                                                    className="rounded-full"
                                                  />
                                                )}
                                              </div>
                                              <div className="flex flex-col w-full">
                                                <div className="flex flex-row items-center justify-between w-full">
                                                  <div className="flex flex-row gap-2 items-center">
                                                    <h1 className="font-semibold">
                                                      {
                                                        commentImage?.user_id
                                                          ?.CANID
                                                      }
                                                    </h1>
                                                    <p className="text-xs text-[#7E7E7E]">
                                                      {commentImage?.createdAt}
                                                    </p>
                                                  </div>
                                                  <div
                                                    className="cursor-pointer absolute right-8 top- lg:right- lg:"
                                                    onClick={() =>
                                                      setShowContent(false)
                                                    }
                                                  >
                                                    <IoMdClose className="lg:text-[#000]" />
                                                  </div>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                  <h1 className="text-xs font-semibold text-[#C31A7F]">
                                                    {
                                                      commentImage?.user_id
                                                        ?.user_profile
                                                    }
                                                  </h1>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="text-[16px] py-[15px]"
                                              style={{
                                                borderBottom:
                                                  "1px solid rgba(128, 128, 128, 0.24)",
                                              }}
                                            >
                                              {commentImage?.post_title}
                                            </div>
                                            {commentImage?.comments?.length >
                                              0 ? (
                                              commentImage.comments.map(
                                                (comment) => (
                                                  <div
                                                    className="mt-[15px] flex items-center"
                                                    style={{
                                                      // backgroundColor:
                                                      //   "#f9f9f9",
                                                      padding: "5px",
                                                      borderRadius: "10px",
                                                      boxShadow:
                                                        "2px 2px 15px #8080802b",
                                                    }}
                                                    key={comment._id}
                                                  >
                                                    {console.log(
                                                      "comment:>>",
                                                      comment
                                                    )}
                                                    <div className="mr-[10px] overflow-hidden">
                                                      <img
                                                        className="w-[45px] h-[40px]"
                                                        style={{
                                                          borderRadius: "50%",
                                                          objectFit: "cover",
                                                        }}
                                                        src={
                                                          comment?.profile_image
                                                        }
                                                        alt="none"
                                                      />
                                                    </div>
                                                    <div className="w-full">
                                                      <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                          <h1 className="font-semibold">
                                                            {comment?.CANID}
                                                          </h1>
                                                          <p className="text-xs text-[#C31A7F]">
                                                            Cancer Fighter
                                                          </p>
                                                          <p className="text-xs items-center">
                                                            <AiOutlineHeart />
                                                          </p>
                                                        </div>
                                                        <div className="text-xs text-[#7E7E7E]">
                                                          {comment.createdAt}
                                                        </div>
                                                      </div>
                                                      <div className="text-sm">
                                                        {comment.comment}
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                              )
                                            ) : (
                                              <div>No comments</div>
                                            )}
                                          </div>
                                          <div
                                            className="bottom-4"
                                            style={{
                                              padding: "15px 12px",
                                              border: "1px solid #8080803d",
                                              backgroundColor: "#fff",
                                              borderRadius: "10px",
                                            }}
                                          >
                                            <div className="flex gap-3 w-full bg-transparent">
                                              <img
                                                src={
                                                  userData?.profile_image
                                                }
                                                alt="none"
                                                className="w-[55px] h-[45px] shadow-md"
                                                style={{
                                                  borderRadius: "50%",
                                                  objectFit: "cover",
                                                }}
                                              />
                                              <input
                                                placeholder="Write here..."
                                                onChange={handleComInput}
                                                className="outline-none w-full bg-transparent"
                                              />
                                              <div className="flex-col cursor-pointer items-end flex justify-center">
                                                <img
                                                  src={smily}
                                                  className="w-6"
                                                  alt="none"
                                                />
                                              </div>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                              <div
                                                onClick={() =>
                                                  handleComment(
                                                    commentImage._id
                                                  )
                                                }
                                                className="bg-[#C31A7F] text-white cursor-pointer px-[17px] py-[7px] rounded-xl"
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
                                      onClick={() =>
                                        toggleShareButton(homePostItems._id)
                                      }
                                    />
                                    <p className="text-[12px] font-bold">
                                      {homePostItems.share}
                                    </p>
                                  </div>
                                  {shareButton && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-[#0000000a] z-50">
                                      <div>
                                        <div className="lg:w-[500px] w-[350px] bg-[#FFFFFF] flex flex-col gap-5 rounded-[20px]">
                                          <div>
                                            <div className="flex flex-row items-center justify-center relative pt-4">
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

                                            <div className="h-[200px] overflow-y-scroll">
                                              {myFriends &&
                                                myFriends.map((item) => (
                                                  <div
                                                    key={item.id}
                                                    className="flex py-3 px-3 flex-row items-center justify-between"
                                                  >
                                                    <div className="flex flex-row items-center gap-2">
                                                      <img
                                                        src={
                                                          item.friend
                                                            .profile_photo
                                                        }
                                                        className="h-10 w-10 rounded-full"
                                                        alt=""
                                                      />
                                                      <div className="flex flex-col items-start gap-1">
                                                        <span
                                                          className={`text-[14px] font-semibold`}
                                                        >
                                                          {item.friend.username}
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <h1
                                                      className="accent-[#C31A7F] w-4 h-4 cursor-pointer"
                                                      onClick={() =>
                                                        sharePost(
                                                          item.friend._id,
                                                          commentModel._id
                                                        )
                                                      }
                                                    >
                                                      {isShared ? (
                                                        <FaLocationArrow
                                                          size={16}
                                                          color="black"
                                                          className="cursor-pointer"
                                                        />
                                                      ) : (
                                                        <FaLocationArrow
                                                          size={16}
                                                          color="red"
                                                          className="cursor-pointer"
                                                        />
                                                      )}
                                                    </h1>
                                                  </div>
                                                ))}
                                            </div>
                                          </div>

                                          <div className="w-full bg-[#FEF8FD] rounded-b-[20px]">
                                            <div>
                                              <hr />
                                            </div>
                                            <div className="flex flex-row justify-between p-4">
                                              <div
                                                className="flex flex-row items-center gap-2 cursor-pointer"
                                                onClick={() => {
                                                  const postUrl = `${window.location.origin}/post/${commentModel._id}`;
                                                  navigator.clipboard.writeText(
                                                    postUrl
                                                  );
                                                  alert(
                                                    "URL copied to clipboard"
                                                  );
                                                }}
                                              >
                                                <BsLink45Deg color="#C31A7F" />
                                                <p className="text-[12px] text-[#C31A7F] font-semibold">
                                                  Copy NavLink
                                                </p>
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
                                    <imgz
                                      src={saved}
                                      className="w-4"
                                      alt="none"
                                    />
                                    <p className="text-[12px] font-bold">
                                      Saved
                                    </p>
                                  </div>
                                ) : (
                                  <div className="flex flex-row items-center gap-2 cursor-pointer">
                                    <img
                                      src={save}
                                      className="w-6"
                                      alt="none"
                                    />
                                    <p className="text-[12px] font-bold">
                                      Save
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className="ris-home lg:flex  lg:flex-col lg:gap-4 lg:items-center   w-full  lg:w-[40%] xl:w-[30%] ">
                  <div className="mt-8 p-5 pb-4 rounded-[30px] w-[100%] bg-[#FFFFFF] border-[0.5px] border-[#C31A7F33]">
                    <p className="flex flex-wrap text-center text-[17px]">
                      What time is best suited for you to join the meeting?
                    </p>
                    <div className="flex flex-col gap-4">
                      <Slider ref={sliderRef} {...sliderSettings}>
                        {pollList.map((time, index) => (
                          <div
                            key={index}
                            className="slider-box flex flex-row items-center justify-center gap-3 pt-3"
                          > {console.log("Time::>>>>>>>",time)}
                            {time.poll_options.map((option, idx) => (
                              <div
                                key={idx}
                                className={`w-24 h-9 cursor-pointer flex flex-column items-center justify-center rounded-[15px] ${
                                  option.selected
                                    ? "bg-[#C31A7F] text-[#FFFFFF]"
                                    : "bg-[#FFFFFF] text-[#C31A7F] border-[1px] border-[#C31A7F]"
                                }`}
                                style={{ fontSize: "10px" }}
                                onClick={() => handleOptionClick(time?._id, option?._id)}
                                
                              >
                                {console.log("Time::>>>>>>>1",option)}
                                <p>{option.option}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </Slider>
                      <div className="flex justify-between items-center mt-4">
                        <button
                          className="text-[#C31A7F] border border-[#C31A7F] rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={handlePrevClick}
                        >
                          &lt;
                        </button>
                        <div className="flex flex-row items-center justify-center gap-3">
                          {[0, 1, 2].map((dotIdx) => (
                            <div
                              key={dotIdx}
                              className={`w-2 h-2 rounded-full cursor-pointer ${getDotIndex(currentSlide) === dotIdx
                                  ? "bg-[#C31A7F]"
                                  : "bg-[#E7E7E7]"
                                }`}
                              onClick={() => handleDotClick(dotIdx)}
                            ></div>
                          ))}
                        </div>
                        <button
                          className="text-[#C31A7F] border border-[#C31A7F] rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={handleNextClick}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%]   mt-3  relative">
                    <div>
                      <div
                        className="bg-gradient-to-r from-[#D4F1FF] to-[#FFFFFF] w-full rounded-[30px] py-[20px] px-[15px] border-[1px] border-solid border-[#D9EAFF]   "
                        style={{
                          boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <div className="flex justify-center">
                          <img
                            src={premium}
                            className="h-[80px] w-[40px]"
                            alt="none"
                          />
                        </div>

                        <div className="text-center text-[20px]">
                          <h1>
                            Help{" "}
                            <span className="text-[#C31A7F] font-[600]">
                              CAN
                            </span>{" "}
                            grow more{" "}
                          </h1>
                        </div>
                        <div className="text-xs py-[15px] text-center">
                          <p>
                            By contributing you’ll be helping this platform to
                            grow more and reach out to all those who are in need
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <NavLink to="/Subscription_Models">
                            <button className="bg-gradient-to-r mt-[10px] font-[500] from-[#efc41955] p-[15px] to-[#ed839a54] rounded-2xl">
                              Donate us
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className=" w-[100%] p-6 px-0 bg-white max-h-screen relative mt-3  rounded-[30px]  overflow-hidden border-[1px] border-solid border-[#D9EAFF]  "
                    style={{
                      boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                    }}
                  >

                    <div className=" text-[14px]  flex flex-row items-center justify-center gap-6">
                      <h1
                        onClick={() => toggleVertical("Appointment")}
                        className={
                          vertical === "Appointment"
                            ? "text-black font-semibold transition-all duration-300"
                            : "text-[#C4C4C4] font-semibold cursor-pointer"
                        }
                      >
                        Appointment
                      </h1>
                      <h1
                        onClick={() => toggleVertical("Medicines")}
                        className={
                          vertical === "Medicines"
                            ? "text-black font-semibold transition-all duration-300"
                            : "text-[#C4C4C4] font-semibold cursor-pointer"
                        }
                      >
                        Medicines
                      </h1>
                    </div>
                    <div className="">
                      <div className="flex flex-col">
                       
                        {vertical === "Appointment" && (
                          <div className="w-full mt-4">
                            <VerticalAppointment />
                          </div>
                        )}
                        {vertical === "Medicines" && (
                          <div className="w-full mt-4">
                            <VerticalMedicine />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FloatingChat />
            {showEmoji && (
              <div
                className="absolute top-52 left-3 lg:top-56 lg:left-96"
                ref={pickerRef}
                style={{ zIndex: "26" }}
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
          </div>
        </>
      }
    />
  );
};

export default Home;

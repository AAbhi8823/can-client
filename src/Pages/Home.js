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
const Home = () => {
  const emojiButtonRef = useRef(null);
  const pickerRef = useRef(null);
  const [heart1, setHeart1] = useState();
  const [createPost, setCreatePost] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
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
  const [userBlocked, setUserBlocked] = useState(false);
  const [commentModel, setcommentModel] = useState([]);
  const [postCommentModel, setPostCommentModel] = useState();
  const [isCommentLoadin, setIsCommentLoading] = useState();
  const [commentLikeCount, setCommentLikeCount] = useState();
  const [LikeID, setLikeID] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [singlePostId, setSinglePostId] = useState();
  const [isShared, setIsShared] = useState();
  const [threeDots, setThreeDots] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const threeDotsOutClick = useRef(null);
  const [vertical, setVertical] = useState("Upcoming");
  const [comVal, setComVal] = useState();
  const [Loading, setLoading] = useState(true);
  const [filter, setfilter] = useState("new");
  const location = useLocation();
  const querysearch = new URLSearchParams(location.search);
  const varFilter = querysearch.get("filter");
  const [myFriends, setMyFriends] = useState();
  const [reloadFlag, setReloadFlag] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);
  const [isCommenting, setIsCommenting] = useState();
  const [homePost, sethomePost] = useState();
  const [page, setPage] = useState(1);
  const [alresdyLiked, setAlreadyLiked] = useState(false);
  const [isPosting, setIsPosting] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [isSaved, setIsSaved] = useState();
  const [isCommentLiked, setCommentLiked] = useState(false);
  const [likeNumber,setLikenumber]=useState(0);
  const navigate = useNavigate();

  const GifImage = [
    { id: 1, image: "climberEverest.Webp" },
    { id: 2, image: "climberEverest.Webp" },
    { id: 3, image: "climberEverest.Webp" },
    { id: 4, image: "climberEverest.Webp" },
    { id: 5, image: "climberEverest.Webp" },
    { id: 6, image: "climberEverest.Webp" },
  ];

  const toggleBlockedTab = () => {
    setUserBlocked(!userBlocked);
  };

  // block user
  const toggleBlockTab = () => {
    setUserBlock(!userBlock);
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
      // setChecked([...checked, item]);
      console.log(item);
    } else {
      setChecked(checked.filter((checkedItem) => checkedItem.id !== item.id));
    }
  };

  const handleRemoveItem = (item) => {
    setChecked(checked.filter((checkedItem) => checkedItem.id !== item.id));
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
    } catch (error) {}
    console.log(share_userid, singlePostId);
  };

  const toggleContent = async (commentItem) => {
    setIsCommentLoading(true);
    const post_id = commentItem._id;
    const posttoken = Cookie.get("token");
    setShowContent(!showContent);
    setcommentModel(commentItem);
    console.log("coment", commentItem);
    try {
      const singlePostCommentData = await axios.post(
        `${baseurl}/api/get-comment?token=${posttoken}`,
        {
          post_id: `${post_id}`,
        }
      );
      if (singlePostCommentData) {
        setIsCommentLoading(false);
        setPostCommentModel(singlePostCommentData.data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleContent2 = async (commentItem) => {
    setIsCommentLoading(true);
    const post_id = commentItem._id;
    const posttoken = Cookie.get("token");
    setcommentModel(commentItem);
    console.log("coment", commentItem);
    try {
      const singlePostCommentData = await axios.post(
        `${baseurl}/api/get-comment?token=${posttoken}`,
        {
          post_id: `${post_id}`,
        }
      );
      if (singlePostCommentData) {
        setIsCommentLoading(false);
        setPostCommentModel(singlePostCommentData.data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
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

  const togglethanku = () => {
    setThanku(!showThanku);
  };

  const likeButton = async (likeID) => {
    document.getElementById("likeButtonColorless").style.color = "red";
    console.log(likeID);
    const postID = likeID; // Renamed Postid to postID for consistency
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
            HomePost();
        } else {
            console.log("API error");
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

  const handleClickOutsidethreeDots = (event) => {
    if (
      threeDotsOutClick.current &&
      !threeDotsOutClick.current.contains(event.target)
    ) {
      setThreeDots(false);
    }
  };

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
        setUserDetails(userData.data.data);
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

  const HomePost = async () => {
    try {
      const HomePosttoken = Cookie.get("token");
      const homePost = await axios.get(`${baseurl}/mystory/get-story-list`, {
        headers: {
          Authorization: `Bearer ${HomePosttoken}`, // Include the authorization header
        },
      });
      console.log("homePost::>>>", homePost.data.resData.data);
      sethomePost(homePost.data.resData.data);
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

  const alreadyLike = () => {};

  useEffect(() => {
    HomePost();
    friendList();
  }, [varFilter]);

  useEffect(() => {}, []);
  const handleComInput = (e) => {
    setComVal(e.target.value);
  };

  const handleComment = async (homePostItems) => {
    setIsCommenting(true);
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
      if (CommentData) {
        setIsCommenting(false);
        toggleContent2(homePostItems);
        handleReloadClick();
        setComVal("");
        toast.success("Commented Successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.log("api error");
        setIsCommenting(false);
      }
    } catch (error) {
      console.log(error);
      setIsCommenting(false);
    }
  };

  const handleReloadClick = () => {
    console.log("loading");
  };

  const handlePost = async () => {
    setIsPosting(true);
    const token = Cookie.get("token");
    const activeUser = localStorage.getItem("active_user");
    const formInfo = new FormData();
    formInfo.set("content", input);
    formInfo.set("userId", activeUser);
    // formInfo.set("post_image", activeUser);

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
      if (saveThePost.data.status === true) {
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
  }, []);

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    setIsChecked(checked);

    if (checked) {
      console.log("The checkbox is checked! Sending value:", value);
    } else {
    }
  };

  const commentLike = async (commentId) => {
    const user = localStorage.getItem("active_user");
    try {
      const response = await axios.post(`${baseurl}/api/comment-like-unlike`, {
        userId: user,
        type: "like",
        comment_id: commentId,
      });
      if (response.data.status === true) {
        // console.log(response.data.status);
        // setCommentLiked(true)
        setCommentLiked((prevLikes) => ({
          ...prevLikes,
          [commentId]: true, // Marking the comment as liked
        }));
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [totallikesoncomment, setTotalLikes] = useState();
  const refershCount = (newLikes) => {
    setTotalLikes(newLikes);
  };

  return (
    <Page
      pageContent={
        <>
          <ToastContainer />
          <div className=" h-[100%] y-scrl ">
            <div className=" lg:flex">
              {/* background */}
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
                        {/* <img src={account} alt='none' className='rounded-full w-12 ' /> */}

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
                          className={`${
                            input
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
                    <SelectLabels />
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
                            <div className=" flex items-center gap-2">
                              <FlippingImage
                                data={homePostItems?.userId?.profile_photo}
                              />
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
                                      onClick={() =>
                                        threeDotsToggle(homePostItems?._id)
                                      }
                                    />
                                  </div>
                                  {threeDots[homePostItems?._id] && (
                                    <div
                                      className=" w-max h-max bg-white  shadow-2xl absolute top-0 right-7 pt-2 pb-2"
                                      ref={threeDotsOutClick}
                                    >
                                      <p
                                        className="p-2 px-4 cursor-pointer hover:bg-[#C31A7F] hover:text-[#fff] "
                                        onClick={toggleBlockTab}
                                      >
                                        Block Sierra
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
                                                Block Sierra Ferguson
                                              </h1>
                                              <p className="text-[14px] text-[#7E7E7E] font-semibold">
                                                Do you really want to block this
                                                user
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
                                                onClick={toggleBlockedTab}
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
                                                        src={blockuser}
                                                        alt="none"
                                                      />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1">
                                                      <h1 className="  text-[#C31A7F] text-[18px] font-semibold">
                                                        Sierra Ferguson
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
                                      <NavLink to="/profile">
                                        <p className="p-2 px-4 cursor-pointer hover:text-[#fff]  hover:bg-[#C31A7F]">
                                          About this account
                                        </p>
                                      </NavLink>
                                      <p
                                        className="p-2 px-4 cursor-pointer hover:text-[#fff] hover:bg-[#C31A7F]"
                                        onClick={toggleReportButton}
                                      >
                                        Report Sierra Ferguson
                                      </p>
                                      {reportButton && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
                                          <div className="w-[500px] bg-[#FFFFFF] flex flex-col p-7 gap-3 rounded-[30px] relative">
                                            <h1 className="text-[18px] font-semibold">
                                              Report
                                            </h1>
                                            <div className="absolute right-6 top-6  cursor-pointer">
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
                                                Why are you reporting this post
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
                                                onClick={togglethanku}
                                              />

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
                                                        Thanks for letting us
                                                        know
                                                      </h1>
                                                      <p className="text-[14px] text-[#7E7E7E] font-semibold">
                                                        Your feedback is
                                                        important in helping us
                                                        keep the CAN community
                                                        safe
                                                      </p>
                                                    </div>
                                                    <div
                                                      className="w-40 h-9 flex items-center justify-center rounded-[10px] bg-[#C31A7F] "
                                                      onClick={togglethanku}
                                                    >
                                                      <p className="text-[#FFFFFF] text-[13px] font-semibold cursor-pointer">
                                                        Close
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            <div>
                                              <hr />
                                            </div>
                                            <div className="flex items-center justify-between text-center">
                                              <p className="text-[14px] font-semibold">
                                                Hate speech or symbols
                                              </p>
                                              <HiOutlineChevronRight color="#7E7E7E" />
                                            </div>
                                            <div>
                                              <hr />
                                            </div>
                                            <div className="flex items-center justify-between text-center">
                                              <p className="text-[14px] font-semibold">
                                                Violence of dangerous
                                                organization
                                              </p>
                                              <HiOutlineChevronRight color="#7E7E7E" />
                                            </div>
                                            <div>
                                              <hr />
                                            </div>
                                            <div className="flex items-center justify-between text-center">
                                              <p className="text-[14px] font-semibold">
                                                False information
                                              </p>
                                              <HiOutlineChevronRight color="#7E7E7E" />
                                            </div>
                                            <div>
                                              <hr />
                                            </div>
                                            <div className="flex items-center justify-between text-center">
                                              <p className="text-[14px] font-semibold">
                                                I just don't like it
                                              </p>
                                              <HiOutlineChevronRight color="#7E7E7E" />
                                            </div>
                                          </div>
                                        </div>
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
                                        {homePostItems.post_title?.slice(0, 250)}
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
                                    src={homePostItems.media_files} // Use homePostItems.media_files instead of homePostItems?.media_files
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
                                    {" "}
                                    {console.log("homePostItems::>>",homePostItems.likes.length)}{homePostItems.likes.length}
                                  </p>
                                </div>
                                <div>
                                  <div className="flex flex-row items-center gap-2">
                                    <img
                                      src={commentIcon}
                                      className="w-6 cursor-pointer"
                                      alt="none"
                                      onClick={() =>
                                        toggleContent(homePostItems)
                                      }
                                    />
                                    <p className="text-[12px] font-bold">
                                      {homePostItems.CommentsCount}
                                    </p>
                                  </div>
                                  {showContent && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50 bg-[#98989806]  ">
                                      <div
                                        className={` mt-[105px] lg:mt-2 h-[90vh] overflow-scroll lg:overflow-hidden scrollbar-hide lg:h-[70%]  bg-[#FDF4F9] rounded-3xl flex flex-col lg:flex lg:flex-row overflow-hidden ${
                                          commentModel.image
                                            ? "w-[95%]   lg:w-[70%]"
                                            : "w-[95%] lg:w-[27%]"
                                        }`}
                                      >
                                        <div
                                          className={`lg:w-[60%] ${
                                            commentModel.image
                                              ? "block"
                                              : "hidden"
                                          }`}
                                        >
                                          <img
                                            src={commentModel.image}
                                            alt="none"
                                            className="object-cover w-full h-full"
                                          />
                                        </div>
                                        <div
                                          className={`lg:w-[40%] h-[68%] lg:h-[100%] flex flex-col justify-between gap-4 p-4 relative ${
                                            commentModel.image
                                              ? ""
                                              : "lg:w-full"
                                          }`}
                                        >
                                          <div className="h-[15%] ">
                                            <div className=" flex h-max items-center gap-2">
                                              <div className="rounded-full overflow-hidden h-max w-[15%]">
                                                {commentModel.userId
                                                  .profile_photo ? (
                                                  <img
                                                    src={
                                                      commentModel.userId
                                                        .profile_photo
                                                    }
                                                    alt="User Profile"
                                                    className="rounded-full  h-12 "
                                                  />
                                                ) : (
                                                  <img
                                                    src={blockuser}
                                                    alt="Fallback User Profile"
                                                    className="rounded-full  h-12"
                                                  />
                                                )}
                                              </div>
                                              <div className="flex flex-col  w-full">
                                                <div className="flex flex-row items-center justify-between w-full">
                                                  <div className="flex flex-row gap-2 items-center">
                                                    <h1 className="font-semibold">
                                                      {
                                                        commentModel.userId
                                                          .username
                                                      }
                                                    </h1>
                                                    <p className="text-xs text-[#7E7E7E]">
                                                      {commentModel.createdAt
                                                        ? commentModel.createdAt.split(
                                                            "T"
                                                          )[0]
                                                        : ""}
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
                                                    {
                                                      commentModel.userId
                                                        .profile_category
                                                        .category_Name
                                                    }
                                                  </h1>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="text-[16px] py-[15px] ">
                                              {commentModel.content}
                                            </div>
                                          </div>
                                          <div className="flex-1 overflow-y-auto">
                                            <div key={reloadFlag}>
                                              {isCommentLoadin ? (
                                                <div className="flex items-center">
                                                  <Skeleton
                                                    variant="circular"
                                                    width={40}
                                                    height={40}
                                                  />
                                                  <Skeleton
                                                    variant="rounded"
                                                    width={210}
                                                    height={40}
                                                    className="ml-4"
                                                  />
                                                </div>
                                              ) : (
                                                postCommentModel.map(
                                                  (item, index) => (
                                                    <div
                                                      className="mt-[25px] flex items-center"
                                                      key={item.commentId}
                                                    >
                                                      <div className="w-[10%] rounded-full overflow-hidden">
                                                        {item.userId
                                                          .profile_photo ? (
                                                          <img
                                                            src={
                                                              item.userId
                                                                .profile_photo
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={userIcon}
                                                            alt="d"
                                                          />
                                                        )}
                                                      </div>
                                                      <div className="w-full ml-2">
                                                        <div className="flex justify-between items-center">
                                                          <div className="flex items-center gap-3">
                                                            <h1 className="font-semibold">
                                                              {
                                                                item.userId
                                                                  .username
                                                              }
                                                            </h1>
                                                            <p className="text-xs text-[#C31A7F]">
                                                              Cancer Fighter
                                                            </p>
                                                            <div className="flex items-center">
                                                              <p className="text-xs items-centera cursor-pointer">
                                                                {item.comment_like_user.includes(
                                                                  activeUser
                                                                ) ? (
                                                                  <AiFillHeart
                                                                    className="cursor-pointer"
                                                                    color="red"
                                                                    size={16}
                                                                  />
                                                                ) : isCommentLiked[
                                                                    item._id
                                                                  ] ? (
                                                                  <AiFillHeart
                                                                    className="cursor-pointer"
                                                                    color="red"
                                                                    size={16}
                                                                  />
                                                                ) : (
                                                                  <div
                                                                    onClick={() =>
                                                                      commentLike(
                                                                        item._id
                                                                      )
                                                                    }
                                                                  >
                                                                    <AiOutlineHeart
                                                                      size={16}
                                                                    />
                                                                  </div>
                                                                )}
                                                              </p>
                                                              <p
                                                                className="text-xs ml-1 "
                                                                id="commentLikes"
                                                              >
                                                                {
                                                                  item.like_count
                                                                }
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <div className="text-xs text-[#7E7E7E]">
                                                            {item.updatedAt
                                                              ? item.updatedAt.split(
                                                                  "T"
                                                                )[0]
                                                              : ""}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className="text-sm w-[90%]"
                                                          style={{
                                                            wordBreak:
                                                              "break-word",
                                                          }}
                                                        >
                                                          {item.message}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )
                                                )
                                              )}
                                            </div>
                                          </div>
                                          <div className="h-[14.33%] ">
                                            <div className="  bg-[#FDF4F9]">
                                              <div className="flex gap-3 w-full ">
                                                <div className="relative w-full flex items-center">
                                                  {userDetails.profile_photo ? (
                                                    <img
                                                      src={
                                                        userDetails.profile_photo
                                                      }
                                                      className="absolute left-3 h-10 w-10 rounded-full"
                                                      alt="mage"
                                                    />
                                                  ) : (
                                                    <img
                                                      src=""
                                                      className="absolute left-3 h-10 w-10 rounded-full"
                                                      alt=""
                                                    />
                                                  )}
                                                  <input
                                                    type="text"
                                                    value={comVal}
                                                    onChange={handleComInput}
                                                    className="pl-14 pr-12 py-3 w-full border border-gray-300 rounded-lg w-64 focus:outline-none"
                                                    placeholder="Add a comment.."
                                                  />
                                                  <button className="absolute right-3 h-8 w-8 flex items-center justify-center  rounded-md hover:bg-gray-300 focus:outline-none">
                                                    &#x1F60A;
                                                  </button>
                                                </div>
                                                <div className="flex justify-end ">
                                                  <div
                                                    onClick={() =>
                                                      handleComment(
                                                        commentModel
                                                      )
                                                    }
                                                    className="bg-[#C31A7F] text-white cursor-pointer  px-3 py-3 rounded-xl"
                                                  >
                                                    {isCommenting
                                                      ? "Posting..."
                                                      : "Post"}
                                                  </div>
                                                </div>
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
                                    <div className="fixed inset-0 flex items-center justify-center bg-[#0000000a]  z-50 ">
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

                                            <div className="h-[200px] overflow-y-scroll ">
                                              {myFriends &&
                                                myFriends.map((item) => (
                                                  <div
                                                    key={item.id}
                                                    className="flex py-3 px-3 flex-row items-center justify-between"
                                                  >
                                                    <div className="flex flex-row items-center gap-2 ">
                                                      <img
                                                        src={
                                                          item.friend
                                                            .profile_photo
                                                        }
                                                        className="h-10 w-10 rounded-full"
                                                        alt=""
                                                      />
                                                      <div className="flex flex-col items-start gap-1  ">
                                                        <span
                                                          className={` text-[14px] font-semibold`}
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
                                          <div className="w-full bg-[#FEF8FD] rounded-b-[20px]  ">
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
                                    <img
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
                <div className="lg:flex  lg:flex-col lg:gap-4 lg:items-center   w-full md:w-[35%] lg:w-[40%] xl:w-[30%] ">
                  <div className=" mt-8 p-5 pb-4 rounded-[30px] w-[100%] bg-[#FFFFFF] border-[0.5px] border-[#C31A7F33]">
                    <p className="flex flex-wrap text-center text-[17px]">
                      What time is best suited for you to join the meeting?
                    </p>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row items-center justify-center gap-3 pt-3">
                        <div className="w-24 h-9 bg-[#C31A7F] text-[#FFFFFF] cursor-pointer flex flex-row items-center justify-center rounded-[15px] ">
                          <p>8:00</p>
                          <p>PM</p>
                        </div>
                        <div className="w-24 h-9 bg-[#FFFFFF]   text-[#C31A7F] cursor-pointer flex flex-row items-center border-[1px] border-[#C31A7F] justify-center rounded-[15px]">
                          <p>9:00</p>
                          <p>PM</p>
                        </div>
                        <div className="w-24 h-9 bg-[#FFFFFF]   text-[#C31A7F] cursor-pointer flex flex-row items-center border-[1px] border-[#C31A7F] justify-center rounded-[15px]">
                          <p>12:00</p>
                          <p>AM</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C31A7F]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#E7E7E7]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#E7E7E7]"></div>
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
                    <div className=" flex items-center ">
                      <SingleLineCalendar />
                    </div>

                    <div className="p-4">
                      <hr />
                    </div>

                    <div className=" text-[14px]  flex flex-row items-center justify-center gap-6">
                      <h1
                        onClick={() => toggleVertical("Upcoming")}
                        className={
                          vertical === "Upcoming"
                            ? "text-black font-semibold transition-all duration-300"
                            : "text-[#C4C4C4] font-semibold cursor-pointer"
                        }
                      >
                        Upcoming
                      </h1>
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
                        {vertical === "Upcoming" && (
                          <div className="w-full mt-4 ">
                            <VerticalSLC />
                          </div>
                        )}
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

                        <div className="w-full h-[10%] mt-7 top-[90%] bg-white flex justify-center items-center font-semibold">
                          <div className="bg-[#c31a7f3c] flex items-center h-10 gap-2 pl-2 rounded-3xl">
                            {vertical === "Upcoming" && (
                              <div className="flex flex-row px-4 items-center  cursor-pointer text-[15px]">
                                <p>View all schedule</p>
                                <RiArrowDropDownLine size={26} />
                              </div>
                            )}
                            {vertical === "Appointment" && (
                              <div className="flex flex-row px-4 items-center cursor-pointer text-[15px]">
                                <p>View all schedule</p>
                                <RiArrowDropDownLine size={26} />
                              </div>
                            )}
                            {vertical === "Medicines" && (
                              <div className="flex flex-row px-4 ite-center  cursor-pointer test-[15px]">
                                <p>View all</p>
                                <RiArrowDropDownLine size={26} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FloatingChat />

            {/* emoji  */}
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

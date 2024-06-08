import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import FlippingImage from "../Components/FlipImage";
import smily from "../Photos/smily.png";
import { IoMdClose } from "react-icons/io";
import Send from "../Photos/Send.png";
import premium from "../Photos/premium.png";
import commentIcon from "../Photos/commentIcon.png";
import save from "../Photos/save.png";
import saved from "../Photos/saved.png";
import { CiSearch } from "react-icons/ci";
import CreatePost from "../Components/CreatePost";
import { BsLink45Deg } from "react-icons/bs";
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
import { base_token } from "../Api/baseUrl";
import apis from "../Api/baseUrl";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./AdminHostPost.css";
export const AdminHomePost = () => {
  const emojiButtonRef = useRef(null);
  const pickerRef = useRef(null);
  const [createPost, setCreatePost] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const [reportButton, setReportButton] = useState(false);
  const [showThanku, setThanku] = useState(false);
  const [showlocation, setShowLacation] = useState(false);
  const [showgif, setShowgif] = useState(false);
  const [userBlock, setUserBlock] = useState(false);
  const [userBlocked, setUserBlocked] = useState(false);
  const [commentModel, setcommentModel] = useState([]);
  const [postCommentModel, setPostCommentModel] = useState();
  const [isCommentLoadin, setIsCommentLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const [singlePostId, setSinglePostId] = useState();
  const [isShared, setIsShared] = useState();
  const [threeDots, setThreeDots] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const threeDotsOutClick = useRef(null);
  const [vertical, setVertical] = useState("Upcoming");
  const [comVal, setComVal] = useState("");
  const [Loading, setLoading] = useState(true);
  const location = useLocation();
  const querysearch = new URLSearchParams(location.search);
  const [myFriends, setMyFriends] = useState();
  const [reloadFlag, setReloadFlag] = useState(false);
  const [isCommenting, setIsCommenting] = useState();
  const [homePost, sethomePost] = useState();
  const [isPosting, setIsPosting] = useState();
  const [isSaved, setIsSaved] = useState();
  const [commentImage, setCommentImage] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const activeUser = localStorage.getItem("active_user");
  const HomePost = async () => {
    try {
      const HomePosttoken = Cookie.get("token");
      const homePost = await axios.get(`${baseurl}/mystory/get-story-list`, {
        headers: {
          Authorization: `Bearer ${HomePosttoken}`,
        },
      });
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

  const toggleBlockTab = () => {
    setUserBlock(!userBlock);
  };

  useEffect(() => {
    HomePost();
    // friendList();
  }, []);

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
        console.log(data);
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function threeDotsToggle(postId) {
    setThreeDots((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }

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
        { user_id: userID }, // Sending userID in the request body
        config
      );
      console.log("delete-story::>>", response);
      if (response) {
        console.log(response.data); // Log response data
        setUserBlocked(!userBlocked);
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleReportButton = () => {
    setReportButton(!reportButton);
  };

  const togglethanku = () => {
    setThanku(!showThanku);
  };

  const toggleShareButton = (postid) => {
    setShareButton(!shareButton);
    console.log("postshareid", postid);
    setSinglePostId(postid);
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
      setShowContent(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReadMore = () => {
    setShowFullContent(true);
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
        HomePost();
      } else {
        console.log("API error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComInput = (e) => {
    setComVal(e.target.value);
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const [vertical, setVertical] = useState('');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectOption = (option) => {
    setVertical(option);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className=" h-[100%] y-scrl xl:w-[100%] adminhost">
        <div className=" lg:flex">
          <div className="bg-[#f4fbff] lg:px-0 px-2 lg:px-10 w-[100%] flex flex-wrap justify-around">

            <div className="flex flex-col  ml-0  w-full  lg:w-[55%] ">
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
                          boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
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
                              {console.log("homePostItems:>>>", homePostItems)}
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
                                                Do you really want to block this
                                                user?
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
                                                    homePostItems?.user_id?._id
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
                                                          homePostItems?.user_id
                                                            ?.profile_image
                                                        }
                                                        alt="none"
                                                      />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1">
                                                      <h1 className="  text-[#C31A7F] text-[18px] font-semibold">
                                                        {
                                                          homePostItems?.user_id
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
                                      <NavLink
                                        to={{
                                          pathname: "/profile",
                                          value: { userID },
                                        }}
                                      >
                                        <p className="p-2 px-4 cursor-pointer hover:text-[#fff]  hover:bg-[#C31A7F]">
                                          About this account
                                        </p>
                                      </NavLink>
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
                                                Why are you reporting this post?
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
                                    getComment(homePostItems._id, homePostItems)
                                  }
                                />
                                {console.log("commentImage::", commentImage)}
                                <p className="text-[12px] font-bold">
                                  {homePostItems?.comments?.length}
                                </p>
                              </div>

                              {showContent && (
                                <div
                                  className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50"
                                  style={{
                                    backgroundColor: "rgb(46 46 46 / 30%)",
                                  }}
                                >
                                  <div className="w-[95%] lg:w-[70%] lg:h-[70%] bg-[#FDF4F9] rounded-3xl flex flex-col lg:flex lg:flex-row overflow-hidden">
                                    <div className="lg:w-[60%]">
                                      <img
                                        src={commentImage?.media_files[0]}
                                        alt="none"
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div className="lg:w-[40%] flex flex-col justify-between p-4 relative">
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
                                                  {commentImage?.user_id?.CANID}
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
                                        {commentImage?.comments?.length > 0 ? (
                                          commentImage.comments.map(
                                            (comment) => (
                                              <div
                                                className="mt-[15px] flex items-center"
                                                style={{
                                                  backgroundColor: "#f9f9f9",
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
                                                    src={comment?.profile_image}
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
                                              commentImage?.user_id
                                                ?.profile_image
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
                                              handleComment(commentImage._id)
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
                                                      item.friend.profile_photo
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
                                <imgz src={saved} className="w-4" alt="none" />
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
                </>
              )}
            </div>
            <div className="ris-home lg:flex lg:flex-col lg:gap-4 lg:items-center w-full lg:w-[40%] xl:w-[30%]">
              <div
                className="w-[100%] p-6 px-0 bg-white max-h-screen relative mt-[70px] rounded-[30px] overflow-hidden border-[1px] border-solid border-[#D9EAFF]"
                style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="flex items-center justify-between p-4 pt-0">
                  <h2 style={{fontWeight:'600', fontSize:'18px'}}>Total Posts</h2>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center bg-[transparent] p-2 rounded-3xl" style={{color:'gray', fontSize:'14px'}} 
                  >
                    All <RiArrowDropDownLine size={26} />
                  </button>
                </div>

                {dropdownOpen && (
                  <div className="flex flex-col p-4 bg-white shadow-lg rounded-md">
                    <button
                      onClick={() => selectOption("All")}
                      className="p-2 hover:bg-gray-100"
                    >
                      All
                    </button>
                    <button
                      onClick={() => selectOption("Appointment")}
                      className="p-2 hover:bg-gray-100"
                    >
                      Today
                    </button>
                  </div>
                )}

                <div className="flex justify-center mt-4 mb-[16px]">
                  <div className="flex items-center justify-center w-[49%] h-[200px] border-[40px] border-solid border-[#f16e8b] rounded-full">
                    <p className="text-center" style={{fontSize:'22px', fontWeight:'600' }}>5850 <br></br><span style={{fontSize:'18px', fontWeight:'600' }}>Live Post</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

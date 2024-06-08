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
import AdminPage from "./AdminPage";
export const UserActivity = () => {
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
      <AdminPage
        AdminpageContent={
          <>
            <div className="flex justify-center">
              <div className=" h-[100%] y-scrl xl:w-[100%] adminhost">
                <div className=" lg:flex">
                  <div className="bg-[#f4fbff] lg:px-0 px-2 lg:px-10 w-[100%] flex flex-wrap justify-around">
                    <div className="flex flex-col  ml-0  w-full  lg:w-[55%] ">
                      
                    </div>
                    <div className="ris-home lg:flex lg:flex-col lg:gap-4 lg:items-center w-full lg:w-[40%] xl:w-[30%]">
                      <div
                        className="w-[100%] p-6 px-0 bg-white max-h-screen relative mt-[70px] rounded-[30px] overflow-hidden border-[1px] border-solid border-[#D9EAFF]"
                        style={{
                          boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <div className="flex items-center justify-between p-4 pt-0">
                          <h2 style={{ fontWeight: "600", fontSize: "18px" }}>
                            Today User Activity
                          </h2>
                          <button
                            onClick={toggleDropdown}
                            className="flex items-center bg-[transparent] p-2 rounded-3xl"
                            style={{ color: "gray", fontSize: "14px" }}
                          >
                            Today <RiArrowDropDownLine size={26} />
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
                            <p
                              className="text-center"
                              style={{ fontSize: "22px", fontWeight: "600" }}
                            >
                              8850 <br></br>
                              <span
                                style={{ fontSize: "18px", fontWeight: "600" }}
                              >
                                Live User
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="w-[100%] bg-white max-h-screen relative mt-[30px] rounded-[30px] overflow-hidden border-[1px] border-solid border-[#D9EAFF]"
                        style={{
                          boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                        }}
                      >

                        <div className="flex justify-center">
                          <div className="flex items-center py-[40px] px-[16px]">
                            <ul className="user-lists">
                                <li><a href="#">1,960 User View (85%)</a> came from www.CAN.com</li>
                                <li>CAN.com appeared in search <a href="#">5,832 times.</a> </li>
                                <li><a href="#">5832 times CAN Referrals</a> has been shared among users.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div
                        className="w-[100%] p-6 px-0 bg-white max-h-screen relative mt-[30px] rounded-[30px] overflow-hidden border-[1px] border-solid border-[#D9EAFF]"
                        style={{
                          boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <div className="flex items-center justify-between p-4 pt-0">
                          <h2 style={{ fontWeight: "600", fontSize: "18px" }}>
                            Total Posts
                          </h2>
                          <button
                            onClick={toggleDropdown}
                            className="flex items-center bg-[transparent] p-2 rounded-3xl"
                            style={{ color: "gray", fontSize: "14px" }}
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
                            <p
                              className="text-center"
                              style={{ fontSize: "22px", fontWeight: "600" }}
                            >
                              8850 <br></br>
                              <span
                                style={{ fontSize: "18px", fontWeight: "600" }}
                              >
                                Live Posts
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      >
        {/* Add your additional elements here */}
      </AdminPage>
    </>
  );
};

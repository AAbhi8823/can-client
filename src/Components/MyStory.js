import React, { useEffect, useRef, useState } from "react";
import TabPanel from "./TabPanel";
import FlippingImage from "../Components/FlipImage";
import account from "../Photos/account.jpg";
import premium from "../Photos/premium.png";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import smily from "../Photos/smily.png";
import { IoMdClose } from "react-icons/io";
import Send from "../Photos/Send.png";
import commentIcon from "../Photos/commentIcon.png";
import save from "../Photos/save.png";
import saved from "../Photos/saved.png";
import { CiSearch } from "react-icons/ci";
import { BsLink45Deg } from "react-icons/bs";
import { CiFaceSmile } from "react-icons/ci";
import blockuser from "../Photos/blockuser.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base_token } from "../Api/baseUrl";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookie from "js-cookie";
import Cookies from "js-cookie";
import apis from "../Api/baseUrl";
function MyStory({ value }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const emojiButtonRef = useRef(null);
  const pickerRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const [checked, setChecked] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [isSaved, setIsSaved] = useState();
  const [Loading, setLoading] = useState(true);
  const [homePost, sethomePost] = useState([]);
  const [isPostLoading, setPostLoading] = useState(true);
  const [comVal, setComVal] = useState();
  const [threeDots, setThreeDots] = useState(false);
  const [LikeID, setLikeID] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [commentModel, setcommentModel] = useState([]);
  const threeDotsOutClick = useRef(null);

  useEffect(() => {
    HomePost();
    userProfile();
  }, []);

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
        console.log("Home:", userData);
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("================================",comVal)
  const handleComment = async (posiID) => {
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
      },
    };
    const body = {
      story_id: posiID,
      comment:comVal
    };

    try {
      console.log("commentData:", posiID);
      const { data } = await axios.post(
        `${apis.GET_POST_COMMENT}`,
        body,
        config
      );
      // setcommentModel(data);
      setComVal("")
      
      console.log("commentData:", data);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const userProfile = async () => {
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
      setUserdata(response?.data?.resData?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadMore = () => {
    setShowFullContent(true);
  };

  const deletePost = async (postid) => {
    console.log(postid);
    const token = Cookies.get("token");
    try {
      const data = await axios.delete(
        `${baseurl}/deletepost/${postid}?token=${token}`
      );
      if (data) {
        console.log(data);
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const toggleContent = (commentItem) => {
    setShowContent(!showContent);
    setcommentModel(commentItem);
  };

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

  function threeDotsToggle(postId) {
    setThreeDots((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }

  const HomePost = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
      },
    };
    try {
      const homePost = await axios(`${apis.GET_PERSONAL_POST}`, config);
      console.log("homePost::>>>>>", homePost);
      sethomePost(homePost?.data?.resData?.data);
      setPostLoading(false);
    } catch (error) {
      console.log(error);
      setPostLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleComInput = (e) => {
    setComVal(e.target.value);
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
    <TabPanel value={value} index={0}>
      <div
        className=" lg:p-7 p-4 mt-10 shrink-0 w-[100%]  rounded-[30px] border-[1px]"
        style={{
          boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
        }}
      >
        {homePost?.map((homePostItems, index) => {
          return (
            <div
              key={index}
              className=" lg:p-7 p-4 mt-1  md-w-[100%] mb-3 shrink-0 bg-[#C31A7F] bg-white rounded-[30px] border-[1px]"
              style={{
                boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
              }}
            >
              {console.log("Ankur-singh:::", homePostItems)}
              <div className=" flex items-center gap-2">
                <FlippingImage data={userdata?.profile_image} />
                <div className="flex  w-full items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold">{userdata?.full_name}</h1>
                      <p className="text-xs text-[#7E7E7E]">
                        {homePostItems?.createdAt}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-[12px] font-semibold   text-[#C31A7F]">
                        {userdata?.user_profile}
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
                    homePostItems.post_title
                  )}
                </p>
              </div>

              <div className="pt-3 ">
                {homePostItems?.media_files ? (
                  <div className=" rounded-3xl w-full overflow-hidden h-[40vh]">
                    <img
                      src={homePostItems?.media_files}
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
                      {homePostItems?.likes?.length}{" "}
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
                        {homePostItems.comments.length}
                      </p>
                    </div>
                    {console.log("showContent::::", showContent)}
                    {showContent && (
                      <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50 bg-[#989898] bg-opacity-[0.03]">
                        {console.log("Hello::>>", commentModel)}
                        <div className="w-[95%] lg:w-[70%] lg:h-[70%] bg-[#FDF4F9] rounded-3xl flex flex-col lg:flex lg:flex-row overflow-hidden">
                          <div className="lg:w-[60%]">
                            <img
                              src={commentModel.media_files}
                              alt="none"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="lg:w-[40%] flex flex-col justify-between gap-4 p-4 relative">
                            <div style={{height:'90%',overflowY:'scroll'}}>
                              <div className="flex h-max items-center gap-2">
                                <div className="rounded-full overflow-hidden h-max w-[20%]">
                                  {userdata?.profile_image ? (
                                    <img
                                      src={userdata?.profile_image}
                                      alt="User Profile"
                                      className="rounded-full h-12"
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
                                        {userdata.CANID}
                                      </h1>
                                      <p className="text-xs text-[#7E7E7E]">
                                        {userdata.createdAt}
                                      </p>
                                    </div>
                                    <div
                                      className="cursor-pointer absolute right-8 top- lg:right- lg:"
                                      onClick={toggleContent}
                                    >
                                      <IoMdClose className="lg:text-[#000]" />
                                    </div>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <h1 className="text-xs font-semibold text-[#C31A7F]">
                                      Cancer Fighter
                                    </h1>
                                  </div>
                                </div>
                              </div>
                              <div className="text-[16px] py-[15px]">
                                {commentModel.content}
                                {"ankur"}
                                {console.log(
                                  "sdvhsjdvgdskjvcdsulyfvdsufyv",
                                  commentModel
                                )}
                              </div>
                              {commentModel?.comments?.length > 0 ? (
                                commentModel.comments.map((comment) => (
                                  <div
                                    className="mt-[25px] flex items-center"
                                    key={comment._id}
                                  >
                                    {console.log("comment:>>", comment)}
                                    <div className="w-[10%] rounded-full overflow-hidden">
                                      <img
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
                                ))
                              ) : (
                                <div>No comments</div>
                              )}
                            </div>
                            <div className="bottom-4">
                              <div className="flex gap-3 w-full bg-transparent">
                                <img
                                  src={userdata?.profile_image}
                                  alt="none"
                                  className="rounded-full w-[10%] h-[60%] shadow-md"
                                />
                                <input
                                  placeholder="Write here..."
                                  onChange={handleComInput}
                                  className="outline-none w-full bg-transparent"
                                />
                                <div className="flex-col cursor-pointer items-end flex justify-center">
                                  <img src={smily} className="w-6" alt="none" />
                                </div>
                              </div>
                              <div className="flex justify-end mt-2">
                                {console.log("Loading::>>>>",commentModel)}
                                <div
                                  onClick={() =>
                                    handleComment(commentModel._id)
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
                        onClick={toggleShareButton}
                      />
                      <p className="text-[12px] font-bold">
                        {homePostItems.shares.length}
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
                                {checked.map((item, index) => (
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
  );
}

export default MyStory;

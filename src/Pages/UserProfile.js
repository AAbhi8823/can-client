import React, { useEffect, useRef, useState } from "react";
import VerticalAppointment from "../Components/VerticalAppointment";
import VerticalMedicine from "../Components/VerticalMedicine";
import account from "../Photos/account.jpg";
import climberEverest from "../Photos/climberEverest.webp";
import { AiOutlineHeart } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import SingleLineCalendar from "../Components/SingleLineCalender";
import VerticalSLC from "../Components/VericalSLC";
import FloatingChat from "../Components/FloatingChat";
import Page from "../Layouts/Pages";
import { TfiGallery } from "react-icons/tfi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Avatar from "@mui/material/Avatar";
import lock from "../Photos/lock.png";
import Cookies from "js-cookie";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import DesignTabs from "./DesignTab";
import AvatarGroup from "@mui/material/AvatarGroup";
import account2 from '../Photos/account2.jpg'

const UserProfile = () => {
  const [selected, setSelected] = useState("My Story");

  function selectedOption(item) {
    setSelected(item);
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [isHoveredVideo, setIsHoveredVideo] = useState(false);

  const handleMouseEnterVideo = () => {
    setIsHoveredVideo(true);
  };

  const handleMouseLeaveVideo = () => {
    setIsHoveredVideo(false);
  };
  const [details, setDetails] = useState(false);

  function ShowDetails() {
    setDetails(true);
  }
  const [isHovered, setIsHovered] = useState(false);

  const emojiButtonRef = useRef(null);
  const pickerRef = useRef(null);
  const [heart, setHeart] = useState();
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
  const [userblocked, setUserBlocked] = useState(false);

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

  const toggleContent = () => {
    setShowContent(!showContent);
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

  function likeButton() {
    setHeart(!heart);
  }
  function likeButton1() {
    setHeart1(!heart1);
  }

  function open_post() {
    setCreatePost(true);
  }

  const para =
    "Bethany was running in a half marathon when she began to feel ill. She thought that her celiac disease may have flared up due to something she had eaten, but when she didn’t get better, she decided to see a doctor. What followed was a series of misdiagnoses is the etc";

  // three dots
  const [threeDots, setThreeDots] = useState(false);

  function threeDotsToggle() {
    setThreeDots(!threeDots);
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutsidethreeDots, true);
    return () => {
      document.removeEventListener("click", handleClickOutsidethreeDots, true);
    };
  }, []);

  // emoji
  useEffect(() => {
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

  const [personalData, setPersonaldata] = useState();

  const getSingleUser = async () => {
    const Usertoken = Cookies.get("token");
    // console.log(Usertoken)

    const userID = localStorage.getItem("active_user");
    // console.log(userID)

    try {
      const resData = await axios.post(
        `${baseurl}/api/singleuser?token=${Usertoken}`,
        {
          id: `${userID}`,
        }
      );
      console.log("profileuser" , resData.data.data)
      setPersonaldata(resData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const isoDateString = personalData?.date_of_birth;
  const date = new Date(isoDateString);

  // Options for formatting the date
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const [Count, setCount] = useState(0);

  const handleState = (state) => {
    setCount(state);
  };

  const [MainPost, setMainPost] = useState();

  const PostData = async () => {
    const ActUser = localStorage.getItem("active_user");
    const UserPosttoken = Cookies.get("token");
    try {
      const postData = await axios.post(
        `${baseurl}/api/getsingleuserdata?token=${UserPosttoken}`,
        {
          userid: `${ActUser}`,
          key: "mypost",
          meet_type: "",
        }
      );
      setMainPost(postData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [savedPost, setSavedPost] = useState()

  const showSavedPosts = async () => {
    const token = Cookies.get("token");
    const userId = localStorage.getItem("active_user");

    try {
      const savedPosts = await axios.get(
        `${baseurl}/api/savepost?token=${token}`,
        { userid: userId }
      );

      if (savedPosts.data.data.length >=0) {
        console.log("saved posts", savedPosts.data);
        setSavedPost(savedPosts.data.data)
      } else {
        console.log("Api error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    PostData();
    showSavedPosts();
  }, []);

  return (
    <Page
      pageContent={
        <>
          <div className=" h-[100%]  ">
            <div className=" lg:flex">
              {/* background */}
              <div className="bg-[#FEF8FD] lg:px-0  w-[100%] lg:flex-row lg:flex">
                {/* post */}
                <div className="flex flex-col lg:px-12 mt-10 ">
                  <div className="bg-white relative rounded-[40px] shadow-lg">
                    {/* Full Image */}
                    <div>
                      <img
                        src={personalData?.profile_category.image}
                        alt="Cover"
                        className="w-full rounded-lg mb-4"
                      />
                    </div>
                    <div className="flex items-center absolute bottom-5 left-[10%] space-x-4">
                      {/* User Image */}
                      <div>
                      <img
                        src={personalData?.profile_photo}
                        alt="User"
                        className="w-[130px] h-[120px] rounded-full border-4 border-white"
                      />

                      <div>
                        <h1 className="lg:text-[1.7vw] text-[17px] font-semibold py-2">
                          {personalData?.profile_category.category_Name}
                        </h1>
                        <h2>XYZ NAME</h2>
                        <p className="lg:text-[1.1vw] text-12">
                          {personalData?.profile_category.descritption}
                        </p>
                      </div>
                      </div>
                    <div className="">
                       <p>SHRI1212</p>
                    </div>
                    </div>

                    {/* NavLinks */}
                    <div className="mt-6">
                      <DesignTabs onChildStateChange={handleState} />
                    </div>
                  </div>
                  <div className="p-[15px]">
                    {Count === 0 && (
                      <div className="bg-white w-[101%] mt-8 rounded-2xl shadow-xl p-6">
                        <h1 className="font-semibold">POSTS</h1>
                        <div className="pt-4 min-w-[101%] min-h-[30vh] max-h-[50vh] overflow-y-scroll">
                          <div className="flex flex-wrap">
                            {MainPost?.map((PostItems, index) => {
                              return (
                                <div
                                  key={index}
                                  className="w-[250px] h-[30vh] overflow-hidden mr-[35px] mt-[35px]"
                                  onMouseEnter={handleMouseEnter}
                                  onMouseLeave={handleMouseLeave}
                                >
                                  <img
                                    src={PostItems?.image}
                                    className="w-full h-full object-contain"
                                    alt="climber.jpg"
                                  />
                                </div>
                              );
                            })}
                          </div>

                     
                        </div>
                        <p className="text-right cursor-pointer text-[#1877F2]">
                          See more
                        </p>
                      </div>
                    )}
                    {Count === 1 && (
                      <>
                        <div className="bg-white mb-2 w-[100%] mt-8 rounded-2xl shadow-xl py-4 px-2">
                          <div className="flex">
                            <div className="pr-[12px] flex justify-center items-center flex-col mr-[25px] border-r ">
                              <p className="text-[12px]">23 Dec</p>
                              <p className="font-semibold">Start In</p>
                              <p className="text-[#C31A7F] font-bold">
                                {" "}
                                11:00 to 12:15PM
                              </p>
                            </div>
                            <div className="pr-[12px] mr-[13px] border-r flex items-center ">
                              <Avatar
                                alt=" "
                                src="/static/images/avatar/1.jpg"
                              />
                            </div>
                            <div className="pr-[12px] mr-[25px] border-r ">
                              <div>Siddarth Sharma</div>
                              <div className="text-[12px]">cancer Fighter</div>
                              <div className="flex justify-between ">
                                <div className="text-[12px] text-[#C31A7F] ">
                                  Team Can
                                </div>
                                <div className="text-[12px] text-[#C31A7F] ">
                                  Virtual
                                </div>
                              </div>
                            </div>
                            <div className="pr-[12px] mr-[25px] border-r flex items-center flex-col justify-center ">
                              Meeting description:- <br />{" "}
                              <span className="text-[12px]">
                                agenda, about it, meeting Read More
                              </span>
                            </div>
                            <div className="pr-[12px] flex items-center mr-[25px] border-r ">
                              <AvatarGroup max={4}>
                                <Avatar
                                  alt=" "
                                  src="/static/images/avatar/1.jpg"
                                />
                                <Avatar
                                  alt="Travis Howard"
                                  src="/static/images/avatar/2.jpg"
                                />
                                <Avatar
                                  alt="Cindy Baker"
                                  src="/static/images/avatar/3.jpg"
                                />
                                <Avatar
                                  alt="Agnes Walker"
                                  src="/static/images/avatar/4.jpg"
                                />
                                <Avatar
                                  alt="Trevor Henderson"
                                  src="/static/images/avatar/5.jpg"
                                />
                              </AvatarGroup>
                            </div>
                            <div className="flex items-center">
                              <button className="bg-[#C31A7FCC] text-white py-[5px] px-[10px] rounded ">
                                Enrolled
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white mb-2 w-[100%] mt-8 rounded-2xl shadow-xl py-4 px-2">
                          <div className="flex">
                            <div className="pr-[12px] flex justify-center items-center flex-col mr-[25px] border-r ">
                              <p className="text-[12px]">23 Dec</p>
                              <p className="font-semibold">Start In</p>
                              <p className="text-[#C31A7F] font-bold">
                                {" "}
                                11:00 to 12:15PM
                              </p>
                            </div>
                            <div className="pr-[12px] mr-[13px] border-r flex items-center ">
                              <Avatar
                                alt=" "
                                src="/static/images/avatar/1.jpg"
                              />
                            </div>
                            <div className="pr-[12px] mr-[25px] border-r ">
                              <div>Siddarth Sharma</div>
                              <div className="text-[12px]">cancer Fighter</div>
                              <div className="flex justify-between ">
                                <div className="text-[12px] text-[#C31A7F] ">
                                  Team Can
                                </div>
                                <div className="text-[12px] text-[#C31A7F] ">
                                  Virtual
                                </div>
                              </div>
                            </div>
                            <div className="pr-[12px] mr-[25px] border-r flex items-center flex-col justify-center ">
                              Meeting description:- <br />{" "}
                              <span className="text-[12px]">
                                agenda, about it, meeting Read More
                              </span>
                            </div>
                            <div className="pr-[12px] flex items-center mr-[25px] border-r ">
                              <AvatarGroup max={4}>
                                <Avatar
                                  alt=" "
                                  src="/static/images/avatar/1.jpg"
                                />
                                <Avatar
                                  alt="Travis Howard"
                                  src="/static/images/avatar/2.jpg"
                                />
                                <Avatar
                                  alt="Cindy Baker"
                                  src="/static/images/avatar/3.jpg"
                                />
                                <Avatar
                                  alt="Agnes Walker"
                                  src="/static/images/avatar/4.jpg"
                                />
                                <Avatar
                                  alt="Trevor Henderson"
                                  src="/static/images/avatar/5.jpg"
                                />
                              </AvatarGroup>
                            </div>
                            <div className="flex items-center">
                              <button className="bg-[#C31A7FCC] text-white py-[5px] px-[10px] rounded ">
                                Enrolled
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {Count === 2 && (
                      <div className="bg-white w-[100%] mt-8 rounded-2xl shadow-xl p-6">
                        <h1 className="font-semibold">SAVED POSTS</h1>
                        <div
                          className="pt-4 w-[40%] relative"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="flex">
                            {savedPost && savedPost.length > 0 ? (
                              savedPost.map((items, index) => (
                                <img
                                  key={index}
                                  src={items}
                                  className="mx-10"
                                  alt="climber.jpg"
                                />
                              ))
                            ) : (
                              <p>No records found</p>
                            )}
                          </div>

                          {details && (
                            <div
                              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                              style={{ backdropFilter: "blur(2px)" }}
                            >
                              <div className="w-[70%] h-[70%] bg-[#FDF4F9] rounded-3xl flex overflow-hidden">
                                <div className="w-[60%]">
                                  <img
                                    src={climberEverest}
                                    alt="none"
                                    className="object-cover h-[100%] w-[100%]"
                                  />
                                </div>

                                <div className="w-[40%] mt-8 mx-6 relative">
                                  <div className=" flex h-max items-center gap-2">
                                    <div className="rounded-full overflow-hidden  h-max w-[20%]">
                                      <img
                                        src={account}
                                        alt="none"
                                        className=""
                                      />
                                    </div>

                                    <div className="flex flex-col  w-full">
                                      <div className="flex flex-row items-center justify-between w-full">
                                        <div className="flex flex-row gap-2 items-center">
                                          <h1 className="font-semibold">
                                            Sierra Ferguson
                                          </h1>
                                          <p className="text-xs text-[#7E7E7E]">
                                            15 hrs ago
                                          </p>
                                        </div>

                                        <div onClick={ShowDetails}>
                                          <IoMdClose />
                                        </div>
                                      </div>

                                      <div className="flex gap-2 items-center ">
                                        <h1 className="text-xs font-semibold   text-[#C31A7F]">
                                          Cancer Fighter
                                        </h1>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="font-semibold mt-2">
                                    <h1>Cancer Survivor Stories: Bethany</h1>
                                  </div>

                                  <div className="text-[80%]">
                                    Bethany was running in a half marathon when
                                    she began to feel ill. She thought that her
                                    celiac disease may have flared up due to
                                    something she had eaten, but when she didn’t
                                    get better, she decided to see a doctor.
                                    What followed was a series of misdiagnoses
                                    celiac disease may have flared up due to
                                    something she had eaten, but when she didn’t
                                    get better, she decided to see a doctor.
                                  </div>

                                  <div className="mt-4 flex items-center gap-2">
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
                                        better luck next time
                                      </div>
                                    </div>
                                  </div>

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
                                        <HiOutlineGif
                                          color="#C4C4C4"
                                          size={20}
                                        />
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

                          {/* {isHovered && (
                                                            <div className='absolute left-[40px] top-0 mt-4 text-white bg-[#00000063] h-[220px] w-full' onClick={ShowDetails}>
                                                                <p className='absolute right-2 '>
                                                                    2w
                                                                </p>
                                                                <div className='absolute bottom-0 text-sm'>
                                                                    <div className='flex gap-2 px-2'>
                                                                        <h1>Iqra Aziz</h1>
                                                                        <p>Cancer Fighter</p>
                                                                    </div>
                                                                    <div className='flex gap-2 px-2'>
                                                                        Cancer Survivor Stories Bethany
                                                                    </div>

                                                                    <div className='flex gap-2 px-2 items-center'>
                                                                        <AiOutlineHeart size={18} /> 2k
                                                                        <FaRegComment size={16} /> 1k
                                                                        <SlPaperPlane size={16} /> 1.5k
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )} */}
                        </div>
                        <p className="text-right cursor-pointer text-[#1877F2]">
                          See more
                        </p>
                      </div>
                    )}

                    {Count === 3 && <div>HealthCard</div>}
                  </div>
                </div>
                <div className="lg:flex lg:flex-col lg:gap-4 lg:items-center lg:pr-12 hidden lg:block   ">
                  {/* right side */}

                  <div className="h-[35%]  w-[100%] flex mt-8 ">
                    <div
                      className=" md:w-[360px] lg:w-[331px]  sm:w-[330px]  bg-[#fff] mt-2   backdrop-blur-md rounded-[20px]"
                      style={{
                        boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div>
                        {/* <img src={vtwo}   className='object-contain rounded-[20px]' alt='none' /> */}
                      </div>

                      <div className="p-4 mx-4 mt-3 lg:text-[14px]   text-[14px] text-center">
                        <h1 className="spce-1 w-[100%] font-semibold ">
                          You can add the profile of your <br /> Caregiver
                          byclicking on the Add profile button.
                        </h1>
                      </div>
                      <div className="h-[50%] w-[100%] px-[12px] items-center flex justify-between relative">
                        <div
                          className="w-[46%] h-[75%] pb-8 bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer "
                          style={{
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <Avatar
                            alt="Cindy Baker"
                            src="/static/images/avatar/3.jpg"
                          />
                          <h1 className="font-semibold text-lg ">
                            {personalData?.username}
                          </h1>
                          <p className="text-sm">
                            {" "}
                            {personalData?.profile_category?.category_Name}
                          </p>
                          <img src={lock} alt="none" className="h-5 w-5 mt-1" />
                          <div className="absolute -top-5 rounded-full overflow-hidden bg-white w-[15%] h-[] ">
                            {/* <img src={account} alt='none' className='p-1 rounded-full' /> */}
                          </div>
                        </div>

                        <div
                          className="w-[46%] h-[75%] pb-8  bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer "
                          style={{
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <div className="w-[45%] h-[100%]">
                            <div className="h-full  rounded-3xl flex flex-col justify-center items-center">
                              <Avatar
                                alt="Cindy Baker"
                                src={account2}
                              />
                              <h1 className="font-semibold text-lg ">Sierra</h1>
                              <p className="text-sm text-center">Caregiver</p>
                              <img
                                src={lock}
                                alt="none"
                                className="h-5 w-5 mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* calender */}
                  <div
                    className=" w-[100%] p-6 bg-white max-h-screen relative mt-4 pb-10  rounded-[30px]  overflow-hidden border-[1px] border-solid border-[#D9EAFF]  "
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

            {/* floating chat */}
            <FloatingChat />

            {/* emoji  */}
            {showEmoji && (
              <div
                className="absolute top-52   left-3  lg:top-56 lg:left-96"
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
          </div>
        </>
      }
    />
  );
};

export default UserProfile;

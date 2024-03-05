// import React, { useEffect, useRef, useState } from "react";
// import HomeNav from "../Components/HomeNav";
// import VerticalAppointment from "../Components/VerticalAppointment";
// import VerticalMedicine from "../Components/VerticalMedicine";
// import account from "../Photos/account.jpg";
// import climberEverest from "../Photos/climberEverest.webp";
// import premium from "../Photos/premium.png";
// import { BsThreeDots } from "react-icons/bs";
// import { AiOutlineHeart } from "react-icons/ai";
// import { AiFillHeart } from "react-icons/ai";
// import { FaRegComment } from "react-icons/fa";
// import { SlPaperPlane } from "react-icons/sl";
// import { BsBookmarkDash } from "react-icons/bs";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import SingleLineCalendar from "../Components/SingleLineCalender";
// import VerticalSLC from "../Components/VericalSLC";
// import FlippingImage from "../Components/FlipImage";
// import FloatingChat from "../Components/FloatingChat";
// import Page from "../Layouts/Pages";
// import { RxCross2 } from "react-icons/rx";
// import gallery from "../Photos/gallery.png";
// import gificon from "../Photos/gifIcon.png";
// import location from "../Photos/location.png";
// import smily from "../Photos/smily.png";
// import { TfiGallery } from "react-icons/tfi";
// import { HiOutlineGif } from "react-icons/hi2";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { GrEmoji } from "react-icons/gr";
// import { IoMdClose } from "react-icons/io";
// import Send from "../Photos/Send.png";
// import commentIcon from "../Photos/commentIcon.png";
// import save from "../Photos/save.png";
// import { MdPanoramaVerticalSelect } from "react-icons/md";
// import { CiSearch } from "react-icons/ci";
// import { BsCircle } from "react-icons/bs";
// import { AiFillCheckCircle } from "react-icons/ai";
// import CreatePost from "../Components/CreatePost";
// import { BsLink45Deg } from "react-icons/bs";
// import { CiFaceSmile } from "react-icons/ci";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
// import { HiOutlineChevronRight } from "react-icons/hi";
// import { BiCheckCircle } from "react-icons/bi";
// import { NavLink } from "react-router-dom";
// import { GrLocation } from "react-icons/gr";
// import { BiArrowBack } from "react-icons/bi";
// import blockuser from "../Photos/blockuser.png";

// const HomePost = () => {
//   const emojiButtonRef = useRef(null);
//   const pickerRef = useRef(null);
//   const [heart, setHeart] = useState();
//   const [heart1, setHeart1] = useState();
//   const [createPost, setCreatePost] = useState(false);
//   const [showFullContent, setShowFullContent] = useState(false);
//   const [input, setInput] = useState("");
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [showContent, setShowContent] = useState(false);
//   const [shareButton, setShareButton] = useState(false);
//   const [reportButton, setReportButton] = useState(false);
//   const [checked, setChecked] = useState([]);
//   const [showThanku, setThanku] = useState(false);
//   const [showlocation, setShowLacation] = useState(false);
//   const [showgif, setShowgif] = useState(false);
//   const [userBlock, setUserBlock] = useState(false);
//   const [userblocked, setUserBlocked] = useState(false);

//   //  gif data
//   const GifImage = [
//     { id: 1, image: "climberEverest.Webp" },
//     { id: 2, image: "climberEverest.Webp" },
//     { id: 3, image: "climberEverest.Webp" },
//     { id: 4, image: "climberEverest.Webp" },
//     { id: 5, image: "climberEverest.Webp" },
//     { id: 6, image: "climberEverest.Webp" },
//   ];

//   // blocked user
//   const toggleBlockedTab = () => {
//     setUserBlocked(!userblocked);
//   };

//   // block user
//   const toggleBlockTab = () => {
//     setUserBlock(!userBlock);
//   };

//   // location and GIF
//   const toggleLocation = () => {
//     setShowLacation(!showlocation);
//   };

//   const toggleGif = () => {
//     setShowgif(!showgif);
//   };

//   // emoji
//   const addEmoji = (e) => {
//     const sym = e.unified.split("_");
//     const codeArray = [];
//     sym.forEach((el) => codeArray.push("0x" + el));
//     let emoji = String.fromCodePoint(...codeArray);
//     setInput(input + emoji);
//   };

//   // share button functionality
//   const checkList = [
//     {
//       id: 1,
//       name: "Sierra Ferguson",
//       image: "account2.jpg",
//       description: "Works at National Museum",
//     },
//     {
//       id: 2,
//       name: "Sierra Ferguson",
//       image: "account2.jpg",
//       description: "Works at National Museum",
//     },
//     {
//       id: 3,
//       name: "Sierra Ferguson",
//       image: "account2.jpg",
//       description: "Works at National Museum",
//     },
//     {
//       id: 4,
//       name: "Sierra Ferguson",
//       image: "account2.jpg",
//       description: "Works at National Museum",
//     },
//     {
//       id: 5,
//       name: "Sierra Ferguson",
//       image: "account2.jpg",
//       description: "Works at National Museum",
//     },
//     {
//       id: 6,
//       name: "Sierra Ferguson",
//       image: "account2.jpg",
//       description: "Works at National Museum",
//     },
//     {
//       id: 7,
//       name: "Sierra Ferguson",
//       image: "account2.jpg",
//       description: "Works at National Museum",
//     },
//   ];

//   const handleCheck = (event, item) => {
//     if (event.target.checked) {
//       setChecked([...checked, item]);
//     } else {
//       setChecked(checked.filter((checkedItem) => checkedItem.id !== item.id));
//     }
//   };

//   const handleRemoveItem = (item) => {
//     setChecked(checked.filter((checkedItem) => checkedItem.id !== item.id));
//   };

//   const isChecked = (item) => {
//     return checked.some((checkedItem) => checkedItem.id === item.id);
//   };

//   const toggleShareButton = () => {
//     setShareButton(!shareButton);
//   };

//   const toggleContent = () => {
//     setShowContent(!showContent);
//   };

//   const handleInput = (e) => {
//     setInput(e.target.value);
//   };

//   const handleReadMore = () => {
//     setShowFullContent(true);
//   };

//   const toggleReportButton = () => {
//     setReportButton(!reportButton);
//   };

//   const togglethanku = () => {
//     setThanku(!showThanku);
//   };

//   function likeButton() {
//     setHeart(!heart);
//   }
//   function likeButton1() {
//     setHeart1(!heart1);
//   }

//   function open_post() {
//     setCreatePost(true);
//   }

//   const para =
//     "Bethany was running in a half marathon when she began to feel ill. She thought that her celiac disease may have flared up due to something she had eaten, but when she didn’t get better, she decided to see a doctor. What followed was a series of misdiagnoses is the etc";

//   // three dots
//   const [threeDots, setThreeDots] = useState(false);

//   function threeDotsToggle() {
//     setThreeDots(!threeDots);
//   }

//   //outclick from three dots
//   const threeDotsOutClick = useRef(null);

//   const handleClickOutsidethreeDots = (event) => {
//     if (
//       threeDotsOutClick.current &&
//       !threeDotsOutClick.current.contains(event.target)
//     ) {
//       setThreeDots(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutsidethreeDots, true);
//     return () => {
//       document.removeEventListener("click", handleClickOutsidethreeDots, true);
//     };
//   }, []);

//   // emoji
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         (emojiButtonRef.current &&
//           emojiButtonRef.current.contains(event.target)) ||
//         (pickerRef.current && pickerRef.current.contains(event.target))
//       ) {
//         return;
//       }

//       setShowEmoji(false);
//     };
    

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // emoji
//   const handlePickerFocus = () => {
//     setShowEmoji(true);
//   };

//   //vertical calender , appointments and Medicine
//   const [vertical, setVertical] = useState("Upcoming");

//   const toggleVertical = (item) => {
//     setVertical(item);
//   };

//   const [comVal, setComVal] = useState();

//   const takeValue = (e) => {
//     // e.preventDefault()
//     setComVal(e.target.value);
//   };

//   const handleCom = () => console.log(comVal);

//   return (
//     <Page
//       pageContent={
//         <>
//           <div className=" h-[100%] bg-[#FEF8FD] ">
//             <div className="flex 'bg-[#FEF8FD] py-5 px-12">
//               <NavLink to="/Home3">
//                 <h1
//                   className=" text-[22px] px-5 font-bold"
//                   style={{ borderRight: "3px solid #7e7e7e" }}
//                 >
                 
//                   <a href=""> People </a>
//                 </h1>
//               </NavLink>
//               <h1 className=" text-[22px] px-5 font-bold">
//                 <a href=""> Posts </a>
//               </h1>
//             </div>
//             <div className=" lg:flex">
//               {/* background */}
//               <div className="bg-[#FEF8FD] lg:px-0 px-2 w-[100%] lg:flex-row lg:flex">
//                 {/* post */}
//                 <div className="flex flex-col lg:px-16 ">
//                   <div className="text-end"> </div>

//                   <div
//                     className=" lg:p-7 p-4 mt-1 shrink-0  bg-[#C31A7F]  bg-white rounded-[30px] border-[1px] rounded-xl  "
//                     style={{
//                       boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
//                     }}
//                   >
//                     {/* inner container */}
//                     <div className=" flex items-center gap-2">
//                       <FlippingImage />

//                       <div className="flex  w-full items-center justify-between">
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <h1 className="font-semibold">Sierra Ferguson</h1>
//                             <p className="text-xs text-[#7E7E7E]">
//                               1 Day ago 12:45 PM
//                             </p>
//                           </div>

//                           <div className="flex flex-row items-center gap-2">
//                             <p className="text-[12px] font-semibold   text-[#C31A7F]">
//                               Cancer Fighter
//                             </p>
//                           </div>
//                         </div>

//                         {/* three dots */}
//                         <div className="flex  items-center justify-between relative  pb-6">
//                           <div className="flex flex-row items-center ">
//                             <BsThreeDots
//                               className="cursor-pointer"
//                               onClick={threeDotsToggle}
//                             />
//                           </div>

//                           {threeDots && (
//                             <div
//                               className=" w-max h-max bg-white  shadow-2xl absolute top-0 right-7 text-center pt-2 pb-2"
//                               ref={threeDotsOutClick}
//                             >
//                               <p
//                                 className="p-2 px-4 cursor-pointer hover:bg-[#C31A7F] hover:text-[#fff] "
//                                 onClick={toggleBlockTab}
//                               >
//                                 Block Sierra
//                               </p>

//                               {userBlock && (
//                                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
//                                   <div className=" bg-[#FFFFFF] flex flex-col items-center py-10 gap-6 rounded-[30px] px-16 ">
//                                     <div>
//                                       <img
//                                         className="w-14"
//                                         src={blockuser}
//                                         alt="none"
//                                       />
//                                     </div>
//                                     <div className="flex flex-col items-center gap-3">
//                                       <h1 className="  text-[#C31A7F]  text-[18px] font-semibold">
//                                         Block Sierra Ferguson
//                                       </h1>
//                                       <p className="text-[14px] text-[#7E7E7E] font-semibold">
//                                         Do you really want to block this user
//                                       </p>
//                                     </div>
//                                     <div className="flex flex-row items-center gap-5">
//                                       <p
//                                         className="w-20 rounded-lg h-9 bg-transparent border-[#7E7E7E] border-2 flex items-center justify-center text-[14px] text-[#7E7E7E] font-semibold"
//                                         onClick={toggleBlockTab}
//                                       >
//                                         Cancel
//                                       </p>
//                                       <p
//                                         className="w-20 rounded-lg h-9 bg-[#C31A7F] text-[#FFFFFF] flex items-center justify-center text-[14px] font-semibold"
//                                         onClick={toggleBlockedTab}
//                                       >
//                                         Block
//                                       </p>

//                                       {userblocked && (
//                                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
//                                           <div
//                                             className="bg-[#FFFFFF] flex flex-col items-center py-11 gap-7 rounded-[30px] px-32 relative "
//                                             ref={threeDotsOutClick}
//                                           >
//                                             <div className="absolute right-6 top-6  cursor-pointer">
//                                               <IoMdClose
//                                                 size={18}
//                                                 onClick={toggleBlockedTab}
//                                               />
//                                             </div>
//                                             <div>
//                                               <img
//                                                 className="w-28"
//                                                 src={blockuser}
//                                                 alt="none"
//                                               />
//                                             </div>
//                                             <div className="flex flex-col items-center gap-1">
//                                               <h1 className="  text-[#C31A7F] text-[18px] font-semibold">
//                                                 Sierra Ferguson
//                                               </h1>
//                                               <p className="text-[14px] text-[#7E7E7E] font-semibold">
//                                                 Has been Blocked
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}

//                               <NavLink to="/profile">
//                                 <p className="p-2 px-4 cursor-pointer hover:text-[#fff]  hover:bg-[#C31A7F]">
//                                   About this account
//                                 </p>
//                               </NavLink>

//                               <p
//                                 className="p-2 px-4 cursor-pointer hover:text-[#fff] hover:bg-[#C31A7F]"
//                                 onClick={toggleReportButton}
//                               >
//                                 Report Sierra Ferguson
//                               </p>

//                               {reportButton && (
//                                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
//                                   <div className="w-[500px] bg-[#FFFFFF] flex flex-col p-7 gap-3 rounded-[30px] relative">
//                                     <h1 className="text-[18px] font-semibold">
//                                       Report
//                                     </h1>
//                                     <div className="absolute right-6 top-6  cursor-pointer">
//                                       <IoMdClose
//                                         size={18}
//                                         onClick={toggleReportButton}
//                                       />
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-start text-[18px] font-semibold">
//                                       <p>Why are you reporting this post</p>
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         It's a spam
//                                       </p>
//                                       <HiOutlineChevronRight
//                                         className="cursor-pointer"
//                                         color="#7E7E7E"
//                                         onClick={togglethanku}
//                                       />

//                                       {showThanku && (
//                                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
//                                           <div className="w-[430px] bg-[#FFFFFF] flex flex-col items-center p-14 gap-7 rounded-[30px]">
//                                             <div>
//                                               <BiCheckCircle
//                                                 color="#C31A7F"
//                                                 size={75}
//                                               />
//                                             </div>

//                                             <div className="flex flex-col gap-2">
//                                               <h1 className="text-[18px] font-semibold">
//                                                 Thanks for letting us know
//                                               </h1>
//                                               <p className="text-[14px] text-[#7E7E7E] font-semibold">
//                                                 Your feedback is important in
//                                                 helping us keep the CAN
//                                                 community safe
//                                               </p>
//                                             </div>

//                                             <div
//                                               className="w-40 h-9 flex items-center justify-center rounded-[10px] bg-[#C31A7F] "
//                                               onClick={togglethanku}
//                                             >
//                                               <p className="text-[#FFFFFF] text-[13px] font-semibold cursor-pointer">
//                                                 Close
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       )}
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         Hate speech or symbols
//                                       </p>
//                                       <HiOutlineChevronRight color="#7E7E7E" />
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         Violence of dangerous organization
//                                       </p>
//                                       <HiOutlineChevronRight color="#7E7E7E" />
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         False information
//                                       </p>
//                                       <HiOutlineChevronRight color="#7E7E7E" />
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         I just don't like it
//                                       </p>
//                                       <HiOutlineChevronRight color="#7E7E7E" />
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* inner container text */}
//                     <div className="pt-5">
//                       <h1 className="text-[16px] md:text-[24px] font-semibold">
//                         Cancer Survivor Stories: Bethany
//                       </h1>
//                       <p className="py-2 text-[#484848] text-[13px] font-semibold text-left md:shrink-0 md:text-left md:text-[14px] ">
//                         {showFullContent ? para : para?.slice(0, 250) + "..."}
//                         {para?.length > 250 && !showFullContent && (
//                           <button
//                             className="text-black font-semibold underline text-[13px] md:text-[14px] cursor-pointer"
//                             onClick={handleReadMore}
//                           >
//                             Read More
//                           </button>
//                         )}
//                       </p>
//                     </div>

//                     {/* Image */}
//                     <div className="pt-3 ">
//                       <div className=" rounded-3xl ">
//                         <img
//                           src={climberEverest}
//                           alt="none"
//                           className="object-cover rounded-3xl h-[200px] md:h-[350px] lg:h-[350px] w-full"
//                         />
//                       </div>
//                     </div>

//                     <div className=" pt-7 flex justify-between">
//                       <div className="flex  items-center gap-7">
//                         <div
//                           className="flex flex-row gap-2 items-center"
//                           onClick={likeButton}
//                         >
//                           {heart ? (
//                             <AiFillHeart
//                               className="cursor-pointer"
//                               size={24}
//                               color="red"
//                             />
//                           ) : (
//                             <AiOutlineHeart
//                               className="cursor-pointer"
//                               size={24}
//                             />
//                           )}
//                           <p className="text-[12px] font-bold">2.2k</p>
//                         </div>

//                         {/* comment button */}

//                         <div>
//                           <div className="flex flex-row items-center gap-2">
//                             <img
//                               src={commentIcon}
//                               className="w-6 cursor-pointer"
//                               alt="none"
//                               onClick={toggleContent}
//                             />
//                             <p className="text-[12px] font-bold">2.2k</p>
//                           </div>

//                           {showContent && (
//                             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-4">
//                               <div className="lg:w-[70%] lg:h-[60%]  bg-[#FDF4F9] rounded-3xl flex flex-col lg:flex lg:flex-row overflow-hidden">
//                                 {/* Left side (Photo) */}
//                                 <div className="lg:w-[60%] ">
//                                   <img
//                                     src={climberEverest}
//                                     alt="none"
//                                     className="object-cover w-full h-full"
//                                   />
//                                 </div>

//                                 {/* Right side (Details) */}
//                                 <div className="lg:w-[40%] flex flex-col justify-between gap-4 p-4 relative">
//                                   <div>
//                                     <div className=" flex h-max items-center gap-2">
//                                       <div className="rounded-full overflow-hidden  h-max w-[20%]">
//                                         <img
//                                           src={account}
//                                           alt="none"
//                                           className=""
//                                         />
//                                       </div>

//                                       <div className="flex flex-col  w-full">
//                                         <div className="flex flex-row items-center justify-between w-full">
//                                           <div className="flex flex-row gap-2 items-center">
//                                             <h1 className="font-semibold">
//                                               Sierra Ferguson
//                                             </h1>
//                                             <p className="text-xs text-[#7E7E7E]">
//                                               15 hrs ago
//                                             </p>
//                                           </div>

//                                           <div
//                                             className="cursor-pointer absolute right-8 top- lg:right- lg:"
//                                             onClick={toggleContent}
//                                           >
//                                             <IoMdClose className="lg:text-[#000] " />
//                                           </div>
//                                         </div>

//                                         <div className="flex gap-2 items-center ">
//                                           <h1 className="text-xs font-semibold   text-[#C31A7F]">
//                                             Cancer Fighter
//                                           </h1>
//                                         </div>
//                                       </div>
//                                     </div>

//                                     {/* heading */}
//                                     <div className="font-semibold">
//                                       <h1>Cancer Survivor Stories: Bethany</h1>
//                                     </div>

//                                     {/* content */}
//                                     <div className="text-[80%]">
//                                       Bethany was running in a half marathon
//                                       when she began to feel ill. She thought
//                                       that her celiac disease may have flared up
//                                       due to something she had eaten, but when
//                                       she didn’t get better, she decided to see
//                                       a doctor. What followed was a series of
//                                       misdiagnoses celiac disease may have
//                                       flared up due to something she had eaten,
//                                       but when she didn’t get better, she
//                                       decided to see a doctor.
//                                     </div>

//                                     {/* comments */}
//                                     <div className="mt-4 flex items-center gap-2">
//                                       <div className="w-[10%] rounded-full overflow-hidden">
//                                         <img src={account} alt="none" />
//                                       </div>

//                                       <div className="w-full">
//                                         <div className="flex justify-between items-center">
//                                           <div className="flex items-center gap-3">
//                                             <h1 className="font-semibold">
//                                               Sierra Ferguson
//                                             </h1>
//                                             <p className="text-xs   text-[#C31A7F]">
//                                               Cancer Fighter
//                                             </p>
//                                             <p className="text-xs items-center">
//                                               <AiOutlineHeart />
//                                             </p>
//                                           </div>
//                                           <div className="text-xs text-[#7E7E7E]">
//                                             15 hrs ago
//                                           </div>
//                                         </div>
//                                         <div className="text-sm">
//                                           better luck next time
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   {/* input section */}
//                                   <div className=" bottom-4">
//                                     <div className="flex gap-3 w-full bg-transparent">
//                                       <img
//                                         src={account}
//                                         alt="none"
//                                         className="rounded-full w-[10%] h-[60%] shadow-md "
//                                       />
//                                       <input
//                                         placeholder="Write here..."
//                                         onChange={(e) => takeValue}
//                                         className="outline-none w-full bg-transparent "
//                                       />
//                                     </div>
//                                     <div className="flex justify-between mt-2">
//                                       <div className="flex flex-row gap-5 items-center">
//                                         <img
//                                           src={gallery}
//                                           className="w-5 cursor-pointer"
//                                           alt="none"
//                                         />
//                                         <img
//                                           src={gificon}
//                                           className="w-5"
//                                           alt="none"
//                                         />
//                                         <img
//                                           src={location}
//                                           className="w-5"
//                                           alt="none"
//                                         />
//                                         <img
//                                           src={smily}
//                                           className="w-5"
//                                           alt="none"
//                                         />
//                                       </div>
//                                       <div
//                                         onClick={handleCom}
//                                         className="bg-[#C31A7F] text-white cursor-pointer  px-10 px-6 rounded-xl"
//                                       >
//                                         Post
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* share button */}
//                         <div>
//                           <div className="flex flex-row items-center gap-2">
//                             <img
//                               className="w-6 cursor-pointer"
//                               src={Send}
//                               alt="none"
//                               onClick={toggleShareButton}
//                             />
//                             <p className="text-[12px] font-bold">2.2k Shares</p>
//                           </div>
//                           {shareButton && (
//                             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
//                               <div className=" ">
//                                 <div className="lg:w-[500px]   w-[350px] bg-[#FFFFFF] flex flex-col gap-5 rounded-[20px]  ">
//                                   <div>
//                                     <div className="flex flex-row items-center justify-center relative pt-4 ">
//                                       <h1 className="text-[16px] font-semibold">
//                                         Share with your friends
//                                       </h1>
//                                       <div
//                                         onClick={toggleShareButton}
//                                         className="absolute right-3 cursor-pointer"
//                                       >
//                                         <IoMdClose />
//                                       </div>
//                                     </div>
//                                     <div className=" relative p-4">
//                                       <CiSearch
//                                         size={20}
//                                         className="absolute top-6 left-6 "
//                                       />

//                                       <input
//                                         placeholder="Search Friends"
//                                         className=" w-full h-9 outline-none rounded-[15px] px-10 placeholder:text-[12px] placeholder:font-semibold   bg-[#FEF8FD]  "
//                                       />
//                                     </div>

//                                     <div className="flex flex-wrap gap-2 items-center justify-center  w-fit h-[50px]  px-3 overflow-y-scroll ">
//                                       {checked.map((item) => (
//                                         <div
//                                           key={item.id}
//                                           className={`h-8 w-36
//                                                                                       flex items-center justify-center rounded-[15px] bg-[#c31a7f3c] relative  transition-opacity ease-in-out duration-300 mx-1 text-[12px] font-semibold ${isChecked(
//                                                                                         item
//                                                                                       )}`}
//                                         >
//                                           {/* <div className='absolute text-white left-32 bottom-5 bg-[#C31A7F] rounded-full h-4 w-4   cursor-pointer ' onClick={() => handleRemoveItem(item)}>
//                                                                                         <p className='text-[8px] flex items-center justify-center text-center'>x</p>
//                                                                                     </div> */}
//                                           <div
//                                             className="absolute -right-1 -top-1   bg-[#C31A7F] h-4 w-4 flex items-center justify-center rounded-full cursor-pointer"
//                                             onClick={() =>
//                                               handleRemoveItem(item)
//                                             }
//                                           >
//                                             <p className="text-[#FFFFFF] pb-0.5 text-[10px]">
//                                               x
//                                             </p>
//                                           </div>
//                                           {item.name}
//                                         </div>
//                                       ))}
//                                     </div>
//                                     <div className="h-[200px] overflow-y-scroll ">
//                                       {checkList.map((item) => (
//                                         <div
//                                           key={item.id}
//                                           className="flex py-3 px-3 flex-row items-center justify-between"
//                                         >
//                                           <div className="flex flex-row items-center gap-2 ">
//                                             <img
//                                               src={item.image}
//                                               className="h-10 w-10 rounded-full"
//                                               alt={item.name}
//                                             />
//                                             <div className="flex flex-col items-start gap-1  ">
//                                               <span
//                                                 className={`${isChecked(
//                                                   item
//                                                 )} text-[14px] font-semibold`}
//                                               >
//                                                 {item.name}
//                                               </span>
//                                               <span
//                                                 className={`${isChecked(
//                                                   item
//                                                 )} text-[10px] `}
//                                               >
//                                                 {item.description}
//                                               </span>
//                                             </div>
//                                           </div>

//                                           <input
//                                             className="accent-[#C31A7F] w-4 h-4 cursor-pointer"
//                                             value={item}
//                                             type="checkbox"
//                                             checked={isChecked(item)}
//                                             onChange={(event) =>
//                                               handleCheck(event, item)
//                                             }
//                                           />
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                   <div className="w-full bg-[#FEF8FD] rounded-b-[20px]  ">
//                                     <div className="p-4 flex flex-row items-center ">
//                                       <div className="flex flex-row gap-2 items-center w-full">
//                                         <img
//                                           className="h-7 w-7 rounded-full"
//                                           src={account}
//                                           alt="none"
//                                         />
//                                         <input
//                                           type="text"
//                                           placeholder="write here"
//                                           className="bg-transparent w-full outline-none"
//                                         />
//                                       </div>
//                                       <div>
//                                         <CiFaceSmile />
//                                       </div>
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex flex-row justify-between p-4">
//                                       <div className="flex flex-row items-center gap-2">
//                                         <BsLink45Deg color="#C31A7F" />
//                                         <p className="text-[12px]   text-[#C31A7F] font-semibold">
//                                           Copy NavLink
//                                         </p>
//                                       </div>
//                                       <div className="w-16 h-7 flex items-center justify-center bg-[#efc419] text-[12px] font-semibold text-[#FFFFFF] rounded-[12px]">
//                                         share
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* save button */}
//                       <div className="flex flex-row items-center gap-2">
//                         <img src={save} className="w-6" alt="none" />
//                         <p className="text-[12px] font-bold">Save</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     className=" lg:p-7 p-4 mt-5 shrink-0  bg-[#C31A7F]  bg-white rounded-[30px] border-[1px] rounded-xl  "
//                     style={{
//                       boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)",
//                     }}
//                   >
//                     {/* inner container */}
//                     <div className=" flex items-center gap-2">
//                       <FlippingImage />

//                       <div className="flex  w-full items-center justify-between">
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <h1 className="font-semibold">Sierra Ferguson</h1>
//                             <p className="text-xs text-[#7E7E7E]">
//                               1 Day ago 12:45 PM
//                             </p>
//                           </div>

//                           <div className="flex flex-row items-center gap-2">
//                             <p className="text-[12px] font-semibold   text-[#C31A7F]">
//                               Cancer Fighter
//                             </p>
//                           </div>
//                         </div>

//                         {/* three dots */}
//                         <div className="flex  items-center justify-between relative  pb-6">
//                           <div className="flex flex-row items-center ">
//                             <BsThreeDots
//                               className="cursor-pointer"
//                               onClick={threeDotsToggle}
//                             />
//                           </div>

//                           {threeDots && (
//                             <div
//                               className=" w-max h-max bg-white  shadow-2xl absolute top-0 right-7 text-center pt-2 pb-2"
//                               ref={threeDotsOutClick}
//                             >
//                               <p
//                                 className="p-2 px-4 cursor-pointer hover:bg-[#C31A7F] hover:text-[#fff] "
//                                 onClick={toggleBlockTab}
//                               >
//                                 Block Sierra
//                               </p>

//                               {userBlock && (
//                                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
//                                   <div className=" bg-[#FFFFFF] flex flex-col items-center py-10 gap-6 rounded-[30px] px-16 ">
//                                     <div>
//                                       <img
//                                         className="w-14"
//                                         src={blockuser}
//                                         alt="none"
//                                       />
//                                     </div>
//                                     <div className="flex flex-col items-center gap-3">
//                                       <h1 className="  text-[#C31A7F]  text-[18px] font-semibold">
//                                         Block Sierra Ferguson
//                                       </h1>
//                                       <p className="text-[14px] text-[#7E7E7E] font-semibold">
//                                         Do you really want to block this user
//                                       </p>
//                                     </div>
//                                     <div className="flex flex-row items-center gap-5">
//                                       <p
//                                         className="w-20 rounded-lg h-9 bg-transparent border-[#7E7E7E] border-2 flex items-center justify-center text-[14px] text-[#7E7E7E] font-semibold"
//                                         onClick={toggleBlockTab}
//                                       >
//                                         Cancel
//                                       </p>
//                                       <p
//                                         className="w-20 rounded-lg h-9 bg-[#C31A7F] text-[#FFFFFF] flex items-center justify-center text-[14px] font-semibold"
//                                         onClick={toggleBlockedTab}
//                                       >
//                                         Block
//                                       </p>

//                                       {userblocked && (
//                                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
//                                           <div
//                                             className="bg-[#FFFFFF] flex flex-col items-center py-11 gap-7 rounded-[30px] px-32 relative "
//                                             ref={threeDotsOutClick}
//                                           >
//                                             <div className="absolute right-6 top-6  cursor-pointer">
//                                               <IoMdClose
//                                                 size={18}
//                                                 onClick={toggleBlockedTab}
//                                               />
//                                             </div>
//                                             <div>
//                                               <img
//                                                 className="w-28"
//                                                 src={blockuser}
//                                                 alt="none"
//                                               />
//                                             </div>
//                                             <div className="flex flex-col items-center gap-1">
//                                               <h1 className="  text-[#C31A7F] text-[18px] font-semibold">
//                                                 Sierra Ferguson
//                                               </h1>
//                                               <p className="text-[14px] text-[#7E7E7E] font-semibold">
//                                                 Has been Blocked
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}

//                               <NavLink to="/profile">
//                                 <p className="p-2 px-4 cursor-pointer hover:text-[#fff]  hover:bg-[#C31A7F]">
//                                   About this account
//                                 </p>
//                               </NavLink>

//                               <p
//                                 className="p-2 px-4 cursor-pointer hover:text-[#fff] hover:bg-[#C31A7F]"
//                                 onClick={toggleReportButton}
//                               >
//                                 Report Sierra Ferguson
//                               </p>

//                               {reportButton && (
//                                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
//                                   <div className="w-[500px] bg-[#FFFFFF] flex flex-col p-7 gap-3 rounded-[30px] relative">
//                                     <h1 className="text-[18px] font-semibold">
//                                       Report
//                                     </h1>
//                                     <div className="absolute right-6 top-6  cursor-pointer">
//                                       <IoMdClose
//                                         size={18}
//                                         onClick={toggleReportButton}
//                                       />
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-start text-[18px] font-semibold">
//                                       <p>Why are you reporting this post</p>
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         It's a spam
//                                       </p>
//                                       <HiOutlineChevronRight
//                                         className="cursor-pointer"
//                                         color="#7E7E7E"
//                                         onClick={togglethanku}
//                                       />

//                                       {showThanku && (
//                                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2">
//                                           <div className="w-[430px] bg-[#FFFFFF] flex flex-col items-center p-14 gap-7 rounded-[30px]">
//                                             <div>
//                                               <BiCheckCircle
//                                                 color="#C31A7F"
//                                                 size={75}
//                                               />
//                                             </div>

//                                             <div className="flex flex-col gap-2">
//                                               <h1 className="text-[18px] font-semibold">
//                                                 Thanks for letting us know
//                                               </h1>
//                                               <p className="text-[14px] text-[#7E7E7E] font-semibold">
//                                                 Your feedback is important in
//                                                 helping us keep the CAN
//                                                 community safe
//                                               </p>
//                                             </div>

//                                             <div
//                                               className="w-40 h-9 flex items-center justify-center rounded-[10px] bg-[#C31A7F] "
//                                               onClick={togglethanku}
//                                             >
//                                               <p className="text-[#FFFFFF] text-[13px] font-semibold cursor-pointer">
//                                                 Close
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       )}
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         Hate speech or symbols
//                                       </p>
//                                       <HiOutlineChevronRight color="#7E7E7E" />
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         Violence of dangerous organization
//                                       </p>
//                                       <HiOutlineChevronRight color="#7E7E7E" />
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         False information
//                                       </p>
//                                       <HiOutlineChevronRight color="#7E7E7E" />
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex items-center justify-between text-center">
//                                       <p className="text-[14px] font-semibold">
//                                         I just don't like it
//                                       </p>
//                                       <HiOutlineChevronRight color="#7E7E7E" />
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* inner container text */}
//                     <div className="pt-5">
//                       <h1 className="text-[16px] md:text-[24px] font-semibold">
//                         Cancer Survivor Stories: Bethany
//                       </h1>
//                       <p className="py-2 text-[#484848] text-[13px] font-semibold text-left md:shrink-0 md:text-left md:text-[14px] ">
//                         {showFullContent ? para : para?.slice(0, 250) + "..."}
//                         {para?.length > 250 && !showFullContent && (
//                           <button
//                             className="text-black font-semibold underline text-[13px] md:text-[14px] cursor-pointer"
//                             onClick={handleReadMore}
//                           >
//                             Read More
//                           </button>
//                         )}
//                       </p>
//                     </div>

//                     {/* Image */}
//                     <div className="pt-3 ">
//                       <div className=" rounded-3xl ">
//                         <img
//                           src={climberEverest}
//                           alt="none"
//                           className="object-cover rounded-3xl h-[200px] md:h-[350px] lg:h-[350px] w-full"
//                         />
//                       </div>
//                     </div>

//                     <div className=" pt-7 flex justify-between">
//                       <div className="flex  items-center gap-7">
//                         <div
//                           className="flex flex-row gap-2 items-center"
//                           onClick={likeButton}
//                         >
//                           {heart ? (
//                             <AiFillHeart
//                               className="cursor-pointer"
//                               size={24}
//                               color="red"
//                             />
//                           ) : (
//                             <AiOutlineHeart
//                               className="cursor-pointer"
//                               size={24}
//                             />
//                           )}
//                           <p className="text-[12px] font-bold">2.2k</p>
//                         </div>

//                         {/* comment button */}

//                         <div>
//                           <div className="flex flex-row items-center gap-2">
//                             <img
//                               src={commentIcon}
//                               className="w-6 cursor-pointer"
//                               alt="none"
//                               onClick={toggleContent}
//                             />
//                             <p className="text-[12px] font-bold">2.2k</p>
//                           </div>

//                           {showContent && (
//                             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-4">
//                               <div className="lg:w-[70%] lg:h-[60%]  bg-[#FDF4F9] rounded-3xl flex flex-col lg:flex lg:flex-row overflow-hidden">
//                                 {/* Left side (Photo) */}
//                                 <div className="lg:w-[60%] ">
//                                   <img
//                                     src={climberEverest}
//                                     alt="none"
//                                     className="object-cover w-full h-full"
//                                   />
//                                 </div>

//                                 {/* Right side (Details) */}
//                                 <div className="lg:w-[40%] flex flex-col justify-between gap-4 p-4 relative">
//                                   <div>
//                                     <div className=" flex h-max items-center gap-2">
//                                       <div className="rounded-full overflow-hidden  h-max w-[20%]">
//                                         <img
//                                           src={account}
//                                           alt="none"
//                                           className=""
//                                         />
//                                       </div>

//                                       <div className="flex flex-col  w-full">
//                                         <div className="flex flex-row items-center justify-between w-full">
//                                           <div className="flex flex-row gap-2 items-center">
//                                             <h1 className="font-semibold">
//                                               Sierra Ferguson
//                                             </h1>
//                                             <p className="text-xs text-[#7E7E7E]">
//                                               15 hrs ago
//                                             </p>
//                                           </div>

//                                           <div
//                                             className="cursor-pointer absolute right-8 top- lg:right- lg:"
//                                             onClick={toggleContent}
//                                           >
//                                             <IoMdClose className="lg:text-[#000] " />
//                                           </div>
//                                         </div>

//                                         <div className="flex gap-2 items-center ">
//                                           <h1 className="text-xs p-2 px-4 bg-[#efc4194c] rounded-2xl">
//                                             Blogger
//                                           </h1>
//                                           <h1 className="text-xs font-semibold   text-[#C31A7F]">
//                                             Cancer Fighter
//                                           </h1>
//                                         </div>
//                                       </div>
//                                     </div>

//                                     {/* heading */}
//                                     <div className="font-semibold">
//                                       <h1>Cancer Survivor Stories: Bethany</h1>
//                                     </div>

//                                     {/* content */}
//                                     <div className="text-[80%]">
//                                       Bethany was running in a half marathon
//                                       when she began to feel ill. She thought
//                                       that her celiac disease may have flared up
//                                       due to something she had eaten, but when
//                                       she didn’t get better, she decided to see
//                                       a doctor. What followed was a series of
//                                       misdiagnoses celiac disease may have
//                                       flared up due to something she had eaten,
//                                       but when she didn’t get better, she
//                                       decided to see a doctor.
//                                     </div>

//                                     {/* comments */}
//                                     <div className="mt-4 flex items-center gap-2">
//                                       <div className="w-[10%] rounded-full overflow-hidden">
//                                         <img src={account} alt="none" />
//                                       </div>

//                                       <div className="w-full">
//                                         <div className="flex justify-between items-center">
//                                           <div className="flex items-center gap-3">
//                                             <h1 className="font-semibold">
//                                               Sierra Ferguson
//                                             </h1>
//                                             <p className="text-xs   text-[#C31A7F]">
//                                               Cancer Fighter
//                                             </p>
//                                             <p className="text-xs items-center">
//                                               <AiOutlineHeart />
//                                             </p>
//                                           </div>
//                                           <div className="text-xs text-[#7E7E7E]">
//                                             15 hrs ago
//                                           </div>
//                                         </div>
//                                         <div className="text-sm">
//                                           better luck next time
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   {/* input section */}
//                                   <div className=" bottom-4">
//                                     <div className="flex gap-3 w-full bg-transparent">
//                                       <img
//                                         src={account}
//                                         alt="none"
//                                         className="rounded-full w-[10%] h-[60%] shadow-md "
//                                       />
//                                       <input
//                                         placeholder="Write here..."
//                                         onChange={(e) => takeValue}
//                                         className="outline-none w-full bg-transparent "
//                                       />
//                                     </div>
//                                     <div className="flex justify-between mt-2">
//                                       <div className="flex flex-row gap-5 items-center">
//                                         <img
//                                           src={gallery}
//                                           className="w-5 cursor-pointer"
//                                           alt="none"
//                                         />
//                                         <img
//                                           src={gificon}
//                                           className="w-5"
//                                           alt="none"
//                                         />
//                                         <img
//                                           src={location}
//                                           className="w-5"
//                                           alt="none"
//                                         />
//                                         <img
//                                           src={smily}
//                                           className="w-5"
//                                           alt="none"
//                                         />
//                                       </div>
//                                       <div
//                                         onClick={handleCom}
//                                         className="bg-[#C31A7F] text-white cursor-pointer  px-10 px-6 rounded-xl"
//                                       >
//                                         Post
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* share button */}
//                         <div>
//                           <div className="flex flex-row items-center gap-2">
//                             <img
//                               className="w-6 cursor-pointer"
//                               src={Send}
//                               alt="none"
//                               onClick={toggleShareButton}
//                             />
//                             <p className="text-[12px] font-bold">2.2k Shares</p>
//                           </div>
//                           {shareButton && (
//                             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
//                               <div className=" ">
//                                 <div className="lg:w-[500px]   w-[350px] bg-[#FFFFFF] flex flex-col gap-5 rounded-[20px]  ">
//                                   <div>
//                                     <div className="flex flex-row items-center justify-center relative pt-4 ">
//                                       <h1 className="text-[16px] font-semibold">
//                                         Share with your friends
//                                       </h1>
//                                       <div
//                                         onClick={toggleShareButton}
//                                         className="absolute right-3 cursor-pointer"
//                                       >
//                                         <IoMdClose />
//                                       </div>
//                                     </div>
//                                     <div className=" relative p-4">
//                                       <CiSearch
//                                         size={20}
//                                         className="absolute top-6 left-6 "
//                                       />

//                                       <input
//                                         placeholder="Search Friends"
//                                         className=" w-full h-9 outline-none rounded-[15px] px-10 placeholder:text-[12px] placeholder:font-semibold   bg-[#FEF8FD]  "
//                                       />
//                                     </div>

//                                     <div className="flex flex-wrap gap-2 items-center justify-center  w-fit h-[50px]  px-3 overflow-y-scroll ">
//                                       {checked.map((item) => (
//                                         <div
//                                           key={item.id}
//                                           className={`h-8 w-36
//                                                                                       flex items-center justify-center rounded-[15px] bg-[#c31a7f3c] relative  transition-opacity ease-in-out duration-300 mx-1 text-[12px] font-semibold ${isChecked(
//                                                                                         item
//                                                                                       )}`}
//                                         >
//                                           {/* <div className='absolute text-white left-32 bottom-5 bg-[#C31A7F] rounded-full h-4 w-4   cursor-pointer ' onClick={() => handleRemoveItem(item)}>
//                                                                                         <p className='text-[8px] flex items-center justify-center text-center'>x</p>
//                                                                                     </div> */}
//                                           <div
//                                             className="absolute -right-1 -top-1   bg-[#C31A7F] h-4 w-4 flex items-center justify-center rounded-full cursor-pointer"
//                                             onClick={() =>
//                                               handleRemoveItem(item)
//                                             }
//                                           >
//                                             <p className="text-[#FFFFFF] pb-0.5 text-[10px]">
//                                               x
//                                             </p>
//                                           </div>
//                                           {item.name}
//                                         </div>
//                                       ))}
//                                     </div>
//                                     <div className="h-[200px] overflow-y-scroll ">
//                                       {checkList.map((item) => (
//                                         <div
//                                           key={item.id}
//                                           className="flex py-3 px-3 flex-row items-center justify-between"
//                                         >
//                                           <div className="flex flex-row items-center gap-2 ">
//                                             <img
//                                               src={item.image}
//                                               className="h-10 w-10 rounded-full"
//                                               alt={item.name}
//                                             />
//                                             <div className="flex flex-col items-start gap-1  ">
//                                               <span
//                                                 className={`${isChecked(
//                                                   item
//                                                 )} text-[14px] font-semibold`}
//                                               >
//                                                 {item.name}
//                                               </span>
//                                               <span
//                                                 className={`${isChecked(
//                                                   item
//                                                 )} text-[10px] `}
//                                               >
//                                                 {item.description}
//                                               </span>
//                                             </div>
//                                           </div>

//                                           <input
//                                             className="accent-[#C31A7F] w-4 h-4 cursor-pointer"
//                                             value={item}
//                                             type="checkbox"
//                                             checked={isChecked(item)}
//                                             onChange={(event) =>
//                                               handleCheck(event, item)
//                                             }
//                                           />
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                   <div className="w-full bg-[#FEF8FD] rounded-b-[20px]  ">
//                                     <div className="p-4 flex flex-row items-center ">
//                                       <div className="flex flex-row gap-2 items-center w-full">
//                                         <img
//                                           className="h-7 w-7 rounded-full"
//                                           src={account}
//                                           alt="none"
//                                         />
//                                         <input
//                                           type="text"
//                                           placeholder="write here"
//                                           className="bg-transparent w-full outline-none"
//                                         />
//                                       </div>
//                                       <div>
//                                         <CiFaceSmile />
//                                       </div>
//                                     </div>
//                                     <div>
//                                       <hr />
//                                     </div>
//                                     <div className="flex flex-row justify-between p-4">
//                                       <div className="flex flex-row items-center gap-2">
//                                         <BsLink45Deg color="#C31A7F" />
//                                         <p className="text-[12px]   text-[#C31A7F] font-semibold">
//                                           Copy NavLink
//                                         </p>
//                                       </div>
//                                       <div className="w-16 h-7 flex items-center justify-center bg-[#efc419] text-[12px] font-semibold text-[#FFFFFF] rounded-[12px]">
//                                         share
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* save button */}
//                       <div className="flex flex-row items-center gap-2">
//                         <img src={save} className="w-6" alt="none" />
//                         <p className="text-[12px] font-bold">Save</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="lg:flex lg:flex-col lg:gap-4 lg:items-center lg:pr-12 hidden lg:block   ">
//                   {/* right side */}

//                   <div className="  p-5 rounded-[30px]  bg-[#FFFFFF] border-[0.5px] border-[#C31A7F33]">
//                     <p className="flex flex-wrap text-center text-[17px] font-semibold">
//                       What time is best suited for you to join the meeting?
//                     </p>

//                     <div className="flex flex-col gap-4">
//                       <div className="flex flex-row items-center justify-center gap-3 pt-3">
//                         <div className="w-24 h-9 bg-[#C31A7F] text-[#FFFFFF] cursor-pointer flex flex-row items-center justify-center rounded-[15px] ">
//                           <p>8:00</p>
//                           <p>PM</p>
//                         </div>
//                         <div className="w-24 h-9 bg-[#FFFFFF]   text-[#C31A7F] cursor-pointer flex flex-row items-center border-[1px] border-[#C31A7F] justify-center rounded-[15px]">
//                           <p>9:00</p>
//                           <p>PM</p>
//                         </div>
//                         <div className="w-24 h-9 bg-[#FFFFFF]   text-[#C31A7F] cursor-pointer flex flex-row items-center border-[1px] border-[#C31A7F] justify-center rounded-[15px]">
//                           <p>12:00</p>
//                           <p>AM</p>
//                         </div>
//                       </div>
//                       <div className="flex flex-row items-center justify-center gap-3">
//                         <div className="w-2 h-2 rounded-full bg-[#C31A7F]"></div>
//                         <div className="w-2 h-2 rounded-full bg-[#E7E7E7]"></div>
//                         <div className="w-2 h-2 rounded-full bg-[#E7E7E7]"></div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-[110%]  px-4  relative">
//                     <div>
//                       <div
//                         className="bg-gradient-to-r from-[#D4F1FF] to-[#FFFFFF] h-[230px] w-full rounded-[30px] border-[1px] border-solid border-[#D9EAFF]   "
//                         style={{
//                           boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
//                         }}
//                       >
//                         <img
//                           src={premium}
//                           className=" h-[230px] w-[50%] top-[0%] left-[43%] relative"
//                           alt="none"
//                         />
//                       </div>

//                       <div className="text-center w-max absolute top-[18%] left-[20%] font-semibold">
//                         <h1>Try Premium</h1>
//                         <h1>for free</h1>
//                       </div>

//                       <div className="w-max absolute top-[45%] left-[20%] text-xs text-[#00000073]">
//                         One month free
//                       </div>

//                       <NavLink to="/Subscription_Models">
//                         <div className="w-max absolute top-[65%] left-[10%] bg-gradient-to-r from-[#efc41955] to-[#ed839a54] p-2 px-8 rounded-2xl">
//                           View More
//                         </div>
//                       </NavLink>
//                     </div>
//                   </div>

//                   {/* calender */}
//                   <div
//                     className=" w-[100%] p-6 bg-white max-h-screen relative  rounded-[30px]  overflow-hidden border-[1px] border-solid border-[#D9EAFF]  "
//                     style={{
//                       boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)",
//                     }}
//                   >
//                     <div className=" flex items-center ">
//                       <SingleLineCalendar />
//                     </div>

//                     <div className="p-4">
//                       <hr />
//                     </div>

//                     <div className=" text-[14px]  flex flex-row items-center justify-center gap-6">
//                       <h1
//                         onClick={() => toggleVertical("Upcoming")}
//                         className={
//                           vertical === "Upcoming"
//                             ? "text-black font-semibold transition-all duration-300"
//                             : "text-[#C4C4C4] font-semibold cursor-pointer"
//                         }
//                       >
//                         Upcoming
//                       </h1>
//                       <h1
//                         onClick={() => toggleVertical("Appointment")}
//                         className={
//                           vertical === "Appointment"
//                             ? "text-black font-semibold transition-all duration-300"
//                             : "text-[#C4C4C4] font-semibold cursor-pointer"
//                         }
//                       >
//                         Appointment
//                       </h1>
//                       <h1
//                         onClick={() => toggleVertical("Medicines")}
//                         className={
//                           vertical === "Medicines"
//                             ? "text-black font-semibold transition-all duration-300"
//                             : "text-[#C4C4C4] font-semibold cursor-pointer"
//                         }
//                       >
//                         Medicines
//                       </h1>
//                     </div>

//                     <div className="">
//                       <div className="flex flex-col">
//                         {vertical === "Upcoming" && (
//                           <div className="w-full mt-4 ">
//                             <VerticalSLC />
//                           </div>
//                         )}
//                         {vertical === "Appointment" && (
//                           <div className="w-full mt-4">
//                             <VerticalAppointment />
//                           </div>
//                         )}
//                         {vertical === "Medicines" && (
//                           <div className="w-full mt-4">
//                             <VerticalMedicine />
//                           </div>
//                         )}

//                         <div className="w-full h-[10%] mt-7 top-[90%] bg-white flex justify-center items-center font-semibold">
//                           <div className="bg-[#c31a7f3c] flex items-center h-10 gap-2 pl-2 rounded-3xl">
//                             {vertical === "Upcoming" && (
//                               <div className="flex flex-row px-4 items-center  cursor-pointer text-[15px]">
//                                 <p>View all schedule</p>
//                                 <RiArrowDropDownLine size={26} />
//                               </div>
//                             )}
//                             {vertical === "Appointment" && (
//                               <div className="flex flex-row px-4 items-center cursor-pointer text-[15px]">
//                                 <p>View all schedule</p>
//                                 <RiArrowDropDownLine size={26} />
//                               </div>
//                             )}
//                             {vertical === "Medicines" && (
//                               <div className="flex flex-row px-4 ite-center  cursor-pointer test-[15px]">
//                                 <p>View all</p>
//                                 <RiArrowDropDownLine size={26} />
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* floating chat */}
//             <FloatingChat />

//             {/* emoji  */}
//             {showEmoji && (
//               <div
//                 className="absolute top-52   left-3  lg:top-56 lg:left-96"
//                 ref={pickerRef}
//               >
//                 <Picker
//                   data={data}
//                   emojiSize={26}
//                   emojiButtonSize={34}
//                   onEmojiSelect={addEmoji}
//                   maxFrequentRows={0}
//                   theme="light"
//                   category="apple"
//                   autoFocus={true}
//                   onFocus={handlePickerFocus}
//                   icons="solid"
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       }
//     />
//   );
// };

// export default HomePost;

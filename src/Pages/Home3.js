// import React, { useEffect, useRef, useState } from 'react'
// import HomeNav from '../Components/HomeNav'
// import VerticalAppointment from '../Components/VerticalAppointment'
// import VerticalMedicine from '../Components/VerticalMedicine'
// import account from '../Photos/account.jpg'
// import climberEverest from '../Photos/climberEverest.webp'
// import premium from '../Photos/premium.png'
// import { BsThreeDots } from 'react-icons/bs'
// import { AiOutlineHeart } from 'react-icons/ai'
// import { AiFillHeart } from 'react-icons/ai'
// import { FaRegComment } from 'react-icons/fa'
// import { SlPaperPlane } from 'react-icons/sl'
// import { BsBookmarkDash } from 'react-icons/bs'
// import { RiArrowDropDownLine } from 'react-icons/ri'
// import SingleLineCalendar from '../Components/SingleLineCalender'
// import VerticalSLC from '../Components/VericalSLC'
// import FlippingImage from '../Components/FlipImage'
// import FloatingChat from '../Components/FloatingChat'
// import Page from "../Layouts/Pages";
// import { RxCross2 } from 'react-icons/rx'
// import gallery from '../Photos/gallery.png'
// import gificon from '../Photos/gifIcon.png'
// import location from '../Photos/location.png'
// import smily from '../Photos/smily.png'
// import { TfiGallery } from 'react-icons/tfi'
// import { HiOutlineGif } from 'react-icons/hi2'
// import { HiOutlineLocationMarker } from 'react-icons/hi'
// import { GrEmoji } from 'react-icons/gr'
// import { IoMdClose } from 'react-icons/io'
// import Send from '../Photos/Send.png'
// import commentIcon from '../Photos/commentIcon.png'
// import save from '../Photos/save.png'
// import { MdPanoramaVerticalSelect } from 'react-icons/md'
// import { CiSearch } from 'react-icons/ci'
// import { BsCircle } from 'react-icons/bs'
// import { AiFillCheckCircle } from 'react-icons/ai'
// import CreatePost from '../Components/CreatePost'
// import { BsLink45Deg } from 'react-icons/bs'
// import { CiFaceSmile } from 'react-icons/ci'
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
// import { HiOutlineChevronRight } from 'react-icons/hi'
// import { BiCheckCircle } from 'react-icons/bi'
// import { NavLink } from 'react-router-dom'
// import { GrLocation } from 'react-icons/gr'
// import { BiArrowBack } from 'react-icons/bi'
// import blockuser from '../Photos/blockuser.png'
// import SplitButton from '../Components/Splitbutton'
// import SelectLabels from '../Components/SelectLabels'
// import FeedTable from '../Components/FeedTable'


// const Home = () => {

//     const emojiButtonRef = useRef(null);
//     const pickerRef = useRef(null);
//     const [heart, setHeart] = useState()
//     const [heart1, setHeart1] = useState()
//     const [createPost, setCreatePost] = useState(false)
//     const [showFullContent, setShowFullContent] = useState(false);
//     const [input, setInput] = useState('')
//     const [showEmoji, setShowEmoji] = useState(false);
//     const [showContent, setShowContent] = useState(false);
//     const [shareButton, setShareButton] = useState(false)
//     const [reportButton, setReportButton] = useState(false)
//     const [checked, setChecked] = useState([]);
//     const [showThanku, setThanku] = useState(false)
//     const [showlocation, setShowLacation] = useState(false)
//     const [showgif, setShowgif] = useState(false)
//     const [userBlock, setUserBlock] = useState(false)
//     const [userblocked, setUserBlocked] = useState(false)

//     //  gif data
//     const GifImage = [
//         { id: 1, image: 'climberEverest.Webp' },
//         { id: 2, image: 'climberEverest.Webp' },
//         { id: 3, image: 'climberEverest.Webp' },
//         { id: 4, image: 'climberEverest.Webp' },
//         { id: 5, image: 'climberEverest.Webp' },
//         { id: 6, image: 'climberEverest.Webp' },
//     ];

//     // blocked user 
//     const toggleBlockedTab = () => {
//         setUserBlocked(!userblocked)
//     }

//     // block user
//     const toggleBlockTab = () => {
//         setUserBlock(!userBlock)
//     }

//     // location and GIF
//     const toggleLocation = () => {
//         setShowLacation(!showlocation)
//     }

//     const toggleGif = () => {
//         setShowgif(!showgif)
//     }



//     // emoji
//     const addEmoji = (e) => {
//         const sym = e.unified.split("_");
//         const codeArray = [];
//         sym.forEach((el) => codeArray.push("0x" + el));
//         let emoji = String.fromCodePoint(...codeArray);
//         setInput(input + emoji);

//     };

//     // share button functionality
//     const checkList = [

//         { id: 1, name: 'Sierra Ferguson', image: 'account2.jpg', description: 'Works at National Museum' },
//         { id: 2, name: 'Sierra Ferguson', image: 'account2.jpg', description: 'Works at National Museum' },
//         { id: 3, name: 'Sierra Ferguson', image: 'account2.jpg', description: 'Works at National Museum' },
//         { id: 4, name: 'Sierra Ferguson', image: 'account2.jpg', description: 'Works at National Museum' },
//         { id: 5, name: 'Sierra Ferguson', image: 'account2.jpg', description: 'Works at National Museum' },
//         { id: 6, name: 'Sierra Ferguson', image: 'account2.jpg', description: 'Works at National Museum' },
//         { id: 7, name: 'Sierra Ferguson', image: 'account2.jpg', description: 'Works at National Museum' },
//     ];

//     const handleCheck = (event, item) => {
//         if (event.target.checked) {
//             setChecked([...checked, item]);
//         } else {
//             setChecked(checked.filter((checkedItem) => checkedItem.id !== item.id));
//         }
//     };


//     const handleRemoveItem = (item) => {
//         setChecked(checked.filter((checkedItem) => checkedItem.id !== item.id));
//     };

//     const isChecked = (item) => {
//         return checked.some((checkedItem) => checkedItem.id === item.id)
//     }

//     const toggleShareButton = () => {
//         setShareButton(!shareButton)
//     }

//     const toggleContent = () => {
//         setShowContent(!showContent);
//     };

//     const handleInput = (e) => {
//         setInput(e.target.value)
//     }

//     const handleReadMore = () => {
//         setShowFullContent(true);
//     };

//     const toggleReportButton = () => {
//         setReportButton(!reportButton)
//     }

//     const togglethanku = () => {
//         setThanku(!showThanku)
//     }

//     function likeButton() {
//         setHeart(!heart)
//     }
//     function likeButton1() {
//         setHeart1(!heart1)
//     }

//     function open_post() {
//         setCreatePost(true)
//     }

//     const para = 'Bethany was running in a half marathon when she began to feel ill. She thought that her celiac disease may have flared up due to something she had eaten, but when she didn’t get better, she decided to see a doctor. What followed was a series of misdiagnoses is the etc'

//     // three dots
//     const [threeDots, setThreeDots] = useState(false)

//     function threeDotsToggle() {
//         setThreeDots(!threeDots)
//     }

//     //outclick from three dots
//     const threeDotsOutClick = useRef(null);

//     const handleClickOutsidethreeDots = (event) => {
//         if (threeDotsOutClick.current && !threeDotsOutClick.current.contains(event.target)) {
//             setThreeDots(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutsidethreeDots, true);
//         return () => {
//             document.removeEventListener('click', handleClickOutsidethreeDots, true);
//         };
//     }, []);

//     // emoji
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 (emojiButtonRef.current && emojiButtonRef.current.contains(event.target)) ||
//                 (pickerRef.current && pickerRef.current.contains(event.target))
//             ) {
//                 return;
//             }

//             setShowEmoji(false);
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // emoji
//     const handlePickerFocus = () => {
//         setShowEmoji(true);
//     }

//     //vertical calender , appointments and Medicine
//     const [vertical, setVertical] = useState('Upcoming')

//     const toggleVertical = (item) => {
//         setVertical(item)
//     }

//     const [comVal, setComVal] = useState()

//     const takeValue = (e) => {
//         // e.preventDefault()
//         setComVal(e.target.value)
//     }

//     const handleCom = () => (
//         console.log(comVal)
//     )

//     return (
//         <Page
//             pageContent={(
//                 <>
//                     <div className=' h-[100%] bg-[#FEF8FD]  '>
//                         <div className="flex 'bg-[#FEF8FD] py-5 px-12">
//                <NavLink to='/Home3'> <h1 className=' text-[22px] px-5 font-bold' style={{borderRight:'3px solid #7e7e7e'}}> <a href=""> People </a></h1></NavLink>
//                   <NavLink to='/HomePost'> <h1 className=' text-[22px] px-5 font-bold'><a href=""> Posts </a></h1></NavLink>
//                     </div>

//                         <div className=' lg:flex'>
                       
//                             {/* background */}
//                             <div className='bg-[#FEF8FD] lg:px-0 px-2 w-[100%] lg:flex-row lg:flex'>
//                                 {/* post */}
                               
                               
//                                 <FeedTable />
                               
//                                 <div className='lg:flex lg:flex-col lg:gap-4 px-7 lg:items-center lg:pr-8 hidden lg:block   '>

//                                     {/* right side */}



//                                     <div className='  p-5 rounded-[30px]  bg-[#FFFFFF] border-[0.5px] border-[#C31A7F33]'>
//                                         <p className='flex flex-wrap text-center text-[17px] font-semibold'>What time is best suited for you to join the meeting?</p>

//                                         <div className='flex flex-col gap-4'>
//                                             <div className='flex flex-row items-center justify-center gap-3 pt-3'>
//                                                 <div className='w-24 h-9 bg-[#C31A7F] text-[#FFFFFF] cursor-pointer flex flex-row items-center justify-center rounded-[15px] '><p>8:00</p><p>PM</p>
//                                                 </div>
//                                                 <div className='w-24 h-9 bg-[#FFFFFF]   text-[#C31A7F] cursor-pointer flex flex-row items-center border-[1px] border-[#C31A7F] justify-center rounded-[15px]'><p>9:00</p><p>PM</p>
//                                                 </div>
//                                                 <div className='w-24 h-9 bg-[#FFFFFF]   text-[#C31A7F] cursor-pointer flex flex-row items-center border-[1px] border-[#C31A7F] justify-center rounded-[15px]'><p>12:00</p><p>AM</p>
//                                                 </div>
//                                             </div>
//                                             <div className='flex flex-row items-center justify-center gap-3'>
//                                                 <div className='w-2 h-2 rounded-full bg-[#C31A7F]'></div>
//                                                 <div className='w-2 h-2 rounded-full bg-[#E7E7E7]'></div>
//                                                 <div className='w-2 h-2 rounded-full bg-[#E7E7E7]'></div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='w-[110%]  px-4  relative'>
//                                         <div>
//                                             <div className='bg-gradient-to-r from-[#D4F1FF] to-[#FFFFFF] h-[230px] w-full rounded-[30px] border-[1px] border-solid border-[#D9EAFF]   ' style={{
//                                                 boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)'
//                                             }}>
//                                                 <img src={premium} className=' h-[230px] w-[50%] top-[0%] left-[43%] relative' alt='none' />
//                                             </div>

//                                             <div className='text-center w-max absolute top-[18%] left-[20%] font-semibold'>
//                                                 <h1>Try Premium</h1>
//                                                 <h1>for free</h1>
//                                             </div>

//                                             <div className='w-max absolute top-[45%] left-[20%] text-xs text-[#00000073]'>
//                                                 One month free
//                                             </div>

//                                             <NavLink to='/Subscription_Models'>
//                                                 <div className='w-max absolute top-[65%] left-[10%] bg-gradient-to-r from-[#efc41955] to-[#ed839a54] p-2 px-8 rounded-2xl'>
//                                                     View More
//                                                 </div>
//                                             </NavLink>


//                                         </div>
//                                     </div>

//                                     {/* calender */}
//                                     <div className=' w-[100%] p-6 bg-white max-h-screen relative  rounded-[30px]  overflow-hidden border-[1px] border-solid border-[#D9EAFF]  ' style={{
//                                         boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)'
//                                     }}>

//                                         <div className=' flex items-center '>
//                                             <SingleLineCalendar />
//                                         </div>

//                                         <div className='p-4'>
//                                             <hr />
//                                         </div>

//                                         <div className=' text-[14px]  flex flex-row items-center justify-center gap-6'>
//                                             <h1 onClick={() => toggleVertical('Upcoming')}
//                                                 className={vertical === 'Upcoming' ? 'text-black font-semibold transition-all duration-300' : 'text-[#C4C4C4] font-semibold cursor-pointer'}>Upcoming</h1>
//                                             <h1 onClick={() => toggleVertical('Appointment')}
//                                                 className={vertical === 'Appointment' ? 'text-black font-semibold transition-all duration-300' : 'text-[#C4C4C4] font-semibold cursor-pointer'}>Appointment</h1>
//                                             <h1 onClick={() => toggleVertical('Medicines')}
//                                                 className={vertical === 'Medicines' ? 'text-black font-semibold transition-all duration-300' : 'text-[#C4C4C4] font-semibold cursor-pointer'}>Medicines</h1>
//                                         </div>

//                                         <div className=''>
//                                             <div className='flex flex-col'>
//                                                 {vertical === 'Upcoming' &&
//                                                     (<div className='w-full mt-4 '>
//                                                         <VerticalSLC />
//                                                     </div>)}
//                                                 {vertical === 'Appointment' &&
//                                                     (<div className='w-full mt-4'>
//                                                         <VerticalAppointment />
//                                                     </div>)}
//                                                 {vertical === 'Medicines' &&
//                                                     (<div className='w-full mt-4'>
//                                                         <VerticalMedicine />
//                                                     </div>
//                                                     )}

//                                                 <div className='w-full h-[10%] mt-7 top-[90%] bg-white flex justify-center items-center font-semibold'>
//                                                     <div className='bg-[#c31a7f3c] flex items-center h-10 gap-2 pl-2 rounded-3xl'>

//                                                         {vertical === 'Upcoming' &&
//                                                             (
//                                                                 <div className='flex flex-row px-4 items-center  cursor-pointer text-[15px]'>
//                                                                     <p>View all schedule</p><RiArrowDropDownLine size={26} />
//                                                                 </div>
//                                                             )}
//                                                         {vertical === 'Appointment' &&
//                                                             (
//                                                                 <div className='flex flex-row px-4 items-center cursor-pointer text-[15px]'>
//                                                                     <p>View all schedule</p><RiArrowDropDownLine size={26} />
//                                                                 </div>
//                                                             )}
//                                                         {vertical === 'Medicines' && (
//                                                             <div className='flex flex-row px-4 ite-center  cursor-pointer test-[15px]'>
//                                                                 <p>View all</p><RiArrowDropDownLine size={26} />
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* floating chat */}
//                         <FloatingChat />

//                         {/* emoji  */}
//                         {showEmoji && (
//                             <div className="absolute top-52   left-3  lg:top-56 lg:left-96" ref={pickerRef}>
//                                 <Picker
//                                     data={data}
//                                     emojiSize={26}
//                                     emojiButtonSize={34}
//                                     onEmojiSelect={addEmoji}
//                                     maxFrequentRows={0}
//                                     theme='light'
//                                     category='apple'
//                                     autoFocus={true}
//                                     onFocus={handlePickerFocus}
//                                     icons='solid'
//                                 />
//                             </div>
//                         )}
//                     </div>

//                 </>)} />
//     )
// }

// export default Home
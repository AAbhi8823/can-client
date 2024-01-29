import React, { useEffect, useRef, useState } from 'react'

import AdminDashboard from "../Photos/AdminIcons/AdminDashboard.png";
import AdminUser from "../Photos/AdminIcons/AdminUsers.png";
import AdminMeeting from "../Photos/AdminIcons/AdminMeeting.png";
import AdminPost from "../Photos/AdminIcons/AdminPost.png";
import AdminChat from "../Photos/AdminIcons/AdminChat.png";
import AdminTransaction from "../Photos/AdminIcons/AdminTransaction.png";
import AdminReport from "../Photos/AdminIcons/AdminReport.png";
import AdminSetting from "../Photos/AdminIcons/AdminSetting.png";
import AdminLogout from "../Photos/AdminIcons/AdminLogout.png";
import { NavLink, useLocation } from 'react-router-dom';
// import CreatePost from "./CreatePost";
import iconRight from '../Photos/iconRight.png'
import iconLeft from '../Photos/iconLeft.png'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'


const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(() => {
        const storedValue = localStorage.getItem('isOpen');
        return storedValue ? JSON.parse(storedValue) : true;
        console.log(isOpen);
    });
    const [isiconVisible, setIsiconVisible] = useState(true);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
        setIsiconVisible(!isiconVisible);
    };

    useEffect(() => {
        // Store the 'isOpen' state in localStorage whenever it changes
        localStorage.setItem('isOpen', JSON.stringify(isOpen));
    }, [isOpen]);

    const [showmore, setShowmore] = useState(false);
    const [uploadPosts, setUploadPosts] = useState(false);
    const [activePage, setActivePage] = useState(null);
    const location = useLocation();

    const uploadPost = () => {
        setUploadPosts(!uploadPosts);
    };

    function close_createPost() {
        setUploadPosts(!uploadPosts);
    }
    const [logOut, setLogOut] = useState(false);
    const handleLogOut = () => {
        setLogOut(!logOut);
    }
    const currentPathname = location.pathname;

    useEffect(() => {
        // Set the active page based on the current URL path
        setActivePage(currentPathname.startsWith('/Appointment') ? '/Appointment' : (currentPathname.startsWith('/Medicine') ? '/Medicine' : (currentPathname.startsWith('/HealthCard') ? '/HealthCard' : (currentPathname.startsWith('/HealthRecord') ? '/HealthRecord' : currentPathname))))
    }, [location]);

    // useEffect(() => {
    //   // Store the 'isOpen' state in localStorage whenever it changes
    //   localStorage.setItem('isOpen', JSON.stringify(isOpen));
    // }, [isOpen]);

    const showmoreOutclick = useRef(null);

    function showmoreToggle() {
        setShowmore(!showmore);
    }

    const handleClickOutsideshowmore = (event) => {
        if (
            showmoreOutclick.current &&
            !showmoreOutclick.current.contains(event.target)
        ) {
            setShowmore(false);
        }
    };
    const logoutDivRef = useRef(null);

    const handleClickOutsideLogout = (event) => {
        if (logOut && logoutDivRef.current && !logoutDivRef.current.contains(event.target)) {
            setLogOut(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutsideLogout, true);
        return () => {
            document.removeEventListener("click", handleClickOutsideLogout, true);
        };
    }, [logOut]);
    useEffect(() => {
        document.addEventListener("click", handleClickOutsideshowmore, true);
        return () => {
            document.removeEventListener("click", handleClickOutsideshowmore, true);
        };
    }, [showmore]);

    const sideMenuDivRef = useRef(null);
    const handleClickOutsideSideMenu = (event) => {
        if (isOpen === false && sideMenuDivRef.current && !sideMenuDivRef.current.contains(event.target)) {
            setIsOpen(true);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutsideSideMenu, false);
        return () => {
            document.removeEventListener("click", handleClickOutsideSideMenu, false);
        };
    }, [isOpen]);
    return (
        <>
            <div ref={sideMenuDivRef} className='relative'>
                <div className={`lg:relative absolute h-full z-50 bg-[#FFF] border-[1px] border-solid border-[#D9EAFF] transition-all duration-300 flex flex-col justify-between ${isOpen ? 'w-[0px] lg:w-[100px]' : 'lg:w-[300px]  w-[250px] '}`} style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)' }}>
                    <div>
                        {/* LOGo */}
                        <div className={`flex flex-row gap-1 items-center justify-center pt-2  ${isOpen ? 'flex flex-col gap-1 ' : ''}`}>
                            <img src={LogoCAn} alt="none" className="w-[70px]" />
                            <img src={CANa} alt="none" className="w-[42px]" />
                        </div>

                        {/* separate line */}

                        <div className='flex items-center justify-center pt-2'>
                            <hr className={`h-1 w-[80%]`} />
                        </div>


                        {/* content with icons */}

                        <div className='flex flex-col  pt-2'>
                            <ul className='flex flex-col gap-2 cursor-pointer'>

                                <NavLink to="/AdminContent">
                                    <div onClick={() => setActivePage('/AdminContent')}>
                                        <li className={`flex flex-row items-center gap-2 h-12 text-[14px]  text-[#444] font-semibold  ${activePage === '/AdminContent' ? 'bg-[#efc4197c] border-l-[3px] flex flex-row font-semibold gap-2 h-12 items-center lg:border-[#C31A7F] text-[#444] text-[14px]' : ''}`}><div className={`ml-10 `}><img className='w-4' src={AdminDashboard} alt='none' /></div><p className={` ${isOpen ? '  hidden translate-x-0 ' : ' '}`}>Dashboard</p></li>
                                    </div>
                                </NavLink>


                                <NavLink to="/AdminUserManagement">
                                    <div>
                                        <li className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold   ${activePage === '/meeting' ? 'bg-[#efc4197c] border-l-[3px] lg:border-[#084943] text-[14px] font-semibold' : ''}`}>
                                            <div className={`ml-10 `}>
                                                <img className='w-4' src={AdminUser} alt='none' />
                                            </div>
                                            <p className={`${isOpen ? 'hidden translate-x-0 ml-2' : ''}`}>Users</p>
                                        </li>
                                    </div>
                                </NavLink>


                                <NavLink to='/chatpage' onClick={() => setActivePage('/chatpage')}>
                                    <li className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${activePage === '/chatpage' ? 'bg-[#efc4197c] border-l-[3px] lg:border-[#084943]' : ''}`}><div className={`ml-10 `}><img style={{ width: "19px" }} className='w-4' src={AdminMeeting} alt='none' /></div><p className={` ${isOpen ? '  hidden translate-x-0' : ''}`}>Meeting</p></li>
                                </NavLink>


                                <div onClick={() => setActivePage('/CreatePose')} >
                                    <li className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${activePage === '' ? 'bg-[rgba(239, 195, 25, 0.2)] border-l-[3px] lg:border-[#084943]' : ''}`} onClick={uploadPost}><div className={`ml-10 `}><img style={{ width: "19px" }} src={AdminPost} className='w-4' alt='none' /></div><p className={` ${isOpen ? '  hidden translate-x-0' : ''}`}>Post</p></li>
                                </div>



                                <div onClick={() => setActivePage('/CreatePose')} >
                                    <li className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${activePage === '' ? 'bg-[rgba(239, 195, 25, 0.2)] border-l-[3px] lg:border-[#084943]' : ''}`} onClick={uploadPost}><div className={`ml-10 `}><img style={{ width: "19px" }} src={AdminChat} className='w-4' alt='none' /></div><p className={` ${isOpen ? '  hidden translate-x-0' : ''}`}>Chats</p></li>
                                </div>

                                {/* {uploadPosts && (
                                    <div>
                                        <CreatePost close_createPost={close_createPost} />
                                    </div>
                                )} */}
                                <NavLink to='/HealthRecord' onClick={() => setActivePage('/HealthRecord')}>
                                    <li className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${activePage === '/HealthRecord' ? 'bg-[#efc4197c] border-l-[3px] lg:border-[#084943]' : ''}`}><div className={`ml-10 `}><img style={{ width: "19px" }} className='w-4' src={AdminTransaction} alt='none' /></div><p className={` ${isOpen ? '  hidden translate-x-0' : ''}`}>Transaction</p></li>
                                </NavLink>

                                <NavLink to='/HealthCard' onClick={() => setActivePage('/HealthCard')}>
                                    <li className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${activePage === '/HealthCard' ? 'bg-[#efc4197c] border-l-[3px] lg:border-[#084943]' : ''}`}><div className={`ml-10 `}><img style={{ width: "19px" }} className='w-4' src={AdminReport} alt='none' /></div><p className={` ${isOpen ? '  hidden translate-x-0' : ''}`}>Reports</p></li>
                                </NavLink>

                                <NavLink to='/Appointment' onClick={() => setActivePage('/Appointment')}>
                                    <li className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${activePage === '/Appointment' ? 'bg-[#efc4197c] border-l-[3px] lg:border-[#084943]' : ''}`}><div className={`ml-10 `}><img style={{ width: "19px" }} className='w-4' src={AdminSetting} alt='none' /></div><p className={` ${isOpen ? '  hidden translate-x-0' : ''}`}>Setting</p></li>
                                </NavLink>

                                <NavLink to='/Medicine' onClick={() => setActivePage('/Medicine')}>
                                    <li className={`flex flex-row items-center gap-2 h-12 text-[14px] text-[#444] font-semibold  ${activePage === '/Medicine' ? 'bg-[#efc4197c] border-l-[3px]  lg:border-[#084943]' : ''}`}><div className={`ml-10 `}><img style={{ width: "19px" }} className='w-4' src={AdminLogout} alt='none' /></div><p className={` ${isOpen ? '  hidden translate-x-0' : ''}`}>Logout</p></li>
                                </NavLink>

                            </ul>
                        </div>

                    </div>

                    {/* <div onClick={() => setActivePage('showMore')} className={`cursor-pointer hover:bg-[#efc4197c] ${activePage == 'showMore' ? 'bg-[#efc4197c] border-l-[3px] lg:border-[#084943]' : ''}`}>
                        <ul className="relative w-full h-12 ">
                            <li>
                                <li
                                    className="flex flex-row   gap-2 "
                                    onClick={showmoreToggle}
                                >
                                    <div
                                        className={` ${isOpen ? ' ml-10 mt-4 translate-x-0' : 'ml-10   mt-4'}`}
                                    >
                                        <img src={more} alt="none" />
                                    </div>
                                    <p className={`${isOpen ? ' flex hidden' : 'mt-3'}`}>Show More</p>

                                </li>
                            </li>

                            {showmore && (
                                <div
                                    ref={showmoreOutclick}
                                    className=" h-max w-max bg-white shadow-2xl absolute bottom-0 lg:left-[120%] -right-1/3 items-center">
                                    <p className="flex pt-3 px-4 text-center w-full font-semibold">
                                        Help and support
                                    </p>

                                    <p className="flex p-3">
                                        <hr />
                                    </p>

                                    <p className="flex px-4 py-2 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]">
                                        <img src={CANnn} alt="none" />
                                        About us
                                    </p>
                                    <p className="flex px-4 py-2 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]">
                                        <img src={help} alt="none" />
                                        <NavLink to="/HelpFeedback">Help / Feedback</NavLink>
                                    </p>

                                    <p className="flex px-4 py-2 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]">
                                        <img src={share} alt="none" />
                                        <NavLink to='/HelpAFriend'> Help a friend</NavLink>
                                    </p>
                                    <p className="flex px-4 py-2 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]">
                                        <img src={setting} alt="none" />
                                        <NavLink to='/Settings'>Setting </NavLink>
                                    </p>
                                    <p className="flex px-4 py-2 pb-4 hover:bg-[rgba(239, 195, 25, 0.2)] gap-2 hover:bg-[#efc4197c]" onClick={handleLogOut}>
                                        <img src={logout} alt="none" />
                                        Logout
                                    </p>

                                    {logOut && (
                                        <div className='fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50  z-50'>

                                            <div ref={logoutDivRef} className='bg-white flex flex-col items-center gap-3 px-10 py-4 justify-center rounded-[20px] p-4'>
                                                <img src={CanLogo} alt="logo" />
                                                <p className='font-[600]'>Are you sure you want to log out? </p>
                                                <button className='bg-[#084943] rounded-[15px] text-white py-2 px-10 font-[500]'><NavLink to="/LoginForm">Log out</NavLink></button>
                                                <button className='border-[2px] border-[#084943]   text-[#084943]  rounded-[15px] py-2 px-5' onClick={handleLogOut}>Cancel</button>
                                            </div>
                                        </div>

                                    )}
                                </div>
                            )}
                        </ul>
                    </div> */}

                    {/* toggle icon */}

                </div>
                <button className={` lg:absolute absolute z-10 top-5 -right-8 lg:z-10  lg:top-5 lg:-right-8  rounded-lg transition-all duration-300 ${isOpen ? "" : "translate-x-0 "}`}
                    onClick={toggleNavbar}
                >
                    {isOpen ? <img className='w-5' src={iconRight} alt="none" /> : <img className='w-5' src={iconLeft} alt="none" />}
                </button>
            </div>
        </>
    )
}

export default SideMenu
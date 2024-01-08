import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MessageI from '../Photos/messageI.svg'
import CallI from '../Photos/callI.svg'
import LocationI from '../Photos/locationI.svg'

import sadEmoji from '../Photos/sadFace.svg'
import normalEmoji from '../Photos/normalFace.svg'
import smileEmoji from '../Photos/smileFace.svg'
import laughEmoji from '../Photos/laughFace.svg'

import SearchLens from '../Photos/SearchLens.png'
import HomeIcons from '../Photos/HomeIcon.png'
import KnowAbout from '../Photos/KnowAbout.png'
import JoinMeet from '../Photos/JoinMeet.png'
import LogoCAn from '../Photos/LogoCAn.png'
import Lottie from 'lottie-react';
import LandingUser from '../Photos/LandingUser.svg'
import downArrow from '../Photos/downArrow.svg'
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Cookie from 'js-cookie'
import { baseurl } from '../Api/baseUrl'
import LandingPageFooter from './LandingPageFooter';

function ContactUs() {
    const [scroll, setScroll] = useState(0);
    const [Nav, setNav] = useState(false);
    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    useEffect(() => {
        const checkScroll = () => {
            if (scroll > 50) {
                setNav(true);
            } else {
                setNav(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        checkScroll(); // Initial check when the component mounts

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scroll]);

    const [menu, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!menu)
    }

    const [navUser, setNavuser] = useState()

    const LandingData = async () => {
        const token = Cookie.get('token')
        const homeUser = localStorage.getItem('active_user')
        try {
            const userData = await axios.post(`${baseurl}/api/singleuser?token=${token}`, {
                id: `${homeUser}`
            })
            // console.log("Navbar:", userData.data.data)
            setNavuser(userData.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        LandingData()
    })
    return (
      <>
        <div>
          <div className="flex justify-center">
            <nav
              className={
                Nav
                  ? "bg-white fixed flex justify-center transition-[width] duration-[0.3s] ease-[ease] w-[100%] py-[10px] px-4 z-20 top-0"
                  : "bg-white transition-[width] duration-[0.3s] ease-[ease] absolute w-[50%] rounded-full py-[10px] px-4 z-20 top-8"
              }
              style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.1)" }}
            >
              <div
                className={
                  Nav
                    ? "flex flex-row w-[70%] items-center justify-evenly"
                    : "flex flex-row items-center justify-evenly"
                }
              >
                <div className="flex flex-row gap-2 items-center pr-4 ">
                  <img className="w-4 h-4" src={SearchLens} alt="search" />
                  <p className="  font-semibold text-[#084943]">Search</p>
                </div>
                <div className="flex flex-row gap-2 items-center pl-2">
                  <img className=" w-4 h-4" src={KnowAbout} alt="search" />
                  <Link to="/KnowMore">
                    <p className="  font-semibold text-[#084943]">
                      Know About Cancer
                    </p>
                  </Link>
                </div>
                <div className="flex flex-row  item-center justify-center">
                  <img className="w-16" src={LogoCAn} alt="Logo" />
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <img className="w-4 h-4" src={HomeIcons} alt="search" />
                  <p className="  font-semibold text-[#084943]">My Space</p>
                </div>
                <div className=" flex flex-row gap-2 items-center h-8 px-3 py-5 rounded-full sm-hidden-1  bg-[#084943] ">
                  <img className="w-4 h-4" src={JoinMeet} alt="search" />
                  <p className="   font-semibold text-white">Join a meeting</p>
                </div>
                <div
                  onClick={toggleMenu}
                  className={Nav ? "block flex cursor-pointer" : "hidden"}
                >
                  <div>
                    <Avatar
                      alt=" "
                      src={navUser?.profile_photo}
                      sx={{ width: 56, height: 56 }}
                    />
                  </div>
                  <div className="flex justify-center items-center ml-2">
                    <img src={downArrow} />
                  </div>
                  <div>
                    <div
                      className={`absolute w-[130px] text-center left-[74%] top-[105%] z-50 rounded-[10px] transition-all duration-300 ${
                        menu
                          ? "bg-blue-600 transition-opacity ease-in opacity-100 "
                          : "opacity-0"
                      }`}
                      style={{
                        background: "#fff",
                        border: "1px solid #A94360",
                      }}
                    >
                      <Link to={"/profileuser"}>
                        <div
                          className="py-[10px] cursor-pointer"
                          style={{ borderBottom: "2px solid #A94360" }}
                        >
                          Profile
                        </div>
                      </Link>
                      <div
                        className="py-[10px] cursor-pointer"
                        style={{ borderBottom: "2px solid #A94360" }}
                      >
                        User Settings
                      </div>
                      <div
                        className="py-[10px] cursor-pointer"
                        style={{ borderBottom: "2px solid #A94360" }}
                      >
                        Meeting
                      </div>
                      <div className="py-[10px] cursor-pointer">Logout</div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="mt-[130px]">
            <h3 className="text-[#084943] text-[43px] font-[700] flex justify-center py-[30px] ">
              Contact Us
            </h3>
          </div>
          <div className=" md:px-[50px] lg:px-[100px] gap-6 md:block lg:flex  ">
            <div className="lg:w-[50%] md:w-[100%] ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224096.98009560225!2d76.92842344315561!3d28.644285209482543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1699520488042!5m2!1sen!2sin"
                width={800}
                height={600}
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title='mapp'
              ></iframe>
            </div>
            <div className="lg:w-[50%] md:w-[100%] flex flex-col items-center">
              <div
                className=" lg:w-[80%] md:w-[100%] p-[35px] rounded-[30px] flex items-center flex-col "
                style={{ boxShadow: "0px 10px 30px 0px #0000000D" }}
              >
                <div className="w-full py-[20px] text-center ext-[#A94360] font-bold text-[32px]">
                  Contact Us
                </div>
                <div className="text-center text-[20px] py-[35px]">
                  <p>
                    Reaching us is easy! Let us know your queries. <br /> We
                    would love to hear from you!
                  </p>
                </div>
                <div className="leading-[60px] py-[17pxsss] ">
                  <div className="flex">
                    <div className="mr-4 mb-[20px] flex items-end ">
                      <img width="20" src={MessageI} alt="" />
                    </div>
                    <div className="text-[22px]">support@carebynd.com</div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 mb-[20px] flex items-end">
                      <img width="20" src={CallI} alt="" />
                    </div>
                    <div className="text-[22px]">281-430-2345</div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 mb-[20px] flex mt-[10px] items-start">
                      <img width="20" src={LocationI} alt="" />
                    </div>
                    <div className="text-[22px] leading-[40px] ">
                      A47, Lorem ipsum dummy, State, Country-01001
                    </div>
                  </div>
                </div>
              </div>
              <div
                className=" w-full lg:w-[80%] mt-[30px] p-[15px] rounded-[30px] flex items-center flex-col"
                style={{ boxShadow: "0px 10px 30px 0px #0000000D" }}
              >
                <div className="py-[15px] px-[10px] w-full text-center border-b ">
                  <p className="text-[25px] font-bold ">Give us feedback</p>
                  <p>What do you think about this CAN?</p>
                </div>
                <div className="lg:flex  py-[72px]">
                  <img
                    className="md:mt-[15px] lg:mr-[63px]"
                    src={sadEmoji}
                    alt=""
                  />
                  <img
                    className="md:mt-[15px] lg:mr-[63px]"
                    src={normalEmoji}
                    alt=""
                  />
                  <img
                    className="md:mt-[15px] lg:mr-[63px]"
                    src={smileEmoji}
                    alt=""
                  />
                  <img
                    className="md:mt-[15px] lg:mr-[63px]"
                    src={laughEmoji}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[45px]">
            <LandingPageFooter />
          </div>
        </div>
      </>
    );
}

export default ContactUs

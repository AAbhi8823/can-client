import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { baseurl } from "../Api/baseUrl";
import LandingPageFooter from "./LandingPageFooter";
import MessageI from "../Photos/messageI.svg";
import CallI from "../Photos/callI.svg";
import LocationI from "../Photos/locationI.svg";
import sadEmoji from "../Photos/sadFace.svg";
import normalEmoji from "../Photos/normalFace.svg";
import smileEmoji from "../Photos/smileFace.svg";
import laughEmoji from "../Photos/laughFace.svg";
import NavLanding from "../Components/NavLanding";
import './ContactUs.css'
function ContactUs() {
  const [scroll, setScroll] = useState(0);
  const [Nav, setNav] = useState(false);
  const [menu, setMenu] = useState(false);
  const [navUser, setNavuser] = useState();
  const iframeRef = useRef();

  const handleScroll = () => setNav(window.scrollY > 50);

  useEffect(() => {
    const checkScroll = () => setNav(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          iframeRef.current.src =
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224096.98009560225!2d76.92842344315561!3d28.644285209482543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1699520488042!5m2!1sen!2sin";
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    observer.observe(iframeRef.current);

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setMenu(!menu);

  const LandingData = async () => {
    const token = Cookie.get("token");
    const homeUser = localStorage.getItem("active_user");
    try {
      const { data } = await axios.post(
        `${baseurl}/api/singleuser?token=${token}`,
        {
          id: `${homeUser}`,
        }
      );
      setNavuser(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    LandingData();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <NavLanding onStateChange={Nav} />
        </div>
        <div className="mt-[130px]">
          <h3 className="text-[#084943] text-[43px] font-[700] flex justify-center py-[30px] ">
            Contact Us
          </h3>
        </div>
        <div className="mapandits-element">
        <div className="lg:w-[50%] md:w-[100%] mt-4 lg " style={{marginLeft:'2%'}}>
            <iframe
              ref={iframeRef}
              width={'100%'}
              height={600}
              style={{ border: "2px solid gray" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="mapp"
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
                  Reaching us is easy! Let us know your queries. <br /> We would
                  love to hear from you!
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

export default ContactUs;



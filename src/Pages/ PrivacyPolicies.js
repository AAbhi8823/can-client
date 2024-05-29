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
import "./ContactUs.css";
function PrivacyPolicies() {
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
            Terms of Services
          </h3>
        </div>
        <div className="mapandits-element contact-wrap">
        </div>
        <div className="mt-[45px]">
          <LandingPageFooter />
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicies;

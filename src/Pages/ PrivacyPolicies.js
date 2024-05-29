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
        <div className="pri mt-[130px] w-full px-[10%]">
            <h3 className="text-[#084943] text-[43px] font-[700] flex justify-center py-[30px] ">
              Privacy Policies
            </h3>
            <p className="text-center">We build a range of services that will help many people daily to discuss on cancer awareness, a 
              platform to explore and interact with the world in new ways. You can use our services by signing 
              up for a CAN Account and we safeguard your privacy by our safety measures.</p>
            <h4>KEY TERMS</h4>

            <ul>
              <li><strong> Affiliates -</strong> An affiliate is an entity that belongs to the CAN group of companies.</li>
              <li><strong>Algorithm -</strong> A process or set of rules followed by a computer in performing problem solving operations.</li>
              <li><strong>Application data cache -</strong> An application data cache is a data repository on a device.</li>
              <li><strong>Browser web storage -</strong> Browser web storage enables websites to store data in a browser on a device. When used in
                “local storage” mode, it enables data to be stored across sessions. This makes data retrievable even after a browser
                has been closed and reopened.</li>
              <li><strong>CAN -</strong> CAN means Cancer Anonymous.</li>
              <li><strong>CAN Account -</strong> You have to access our services by signing up for a CAN Account and providing us with some
                personal information (typically your name, email address, and password). This account information is used to
                authenticate you when you access CAN services and protect your account from unauthorized access by others. You
                can edit your account at any time through your CAN Account setting.</li>
              <li><strong>Cookies -</strong> A cookie is a small file containing a string of characters that is sent to your computer when you visit a
                website. When you visit the site again, the cookie allows that site to recognize your browser. Cookies may store user
                preferences and other information. You can configure your browser to refuse all cookies or to indicate when a cookie
                is being sent. However, some website features or services may not function properly without cookies.</li>
              <li><strong>Device -</strong> A device is a computer that can be used to access CAN services. It includes desktop computers, laptops,
                tablets, smartphones, and other devices.</li>
              <li><sstrong>IP Address -</sstrong> Every device connected to the Internet is assigned a number known as an Internet protocol (IP) address.
                These numbers are usually assigned in a geographic block. An IP address can often be used to identify the location
                from which a device is connecting to the internet.</li>
              <li><strong>Non-personally identifiable information -</strong> This is information that is recorded about users so that it no longer reflects
                or references an individually identifiable user.</li>
              <li><strong>Personal Information -</strong> This is the information that you provide to us that personally identifies you, such as your name,
                email address, or billing information, or other data that can be reasonably linked to such information by CAN, such as
                information we associate with your CAN Account.</li>
              <li><strong>Referrer URL -</strong> A Referrer URL (Uniform Resource Locator) is information transmitted to a destination webpage by a
web browser, typically when you click a link to that page. The Referrer URL contains the URL of the last webpage the
browser visited.</li>
<li><strong>Sensitive personal information -</strong> This particular category of personal information relates to topics such as confidential
medical facts, racial or ethnic origins, political or religious beliefs, or sexuality.</li>
<li><strong>Server logs -</strong> Like most websites, our servers automatically record the page requests made when you visit our sites.
These “server logs” typically include your web request, Internet Protocol address, browser type, browser language,
the date and time of your request, and one or more cookies that may uniquely identify your browser.</li>
<li><strong>Unique Identifiers -</strong> A unique identifier is a string of characters that can be used to uniquely identify a browser, app, or
device. Different identifiers vary in how permanent they are, whether they can be reset by users, and how they can be
accessed. Unique identifiers can be used for various purposes, including security and fraud detection, syncing
services such as your email inbox, remembering your preferences, and providing personalized advertising.</li>
            </ul>

            <h4>Collection and Use of Personal Information </h4>
            <p style={{paddingBottom:'15px'}}>Personal information is data that can be used to identify or contact a single person.You may be asked to provide your
personal information anytime you are in contact with a CAN or CAN-affiliated company. CAN and its affiliates may share
this personal information with each other and use it consistent with this Privacy Policy. They may also combine it with
other information to provide and improve our products, services, content, and advertising. You are not required to provide
the personal information that we have requested, but, if you choose not to do so, in many cases we will not be able to
provide you with our products or services or respond to any queries you may have. Here are some examples of the types
of personal information CAN may collect and how we may use it:</p>

<ul className="list-space">
  <li><strong>Information we collect as you use our services -</strong></li>
  <li><strong>Your Apps,Browsers & Devices -</strong> We collect information about the apps, browsers, and devices you use to access
CAN services, which helps us provide features to you.This information we collect includes unique identifiers,
browser type and settings, device type and settings, operating system, mobile network information including carrier
name and phone number, and application version number. We also collect information about the interaction of your
apps, browsers, and devices with our services, including IP address, crash reports, system activity, and the date,
time, and referrer URL of your request.</li>
  <li style={{margin:'0px'}}><strong>Your Activity -</strong> We collect information about your activity in our services, which we use to improvise your
experience on our platform. This activity information we collect may include-</li>
<ul>
  <li>Terms you search for</li>
  <li>Views and interaction with content</li>
  <li>Purchase activity</li>
  <li>People with whom you communicate or share content</li>
  <li>Activity on third-party sites and apps that use our services.</li>
</ul>

<li style={{margin:'0px'}}><strong>Your Location Information -</strong> We collect location information when you use our services, which helps us offer you
better services based on your location. Depending on the products you re using and the settings you choose, CAN
may use different types of location information to help make some services and products you use more helpful.
These include:</li>
<ul>
  <li>GPS and other sensor data from your device</li>
  <li>IP address</li>
  <li>Activity on CAN services, such as from your searches</li>
</ul>
<p style={{margin:"15px 0px"}}>The type of location data we collect and how long we store it depends in part on your device and account settings. We use various technologies to collect and store information, including cookies, local storage, database, and server logs.</p>

<li><strong>How we use your personal information -</strong> We may process your personal information: for the purposes described in
this Privacy Policy, with your consent, for compliance with a legal obligation to which CAN is subject or when we have
assessed it is necessary for the purposes of the legitimate interests pursued by CAN or a third party to whom it may
be necessary to disclose information.</li>
<li><strong>Development and Improvisation of our service -</strong> We also use personal information to help us create, develop,
operate, deliver, and improve our products, services, content, and advertising, and for loss prevention and anti-fraud
purposes. We may also use your personal information for account and network security purposes, including in order to
protect our services for the benefit of all our users. Where we use your information for anti-fraud purposes it arises
from the conduct of an online transaction with us. We limit our uses of data for anti-fraud purposes to those that are
strictly necessary and within our assessed legitimate interests to protect our customers and our services. For certain
online transactions, we may also validate the information provided by you with publicly accessible sources±
Ý Iden²ifica²ionÉofÉUser - We may use your personal information, including your date of birth, to verify identity, assist
with the identification of users, and to determine appropriate services.</li>
<li><strong>Communication about services used -</strong> From time to time, we may use your personal information to send important
notices, such as communications about purchases and changes to our terms, conditions, and policies. Because this
information is important to your interaction with CAN, you may not opt out of receiving these communications.</li>
<li><strong>Internal Purposes -</strong> We may also use personal information for internal purposes such as auditing, data analysis, and
research to improve CANs products, services, and customer communications.</li>
</ul>
<h4>Collection and Use of Non-Personal Information</h4>
<p>We also collect data in a form that does not, on its own, permit direct association with any specific individual. We may
collect, use, transfer, and disclose non-personal information for any purpose. The following are some examples of nonpersonal information that we collect and how we may use it-</p>
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

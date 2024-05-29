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
function TermsService() {
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
            Terms of Services
            </h3>
            <p className="text-center">Welcome to Cancer Anonymous (CAN)!

HD-476, C-001A/2, WeWork Berger Delhi One, Sector- 16B, Noida -201301.

Thanks for using our products and services. The services are provided by Radianite31 Industries
Pvt Ltd located at HD-476, C-001A/2, WeWork Berger Delhi One, Sector- 16B, Noida -201301.</p>
            <h4>YOUR RELATIONSHIP WITH CAN</h4>
            <p>These terms help define the relationship between you and CAN. Broadly speaking, we give you permission to use our
services if you agree to follow these terms which are reflected here. When we speak of “CAN”, “we”, “us”, and “our”, we
mean CAN and its affiliates, excluding any local entities based in India. <strong>CAN does not verify any claims with regard to
self-cure, ayurveda, or any other claim made by the users. CAN will be taking appropriate legal action against the
people spreading inaccurate information on our platform. Please refrain from advertising, marketing, or promoting
such inaccurate information on our platform as it may lead to the termination of your subscription. </strong></p>

            <h4>WHAT YOU CAN EXPECT FROM US</h4>
            <ul>
              <li>Provide a broad range of useful services.</li>
              <li>Develop, improve, and update CAN services.</li>
            </ul>

            <h4>WHAT WE EXPECT FROM YOU</h4>
            <ul>
                <li>Follow these terms and service-specific additional terms</li>
                <li>Respect others</li>
                <li>Permission to use your content.</li>
            </ul>

            <h4>USING OUR SERVICES</h4>
            <ul>
                <li>Don t misuse our Services. For example, don t interfere with our Services or try to access them using a method
other than the interface and the instructions that we provide. You may use our Services only as permitted by law,
including applicable export and re-export control laws and regulations. We may suspend or stop providing our
Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</li>
                <li> 7sing our Services does not give you ownership of any intellectual property rights in our Services or the content
you access. You may not use content from our Services unless you obtain permission from its owner or are
otherwise permitted by law. These terms do not grant you the right to use any branding or logos used in our
Services. Don t remove, obscure, or alter any legal notices displayed in or along with our Services.</li>
            </ul>

            <h4>DISCLAIMER</h4>
            <ul>
                <li>From time to time, this website may contain technical inaccuracies or typographical errors, and we do not warrant
the accuracy of any posted information. Please confirm you are using the most up-to-date pages on this website,
and confirm the accuracy and completeness of information before using it to make decisions relating to services,
products, or other matters described in this website.</li>
                <li>If any term in this Terms of 7se is found by competent judicial authority to be unenforceable in any respect, the
validity of the remainder of this Terms of 7se will be unaffected, provided that such unenforceability does not
materially affect the parties rights under this Terms of Use.</li>
            </ul>

            <h4>PRIVACY AND COPYRIGHT PROTECTION</h4>
            <ul>
                <li>CANs privacy policies explain how we treat your personal data and protect your privacy when you use our
Services. By using our Services, you agree that CAN can use such data in accordance with our privacy policies.</li>
                <li>We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers according to
the process set out in The Copyright Act, of 1957.</li>
                <li>We provide information to help copyright holders manage their intellectual property online. If you think somebody
is violating your copyrights and want to notify us, you can reach us at <strong><a href="mailto:cansupport@welcometocan.com"> cansupport@welcometocan.com</a></strong></li>
            </ul>

            <h4>ABOUT SOFTWARE IN OUR SERVICES</h4>
            <ul>
                <li>When a Service requires or includes downloadable software, this software may update automatically on your device
once a new version or feature is available. Some Services may let you adjust your automatic update settings.</li>
                <li>CAN gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to use the software
provided to you by CAN as part of the Services. This license is for the sole purpose of enabling you to use and enjoy
the benefit of the Services as provided by CAN, in the manner permitted by these terms. You may not copy, modify,
distribute, sell, or lease any part of our Services or included software, nor may you reverse engineer or attempt to
extract the source code of that software, unless laws prohibit those restrictions or you have our written permission.</li>
                <li>Open source software is important to us. Some software used in our Services may be offered under an open source
license that we will make available to you. There may be provisions in the open source license that expressly override
some of these terms.</li>
            </ul>

            <h4>MODIFYING AND TERMINATING OUR SERVICES</h4>
            <ul>
                <li>We are constantly changing and improving our Services. We may add or remove functionalities or features, and we
may suspend or stop a Service altogether.</li>
                <li>You can stop using our Services at any time, although we ll be sorry to see you go. CAN may also stop providing
Services to you, or add or create new limits to our Services at any time.</li>
                <li>We believe that you own your data and preserving your access to such data is important. If we discontinue a Service,
where reasonably possible, we will give you reasonable advance notice and a chance to get information out of that
Service.</li>
            </ul>

            <h4>DISCLAIMER OF WARRANTY</h4>
            <ul>
                <li>7se of this site is at your sole risk. All materials, information, products, software, programs, and services are provided
as is, with no warranties or guarantees whatsoever. CAN expressly disclaims to the fullest extent permitted by law
all express, implied, statutory, and other warranties, guarantees, or representations, including, without limitation, the
warranties of merchantability, fitness for a particular purpose, and non-infringement of proprietary and intellectual
property rights. Without limitation, CAN makes no warranty or guarantee that this website will be uninterrupted,
timely, secure, or error-free.</li>
                <li> You understand and agree that if you download or otherwise obtain materials, information, products, software,
programs, or services from this website, you do so at your own discretion and risk and that you will be solely
responsible for any damages that may result, including loss of data or damage to your computer system. Some
jurisdictions do not allow the exclusion of warranties, so the above exclusions may not apply to you.</li>
            </ul>

            <h4>LIMITATION OF LIABILITY</h4>
            <ul>
                <li>To the fullest extent permitted by applicable law, in no event will CAN be liable to any party for any direct, indirect,
incidental, special, exemplary or consequential damages of any type whatsoever related to or arising from this
website or any use of this website, or of any site or resource linked to, referenced, or accessed through this website,
or for the use or downloading of, or access to, any materials, information, products, or services, including, without
limitation, any lost profits, business interruption, lost savings or loss of programs or other data, even if CAN is
expressly advised of the possibility of such damages. This exclusion and waiver of liability applies to all causes of
action, whether based on contract, warranty, tort, or any other legal theories.</li>
            </ul>

            <h4>SETTLING DISPUTES, GOVERNING LAW, AND COURTS</h4>
            <ul>
                <li>Indian Laws will govern all disputes arising out of or relating to these terms, service-specific additional terms, or any
related services, regardless of conflict of laws rules. The arbitration will be used as a mechanism to resolve these
disputes, whereas the sole arbitrator be appointed by the service provider, and the seat of arbitration to be Delhi.
Noida Courts will have exclusive jurisdiction for the administration of Cases.</li>
            </ul>

            <h4>ABOUT THESE TERMS</h4>
            <ul>
                <li>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law
or changes to our Services. You should look at the terms regularly. We ll post notice of modifications to these terms
on this page. We ll post notice of modified additional terms in the applicable Service. Changes will not apply
retroactively and will become effective no sooner than fourteen days after they are posted. However, changes
addressing new functions for a Service or changes made for legal reasons will be effective immediately. If you do not
agree to the modified terms for a Service, you should discontinue your use of that Service.</li>
                <li>If there is a conflict between these terms and the additional terms, the additional terms will control for that conflict.</li>
                <li>These terms control the relationship between CAN and you. They do not create any third party beneficiary rights.</li>
                <li>If you do not comply with these terms, and we don t take action right away, this doesn t mean that we are giving up
any rights that we may have (such as taking action in the future) </li>
                <li>If it turns out that a particular term is not enforceable, this will not affect any other terms.</li>
            </ul>




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

export default TermsService;

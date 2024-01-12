import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Customdotstyle.css'
import LandingPage1 from '../Photos/LandingPage1.png'
import leftSideImage from '../Photos/leftSideImage.png'
import rightSideImage from '../Photos/rightSideImage.png'
import leftCloud1 from '../Photos/leftCloud1.png'
import leftCloud2 from '../Photos/leftCloud2.png'
import leftCloud3 from '../Photos/leftCloud3.png'
import leftCloud4 from '../Photos/leftCloud4.png'
import leftCloud5 from '../Photos/leftCloud5.png'
import leftCloud6 from '../Photos/leftCloud6.png'
import leftCloud7 from '../Photos/leftCloud7.png'
import rightCloud1 from '../Photos/rightCloud1.png'
import rightCloud2 from '../Photos/rightCloud2.png'
import rightCloud5 from '../Photos/rightCloud5.png'
import rightCloud6 from '../Photos/rightCloud6.png'
import greyCloud from '../Photos/slider1.png'
import greyCloud2 from '../Photos/sliderfront2.png'
import greyCloud3 from '../Photos/slider3.png'
import greyCloud4 from '../Photos/slider4.png'
import greenCloud from '../Photos/sliderfront1.png'
import greenCloud2 from '../Photos/slider2.png'
import greenCloud3 from '../Photos/sliderfront3.png'
import greenCloud4 from '../Photos/sliderfront4.png'
import slideImage1 from '../Photos/slideImage1.png'
import slideImage2 from '../Photos/slideImage2.png'
import slideImage3 from '../Photos/slideImage3.png'
import slideImage4 from '../Photos/slideImage4.png'
import leafLeft from '../Photos/leafLeft.png'
import leafRight from '../Photos/leafRight.png'
import lamp1 from '../Photos/lamp1.png'
import lamp2 from '../Photos/lamp2.png'
import sparrow from '../Photos/sparrow.png'
import rightBranch from '../Photos/rightBranch.png'
import leftBranch from '../Photos/leftBranch.png'
import manyPeople from '../Photos/manyPeople.png'
import LandingPageFooter from './LandingPageFooter';
import { NavLink } from 'react-router-dom';
import baloon from '../Photos/baloon.png'
import baloon1 from '../Photos/baloon1.png'
import plat1 from '../Photos/GIF/Group.json'
import plat2 from '../Photos/GIF/feedback.json'
import plat3 from '../Photos/GIF/three-friends.json'
import faimily from '../Photos/faimily.png'
import rightbranch1 from '../Photos/birdtree.png'
import Lottie from 'lottie-react';
import axios from 'axios';
import Cookie from 'js-cookie'
import { baseurl } from '../Api/baseUrl'
import NavLanding from '../Components/NavLanding'
import mobileland from '../Photos/mobileland2.png'

const BeforeLoginHome = () => {

  const data = [
    {
      id: 1,
      imageUrl: greyCloud,
      imageUrl1: greenCloud,
      overlayImage: leafLeft,
      overlayImage1: leafRight,
      overlayImage2: lamp1,
      overlayImage3: lamp2,
      slideImage: slideImage1,

      title: "Emotional Support",
      description: "CAN aims to provide a non- judgemental empathetic space ",
      describe2: "to the community so that they can be heard and understood.",
      fulldescription:
        "CAN aims to provide a non- judgemental empathetic space to the community so that they can be heard and understood. ",
    },
    {
      id: 2,
      imageUrl: greyCloud2,
      imageUrl1: greenCloud2,
      overlayImage: leafLeft,
      overlayImage1: leafRight,
      overlayImage2: lamp1,
      overlayImage3: lamp2,
      slideImage: slideImage2,

      title: "Positive Thinking and Coping mechanism",
      description:
        "In our society, people have different ideas about cancer. But we should only take in things that make us feel better and ignore what society might say. Embracing our new life with cancer should actually make us happy. It’s like when they say if negative thoughts can have negative impact then positive thoughts do have positive impact.",
    
      fulldescription:
        "In our society, people have different ideas about cancer. But we should only take in things that make us feel better and ignore what society might say. Embracing our new life with cancer should actually make us happy. It’s like when they say if negative thoughts can have negative impact then positive thoughts do have positive impact.",
    },
    {
      id: 3,
      imageUrl: greyCloud3,
      imageUrl1: greenCloud3,
      overlayImage: leafLeft,
      overlayImage1: leafRight,
      overlayImage2: lamp1,
      overlayImage3: lamp2,
      slideImage: slideImage3,

      title: "You are not alone!",
      description:
        "Acknowledging and learning from individual experiences. Reassuring individuals ",
      describe2:
        "that their struggles are valid and they are not alone in this fight against cancer",
      fulldescription:
        "Acknowledging and learning from individual experiences. Reassuring individuals that their struggles are valid and they are not alone in this fight against cancer. ",
    },
    {
      id: 4,
      imageUrl: greyCloud4,
      imageUrl1: greenCloud4,
      overlayImage: leafLeft,
      overlayImage1: leafRight,
      overlayImage2: lamp1,
      overlayImage3: lamp2,
      slideImage: slideImage4,

      title: "Empathy comes from shared experiences",
      description:
        "Opening up and venting your cancer-related concerns will provide a sense of connection, as people on the same boat will truly empathise with your experiences and offer a warm and comforting presence.",
    
      fulldescription:
        "Opening up and venting your cancer-related concerns will provide a sense of connection, as people on the same boat will truly empathise with your experiences and offer a warm and comforting presence.",
    },
    // Add more images and data as needed
  ];
  const feature = [
    {
      id: 1,
      image: plat1,
      title: "CAN Companion",
      li1: "Haasle free whats'app Notification with access to your health value",
      li2: "Medicine and appointment reminders on whatsapp itself",
      li3: "One's place for all your cancer needs.",
    },
    {
      id: 2,
      image: plat2,
      title: "Feed",
      li1: "Share and read your moods, thoughts and success stories",
      li2: "Share your cancer timelines with a verified community on the  same frequency.",
      li3: "Find curated information on cancer",
    },
    {
      id: 3,
      image: plat3,
      title: "Support Group Meetings",
      li1: "Register for your support meetings",
      li2: "Place to vent, share experience and learn from veterans",
    },
  ];
  const [isHovered, setIsHovered] = useState(-1);
  const [scroll, setScroll] = useState(0);
  const [Nav, setNav] = useState(false);
  const [navUser, setNavuser] = useState();

  const handleHoverEnter = (index) => {
    setIsHovered(index);
  };

  const handleHoverLeave = () => {
    setIsHovered(-1);
  };

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

    const debouncedHandleScroll = debounce(handleScroll, 200);
    
    window.addEventListener('scroll', debouncedHandleScroll);
    checkScroll(); // Initial check when the component mounts

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [scroll]);

  useEffect(() => {
    const LandingData = async () => {
      const token = Cookie.get('token');
      const homeUser = localStorage.getItem('active_user');

      try {
        const userData = await axios.post(`${baseurl}/api/singleuser?token=${token}`, {
          id: homeUser,
        });

        setNavuser(userData.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    LandingData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };
  return (
    <>
      <div className="flex justify-center">
        <NavLanding onStateChange={Nav} />
      </div>
      {/* Talwind Css */}

      <div className="relative  sm:w-[100%] lg:block hidden h-[100vh]">
        <div className="bg-[#52D8E9] flex items-center justify-center  group overflow-hidden  relative  w-full  lg:h-[80vh]">
          {/* <Navigation /> */}

          {/* <NewNavigation /> */}

          <div className="pb-64 flex flex-col items-center justify-center gap-4 z-10 w-full  ">
            <h1 className="text-center  font-semibold text-13 mt-[200px] text-[#084943] tracking-[1px] text-[2.9296875vw] med-1 fnt-3">
              Join the fight against cancer!
            </h1>

            <NavLink to="/Animate">
              <button className="text-[1vw] bg-[#084943] flex   items-center justify-center  rounded-full  h-[4vh] px-10  font-semibold text-white transition duration-300 ease-in-out hover:bg-[#084943] transform hover:-translate-y-1 hover:scale-110 ">
                Join a meeting
              </button>
            </NavLink>
          </div>
          <img
            src={rightSideImage}
            alt="Overlay"
            className="absolute top-0 right-0 sm-hidden  sm:w-[200px] sm:h-[200px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px] opacity-100 group-hover:opacity-100 transform translate-x-0  group-hover:translate-x-full  transition-all duration-1000 ease-in-out"
          />
          <img
            src={leftSideImage}
            alt="Overlay"
            className="absolute top-0 left-0 sm-hidden   sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px] opacity-100 group-hover:opacity-100 transform -translate-x-0  group-hover:-translate-x-full  transition-all duration-1000 ease-in-out"
          />

          {/* left side cloud images */}

          <img
            src={leftCloud1}
            alt="Overlay"
            className="absolute bottom-[25%] left-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform -translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={leftCloud2}
            alt="Overlay"
            className="absolute bottom-[30%] left-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform -translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={leftCloud3}
            alt="Overlay"
            className="absolute bottom-[20%] left-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform -translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={leftCloud4}
            alt="Overlay"
            className="absolute bottom-[30%] left-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform -translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={leftCloud5}
            alt="Overlay"
            className="absolute bottom-[20%] left-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform -translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={leftCloud6}
            alt="Overlay"
            className="absolute bottom-[30%] left-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform -translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={leftCloud7}
            alt="Overlay"
            className="absolute bottom-[40%] left-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform -translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={baloon}
            alt="Not Found"
            className="absolute bottom-1/2 left-[15%] sm-hidden-1  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] balloon animate-balloonUpAndDown-1  balloon	"
            style={{ zIndex: 1, width: "100px" }}
          />

          {/* right side cloud images */}

          <img
            src={rightCloud1}
            alt="Overlay"
            className="absolute bottom-[40%] right-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={rightCloud2}
            alt="Overlay"
            className="absolute bottom-[30%] right-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={rightCloud5}
            alt="Overlay"
            className="absolute bottom-[20%] right-0  sm:w-[200px] sm:h-full md:w-[200px] md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={rightCloud6}
            alt="Overlay"
            className="absolute bottom-[40%] right-0  sm:w-[200px] sm:h-full md:hidden md:h-[200px] lg:w-full  opacity-100 group-hover:opacity-40 transform translate-x-full  group-hover:translate-x-0  transition-all duration-1000 ease-in-out"
          />
          <img
            src={baloon1}
            alt="Not Found"
            className="absolute top-1/4 right-[18%] right-[15%]   sm:w-[200px] md:w-[200px]  animate-balloonUpAndDown  balloon	"
            style={{ zIndex: 1, width: "80px", height: "120px" }}
          />
        </div>

        {/* image with beach */}
        <img
          className="absolute top-[-10vh] w-[100%]  w-full h-full md:h-[110%] two sm:h-[107%] object-cover"
          src={LandingPage1}
          alt="none"
        />
      </div>

      <div className="block mt-14 lg:hidden relative">
        <img src={mobileland} alt="none" />
        <div className="custom-11 w-full ">
          <h1 className=" text-center  font-semibold   text-[#084943] tracking-[0.3px]  med-1 text-[18px] ">
            Join the fight against cancer!
          </h1>
          <NavLink to="/Animate">
            <button className="text-[16px] bg-[#084943] m-auto mt-5 flex lg:hidden block z-1  w rounded-full  py-1 px-5  font-semibold text-white 3xl:text-[50px] transition duration-300 ease-in-out hover:bg-[#084943] transform hover:-translate-y-1 hover:scale-110 ">
              Join a meeting
            </button>
          </NavLink>
        </div>
      </div>

      <div className="relative lg:mt-10  w-full sm:w-[100%] flex items-center justify-center mt-2">
        <div className=" flex flex-col items-center justify-center ele-1 ">
          <h1
            className="  text-center text-11 mt-3 px-5 lg:mb-6 font-bold text-[#084943] text-[2.9296875vw] med-1 fnt-3"
            style={{ lineHeight: "35px" }}
          >
            We can’t even imagine what you’re going through
          </h1>{" "}
          <br />
          <p className="text-center px-5 just-11 lg:block hidden    text-[1.4vw] med-1 fnt-3">
            Cancer is so widespread in India   <span className="text-[#A94360] font-bold">   with 16 lakh new cases every year
         
            </span>
           {" "}
            yet the community is <br /> so isolated and helpless.Let's
            strengthen the community together.
          </p>
          <p
            className="text-center px-5 just-11 lg:hidden block text-12 text-[24px]"
            style={{ lineHeight: "24px" }}
          >
            Cancer is so widespread in India{" "}
            <span className="text-[#A94360] font-bold">
              {" "}
              with 16 lakh new cases every year
            </span>{" "}
            yet the community is so isolated and helpless.Let's strengthen the
            community together.
          </p>
        </div>
      </div>

      <div className="relative w-full ">
        <img
          className="absolute right-36 sm-hidden-1"
          src={sparrow}
          alt="none"
        />
        <img
          className="absolute top-56 right-0 w-[9vw] sm-hidden-1"
          src={leftBranch}
          alt="none"
        />
        <img
          className="absolute  left-0 sm-hidden-1 w-[9vw]"
          src={rightBranch}
          alt="none"
        />
      </div>

      {/* carousel with animation */}
      <div className="w-full flex items-center  justify-center container m-auto">
        <div className="w-full     pt-10">
          <Slider {...settings} className="">
            {data.map((item, index) => (
              <div
                className="carousel-item relative group flex items-center justify-center"
                key={index}
                onMouseEnter={() => handleHoverEnter(item.id)}
                onMouseLeave={() => handleHoverLeave(item.id)}
              >
                {/* Background Image */}
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <div className=""></div>

                    <img
                      className="carousel-image w-[450px]  object-cover relative "
                      src={item.imageUrl}
                      alt={item.title}
                    />

                    <div
                      className={`absolute   top-0   flex justify-center items-center group-hover:opacity-100 ${
                        isHovered === item.id ? "opacity-100 " : "opacity-0"
                      } transition-opacity duration-300`}
                    >
                      <img
                        className=" w-[450px]  relative"
                        src={item.imageUrl1}
                        alt="none"
                      />

                      <img
                        className={`absolute bottom-[34%] left-[-10%]  transition-all duration-700 ease-in-out w-[21%] ${
                          isHovered === item.id
                            ? "opacity-100 transform translate-x-full rotate-12"
                            : ""
                        }`}
                        src={item.overlayImage}
                        alt="none"
                      />
                      <img
                        className={`absolute  bottom-[30%]  right-[-14%] w-[21%] transition-all duration-700 ease-in-out ${
                          isHovered === item.id
                            ? "opacity-100 transform -translate-x-full -rotate-12"
                            : ""
                        } `}
                        src={item.overlayImage1}
                        alt="none"
                      />
                      <img
                        className={`absolute -top-28 vip-1 left-34 w-[30px] transition-all duration-700 ease-in-out ${
                          isHovered === item.id
                            ? "opacity-100 transform translate-y-full "
                            : ""
                        } `}
                        src={item.overlayImage2}
                        alt="none"
                      />
                      <img
                        className={`absolute -top-28 vip-1  left-40 w-[30px] transition-all duration-700 ease-in-out ${
                          isHovered === item.id
                            ? "opacity-100 transform translate-y-full "
                            : ""
                        } `}
                        src={item.overlayImage3}
                        alt="none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center w-full lg:w-[70%] m-auto px-1">
                  <div className="flex flex-col items-center  w-[200%] justify-center pt-10">
                    <h2 className=" text-11 text-center text-[#084943] font-bold text-[2vw] med-1 fnt-3">
                      {item.title}
                    </h2>
                    <p className="text-center px-5 text-center hidden lg:block   text-12 text-[1.3vw] ">
                      {item.description}
                    </p>
                    <p className="text-center px-5 text-center hidden lg:block   text-12 text-[1.3vw] ">
                      {item.describe2}
                    </p>
                    <p className="text-center px-5 text-center block lg:hidden    text-12 text-[1.3vw] ">
                      {item.fulldescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* content */}

      <div className="flex items-center justify-center relative  mt-[100px]">
        <div className="flex flex-col  items-center justify-center gap-4">
          <h1 className=" text-center text-11 font-roboto font-extrabold text-[#084943] text-[2.9296875vw] med-1 fnt-3">
            Our Vision
          </h1>
          <p
            className="text-center lg:block hidden text-center  text-12 px-5  text-[1vw] xl:text-[1.4vw] med-1 fnt-3  font-roboto"
            style={{}}
          >
            Supporting cancer patients with genuine care. We aim to create a
            platform <br /> where they find a safe space, kindling hope and
            strength. Spreading <br /> awareness, partnering with experts,
            nurturing well-being. Together, <br /> conquering cancer, inspiring
            healing and growth.
          </p>
          <p
            className="text-center just-11 lg:hidden block  px-5 text-[24px]  text-12 font-roboto text-[24px]"
            style={{}}
          >
            Supporting cancer patients with genuine care. We aim to create a
            platform where they find a safe space, kindling hope and strength.
            Spreading awareness, partnering with experts, nurturing well-being.
            Together, conquering cancer, inspiring healing and growth.
          </p>
          <p className="text-gray-600 text-center lg:pt-8 pb-2  text-[1vw] med-1 fnt-3">
            CAN as an initiative started because
          </p>
        </div>

        <img
          className="absolute right-0 sm-hidden-1 w-[9vw]"
          src={leftBranch}
          alt="none"
        />
        <img
          className="absolute  left-0 sm-hidden-1 w-[9vw] "
          src={rightBranch}
          alt="none"
        />
      </div>

      {/* why can button */}

      <div className="flex items-center justify-center ">
        <a href="/Whycan">
          <button className=" py-2 px-10  text-[1vw] med-1 fnt-3 rounded-[25px] bg-[#084943] transition duration-300 ease-in-out hover:bg-[#084944] transform hover:-translate-y-1 hover:scale-110 text-white  ">
            Our Story
          </button>
        </a>
      </div>

      {/* image below why can button */}

      <div className="flex items-center justify-center pt-16 container m-auto">
        <img
          className="object-cover w-[85%]  m-auto "
          src={manyPeople}
          alt="none"
        />
      </div>

      {/* three content below image  */}

      <div className="pt-16  items-center container m-auto">
        <div className="w-full flex-wrap flex justify-around ">
          {feature.map((item, index) => (
            <div className="mt-4 w-full lg:w-1/3 " key={index}>
              <div className="flex justify-center">
                <Lottie
                  animationData={item.image}
                  className=" w-[20vw] md:w-[13vw] lg:w-[7vw] "
                />
              </div>

              <h1 className="text-[#9D1F60] text-11 text-center text-[24px] lg:text-[1.4vw] med-1 fnt-3 font-roboto font-semibold">
                {item.title}
              </h1>
              <br />
              <ul
                style={{ listStyleType: "disc" }}
                className="font-semibold ul-1 med-1  w-[85%] lg:w-[68%]  m-auto"
              >
                <li className="mb-3 text-[15px] lg:text-[1vw]  ul-1">
                  {" "}
                  {item.li1} {item.id == 1 ? (<span className='bg-[#000] text-white px-2'>Upcoming</span>) :""}
                </li>
                <li className="mb-3 text-[15px] lg:text-[1vw]  ul-1">
                  {" "}
                  {item.li2} {item.id == 1 ? (<span className='bg-[#000] text-white px-2'>Upcoming</span>) :""}
                </li>
                <li
                  className={`text-[15px] lg:text-[1vw] ul-1 ${
                    index === 2 ? "hidden" : ""
                  }`}
                >
                  {item.li3}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* lets fight cancer with button */}
      <div className="pt-10 relative ">
        <div className="flex flex-col items-center justify-center lg:mt-20 gap-4">
          <h1
            className="text-[50px]  text-center font-bold px-2 font-roboto text-11 text-[#9D1F60]"
            style={{ lineHeight: "50px" }}
          >
            Let’s fight cancer together!
          </h1>
          <NavLink to="/Animate">
            <button className="py-2 px-10 mt-4  text-[1vw] med-1 fnt-3 rounded-[25px] bg-[#084943] transition duration-300 ease-in-out hover:bg-[#084944] transform hover:-translate-y-1 hover:scale-110 text-white">
              Start Your Journey
            </button>
          </NavLink>
          <img
            className="absolute right-36  sm-hidden-1"
            src={sparrow}
            alt="none"
          />
          <img
            className="absolute w-80 left-0  sm-hidden-1"
            src={rightbranch1}
            alt="none"
          />
          {/* <img
            className="absolute left-[227px] top-[140px] sm-hidden-1 "
            src={sparrow1}
            alt="none"
          /> */}
        </div>
      </div>

      {/* image below the button  */}
      <div className="flex items-center justify-center ">
        <img src={faimily} alt="none" style={{ width: "100%" }} />
      </div>

      {/* complete footer */}
      <div className="pt-10 ">
        <LandingPageFooter />
      </div>
    </>
  );
}

export default BeforeLoginHome
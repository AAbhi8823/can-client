import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import one from '../img/one.png'
import two from '../img/two.png'
import three from '../img/three.png'
import four from '../img/four.png'
import five from '../img/five.png'
import six from '../img/six.png'
import { HiArrowRight } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";

const MobileCraousel = () => {
  const sliderRef = useRef(null);

  const [isHovered, setIsHovered] = useState(-1);

  const handleHoverEnter = (index) => {
    setIsHovered(index);
  };

  const handleHoverLeave = () => {
    setIsHovered(-1);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };
  const data = [
    {
      id: 1,
      imageUrl: one,
    
      slideImage: one,

      title: "Welcome to CAN!",
      description: "CAN is a safe place to share strength, hope, and ask for help Lets fight against cancer, together.",
    
    },
    {
      id: 2,
      imageUrl: two,
    
      slideImage: two,

      title: "Hospital visits, easier.",
      description:
        "Upload and manage your medical records and report all in one place.",
    
      
    },
    {
      id: 3,
      imageUrl: three,
   
      slideImage: three,

      title: "Stay up to date, and inspired.",
      description:
        "Read  curated articles on the latest research, and success stories from our community. ",
     
    },
    {
      id: 4,
      imageUrl: four,
  
      slideImage: four,

      title: "You are not alone!",
      description:
        "Join and host meetings to share, relate, and listen to experiences.Add people you connect with to your support group to chat, call, and spend time with.",
    },
    {
      id: 5,
      imageUrl: five,
  
      slideImage: five,

      title: "Care, one step away",
      description:
        "Set up an emergency phone line with your trusted contacts to call anytime with the press of a button.",
    },
    {
      id: 6,
      imageUrl: six,
  
      slideImage: six,

      title: "A companion to your relaxation.",
      description:
        "Listen to our evergreen radio, do guided meditations, and record your memories to relax and unwind.",
    },
    // Add more images and data as needed
  ];

  const handleNextSlide = () => {
    if (sliderRef.current) {
      const slickSlider = sliderRef.current;
  
      // Check if the current slide is the last slide
      if (slickSlider.innerSlider.state.currentSlide === slickSlider.innerSlider.state.slideCount - 1) {
        // If on the last slide, navigate to the homepage
        window.location.href = '/Loginform';  // Change '/homepage' to the actual URL of your homepage
      } else {
        // If not on the last slide, move to the next slide
        slickSlider.slickNext();
      }
    }
  };
  

    
return(
    <div className="block md:hidden lg:hidden">
      <div className="flex justify-end px-10 py-10">
        <NavLink to="/Loginform">
        <button className="pointer-cursor text-[#7C7C7C]">Skip</button>

        </NavLink>

      </div>
    <Slider {...settings} className="" ref={sliderRef}>
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
                className="carousel-image w-[350px]  object-cover relative "
                src={item.imageUrl}
                alt={item.title}
              />

              <div
                className={`absolute   top-0   flex justify-center items-center group-hover:opacity-100 ${
                  isHovered === item.id ? "opacity-100 " : "opacity-0"
                } transition-opacity duration-300`}
              >
              

              
          
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full lg:w-[70%] m-auto px-1">
            <div className="flex flex-col items-center  w-[200%] justify-center pt-5">
              <h2 className=" text-center text-[#084943] font-bold text-[2vw]  fnt-3">
                {item.title}
              </h2>
              <p className="text-center px-5 text-center     text-12 text-[1.3vw] ">
                {item.description}
              </p>
              <p className="text-center px-5 text-center    text-12 text-[1.3vw] ">
                {item.describe2}
              </p>
              <p className="text-center px-5 text-center   text-12 text-[1.3vw] ">
                {item.fulldescription}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
    <div className="flex justify-center  mt-20">
      <div className="bg-[#EFC319] flex w-16 h-16 rounded-full justify-center items-center rounded-2xl shadow-2xl"
        onClick={handleNextSlide}
      >
      <HiArrowRight className="text-white" />

      </div>
        </div>
  </div>

)
}

export default MobileCraousel;
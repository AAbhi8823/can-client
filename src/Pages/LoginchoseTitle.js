import React, { useState } from 'react';
import LogoCAn from '../Photos/LogoCAn.png';
import CANa from '../Photos/CANa.png';
import Roles_Fighter from '../Photos/Roles_Fighter.png';
import Roles_Caregiver from '../Photos/Roles_Caregiver.png';
import Roles_Veteran from '../Photos/Roles_Veteran.png';
import Video from '../Photos/Video.png';
import CarouselMain from '../Components/CarouselMain';
import { NavLink } from 'react-router-dom';
import MeetPeople from '../Photos/MeetPeople.png';
import { CiCircleInfo } from 'react-icons/ci';
import PageImg from '../Photos/illus2.png'
import vthree from '../Photos/vthree.gif'
import logo2 from "../Photos/logo2.png";
import logoCAn from '../Photos/LogoCAn.png'
const LoginChooseTitle = () => {
  const [select, setSelect] = useState('');

  function selectedOption(value) {
    setSelect(value);
  }

  return (
    <>
      <div className="lg:ml-[80px] mt-2 lg:absolute flex items-center justify-center">
      <img src={logo2} className="lg:block md:block hidden" alt="" />
          <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
      </div>
      <div>
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">

          <div className='hidden lg:block w-[55%] mt-20  flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2'>
              {/* <img src={WelcomeScreen} className='' /> */}
              <div className='w-[60%] -mt-20'>
                {/* <CarouselMain /> */}
                <img src={PageImg} alt='none' />
              </div>

              <div className=' flex flex-col items-center justify-center gap-1 -mt-10'>
                <h1 className='text-center text-[32px] font-semibold'>Stay up to date, and inspired.</h1>
                <p className='text-center text-[18px] font-medium w-[100%]'>Read curated articles on the latest research, and success <br />
                 stories from our community.</p>
              </div>

              <div className="flex flex-row items-center gap-4 mt-3">
                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[12px] w-[12px] rounded-full bg-[#C31A7F]"></div>
                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className='h-[100vh]  flex lg:items-center'>
            <div
              className="lg:h-[660px] lg:w-[490px] w-[330px] h-[550px] lg:mr-[140px] bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]"
              style={{
                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div>
                <img src={vthree}  className='object-contain rounded-[20px]' alt="video" />
              </div>
              <div className=" font-semibold text-lg flex mt-2 items-center justify-between pr-3 pl-28 lg:pr-4 lg:pl-40  ">
                Create a Profile
                <div className="">
                  <CiCircleInfo color="#7E7E7E" className="cursor-pointer" />
                </div>
              </div>

              <div className="w-fit pt-2">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div
                    className={`flex justify-center cursor-pointer ${select !== '' && select !== 'Fighter' ? 'opacity-50' : ''
                      }`}
                    onClick={() => selectedOption('Fighter')}
                  >
                    <img
                      src={Roles_Fighter}
                      alt="not found"
                      className={`w-[90%] relative `}
                    />
                    <div className="absolute lg:top-[33%] top-[30%] right-20 lg:left-60 text-white ">
                      <h3 className="  lg:text-[20px] align-item- center mt-4 font-bold text-[16px]">Fighter</h3>
                      <div className=" ">
                        <p className="   lg:text-[14px] text-[12px]">I will defeat</p>
                        <p className="  lg:text-[14px] text-[12px] ">cancer</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex justify-center cursor-pointer ${select !== '' && select !== 'Caregiver' ? 'opacity-50' : ''
                      }`}
                    onClick={() => selectedOption('Caregiver')}
                  >
                    <img
                      src={Roles_Caregiver}
                      alt="not found"
                      className={`w-[90%] relative `}
                    />
                    <div className="absolute lg:top-[52%] top-[46%] right-14  lg:left-60 text-white ">
                      <h3 className=" lg:text-[20px] font-bold text-[16px] mt-4">Caregiver</h3>
                      <div className=" ">
                        <p className="  lg:text-[14px] text-[12px]">I will help fighter</p>
                        <p className=" lg:text-[14px] text-[12px] ">defeat cancer</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex justify-center cursor-pointer ${select !== '' && select !== 'Veteran' ? 'opacity-50' : ''
                      }`}
                    onClick={() => selectedOption('Veteran')}
                  >
                    <img
                      src={Roles_Veteran}
                      alt="not found"
                      className={`w-[90%] relative `}
                    />
                    <div className="absolute lg:top-[71%] top-[63%] right-14  lg:left-60 text-white">
                      <h3 className=" lg:text-[20px] font-bold text-[16px] mt-4">Veteran</h3>
                      <div className="">
                        <p className="  lg:text-[14px] text-[12px]">I have defeated</p>
                        <p className="  lg:text-[14px] text-[12px] ">cancer</p>
                      </div>
                    </div>
                  </div>

                  {select ? (
                    <NavLink to="/logindetails" className="w-[40%]">
                      <h2 className="bg-[#C31A7F] text-center p-3 rounded-lg text-white">
                        Continue
                      </h2>
                    </NavLink>
                  ) : (
                    <div className="w-[40%]">
                      <h2 className="   bg-[#C31A7F] text-center p-3 rounded-lg text-white">
                        Continue
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginChooseTitle;

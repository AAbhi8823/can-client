import React, { useRef, useState } from 'react';
import LogoCAn from '../Photos/LogoCAn.png';
import CANa from '../Photos/CANa.png';
import Video from '../Photos/Video.png';
import { VscAccount } from 'react-icons/vsc';
import { IoCloseCircleSharp } from 'react-icons/io5';
import CarouselMain from '../Components/CarouselMain';
import Freeline from '../Photos/MeetPeople.png'
import { NavLink } from 'react-router-dom';
import account from "../Photos/account.jpg";
import logo2 from '../Photos/logo2.png'
const LoginProfile = () => {
    const [image, setImage] = useState(null);
    const hiddenChooseImage = useRef(null);

    const hideImage = () => {
        setImage(false);
    };

    const uploadImage = () => {
        hiddenChooseImage.current.click();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file));
    };

    return (
        <>
        
            <div>


                <div className='flex lg:flex-row lg:p-0 p-2 items-center justify-center'>
                    <div className='hidden lg:block w-[55%] mt-20  flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            {/* <img src={WelcomeScreen} className='' /> */}
                            <div className=''>
                                {/* <CarouselMain /> */}
                                <img src={Freeline} alt='none' className='h-[390px] w-[420px]' />
                            </div>

                            <div className=' flex flex-col items-center justify-center gap-1 '>
                                <h1 className='text-center text-[36px] font-bold'>Welcome Ananya!</h1>
                                <p className='text-center text-[18px] font-semibold w-[60%]'>We welcome you to CAN with all our
                                    Hearts.</p>
                            </div>

                            <div className="flex flex-row items-center gap-4 mt-3">
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#C31A7F]"></div>
                            </div>
                        </div>
                    </div>


                    {/* right side */}
                    <div className='h-full  flex items-center mt-4  lg:mt-10 lg:bottom-1'>
                        <div className='lg:h-[600px] lg:w-[420px] w-[330px] h-[550px] lg:mx-24 bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]' style={{
                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div className='flex flec-row justify-center items-center lg:mt-20 mt-10'>
                            <img src={logo2} className="lg:block md:block hidden" alt="" />
          <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
                            </div>
                            <div className='text-center text-xl  font-semibold p-1 text-[#EFC319]'>
                                <h1>Profile Successfully added!</h1>
                            </div>

                            <div className='flex flex-col justify-center items-center lg:px-0 px-2 py-8'>
                                <div className='flex flex-wrap bg-[#8D193C] lg:w-[80%] rounded-[14px] pt-1'>
                                    <div className='w-[30%] p-3 pl-8'>
                                        <div className='rounded-full p-1 bg-white'>
                                            <img src={account} alt="" className='rounded-full' />
                                        </div>

                                    </div>
                                    <div className='lg:w-[70%] pt-2  text-white'>
                                        <p className='font-semibold '>Shrinath Shandrashekar</p>
                                        <p className='font-thin '> Fighter, Male</p>
                                        <p className='font-thin'>+919099090909</p>
                                    </div>
                                    <div className='flex justify-end w-full px-6 pb-3 text-white'>
                                        <div className='w-fit font-thin'>10 Oct 1987</div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center'>
                                <p className=' lg:w-[80%] text-center font-semibold px-6 lg:text-[16px] text-[14px]  pb-10'>Yourxx account has been successfully
                                    linked to his account.</p>
                            </div>

                            <div className='flex px-5 justify-center'>
                                <div className='flex justify-center py-2 w-[50%]'>
                                    <NavLink to='/home' className='w-[86%]'>
                                        <h2 className='bg-[#C31A7F]  text-center p-3 rounded-lg text-white'>Fivnishq!</h2>
                                    </NavLink>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginProfile
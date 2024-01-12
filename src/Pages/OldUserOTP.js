import React, { useState } from 'react'
import Logo from '../Photos/Logo.png'
import CAN from '../Photos/CAN.png'
import WelcomeScreen from '../Photos/WelcomeScreen.png'
import Video from '../Photos/Video.png'
import { NavLink } from 'react-router-dom'
import CarouselMain from '../Components/CarouselMain'
import { HiArrowLeft } from 'react-icons/hi'

const OldUserOTP = () => {


    //OTP range
    const [value, setValue] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    return (
        <>
            <div>
                <div className='p-8  absolute flex  items-center '>
                    <img src={Logo} alt='not found' />
                    <img src={CAN} alt='not found' className='w-[50%] shadow-xl' />
                </div>

                <div className='flex'>

                    {/* right side */}
                    <div className='h-[100vh] flex items-center w-full justify-center'>
                        <div className='h-[90%] w-[60vh] shadow-xl mx-24 bg-[#D9D9D9] bg-opacity-10 z-10 backdrop-blur-lg rounded-md'>

                            <div className='mt-6 mx-4 gap-4 flex items-center font-semibold'>
                                <NavLink to='/OldUserLoginTitle'>
                                    <HiArrowLeft />
                                </NavLink>
                                <div>Adding profile for your loved one</div>
                            </div>

                            <div>
                                <img src={Video} alt='none' />
                            </div>
                            <div className='text-center text-3xl font-semibold p-1  text-[#C31A7F]'>
                                <h1>Enter OTP</h1>
                            </div>
                            <div className='text-center py-4'>OTP has been sent to +91 98********</div>

                            <div className='flex justify-center text-4xl py-4 '>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={handleInputChange}
                                    maxlength="4"
                                    placeholder='__ __ __ __'
                                    className='w-40 placeholder:text-4xl text-center bg-transparent outline-none'
                                />

                            </div>
                            <div className='flex justify-center py-2'>
                                <NavLink to='/OldUserSuccessfully' className='w-[86%]'>
                                    <h2 className='bg-[#C31A7F]  text-center p-3 rounded-lg text-white'>Verify OTP</h2>
                                </NavLink>
                            </div>

                            <p className='text-center py-4'>Resend OTP</p>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}


export default OldUserOTP
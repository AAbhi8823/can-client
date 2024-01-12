import React, { useState } from 'react'
import Logo from '../Photos/Logo.png'
import CAN from '../Photos/CAN.png'
import Video from '../Photos/Video.png'
import { NavLink } from 'react-router-dom'

const OldUserPass = () => {


    //OTP range
    const [value, setValue] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };
    //Re Enter OTP range
    const [value1, setValue1] = useState('');

    const handleInputChange1 = (event) => {
        const inputValue1 = event.target.value;
        if (/^\d*$/.test(inputValue1)) {
            setValue1(inputValue1);
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

                            <div>
                                <img src={Video} alt='none' />
                            </div>
                            <div className='text-center text-3xl font-semibold p-1  text-[#C31A7F]'>
                                <h1>Create a PIN</h1>
                            </div>
                            <div className='text-center py-4 px-4 text-lg font-semibold'>Its your space, so add a profile lock to keep
                                your account information with you</div>

                            <div className=' text-4xl py-4 flex items-center justify-center w-full gap-4'>

                                <p className='text-sm  font-semibold flex justify-center w-[14%] '>PIN</p>

                                <input
                                    type="text"
                                    value={value}
                                    onChange={handleInputChange}
                                    maxlength="4"
                                    placeholder='__ __ __ __'
                                    className='w-[34%] placeholder:text-4xl placeholder:tracking-[0em] bg-transparent tracking-[.50em] outline-none '
                                />
                            </div>

                            <div className=' text-4xl py-4 flex items-center justify-center  w-full gap-4'>

                                <p className='text-sm  font-semibold flex justify-center w-[14%] '>Re Enter</p>

                                <input
                                    type="text"
                                    value={value1}
                                    onChange={handleInputChange1}
                                    maxlength="4"
                                    placeholder='__ __ __ __'
                                    className='w-[34%] placeholder:text-4xl placeholder:tracking-[0em] bg-transparent tracking-[.50em] outline-none '
                                />

                            </div>

                            <div className='flex justify-center py-2'>
                                <NavLink to='' className='w-[50%] mt-[5%]'>
                                    <h2 className='bg-[#C31A7F]  text-center p-3 rounded-lg text-white'>Continue</h2>
                                </NavLink>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}


export default OldUserPass
import React, { useState } from 'react'
import Logo from '../Photos/Logo.png'
import CAN from '../Photos/CAN.png'
import account from '../Photos/account.jpg'
import { NavLink } from 'react-router-dom'

const OldUserSuccessfully = () => {

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

                            <div className='flex flex-col items-center justify-center h-full w-full px-4 gap-4'>
                                
                                <div className=''>
                                    <img src={Logo} alt='none' />
                                </div>

                                <div className='text-[#EFC319] text-2xl font-semibold'>
                                    Profile Successfully added!
                                </div>

                                <div className='h-[25%] w-full bg-[#8D193C] rounded-2xl flex flex-col justify-center items-center '>

                                    <div className='flex gap-4 items-center justify-center'>
                                        <div className='w-[20%] bg-white rounded-full overflow-hidden'>
                                            <img src={account} alt='none' className='p-1 rounded-full' />
                                        </div>

                                        <div className='text-white'>
                                            <div>
                                                <h1 className='font-semibold'>Shrinath Shandrashekar</h1>
                                                <h1 className='font-thin'>Fighter, Male</h1>
                                                <h1 className='font-thin'>+919099090909</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-right text-white w-full px-6 text-xs font-thin'>
                                        10 Oct 1987
                                    </div>

                                </div>

                                <div className='flex flex-wrap text-xl text-center font-semibold'>
                                    Your account has been successfully
                                    linked to his account.
                                </div>

                                <NavLink to='/home'>
                                <div className='bg-[#C31A7F] text-white px-12 rounded-2xl p-3'>
                                    Finish
                                </div>
                                </NavLink>

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default OldUserSuccessfully
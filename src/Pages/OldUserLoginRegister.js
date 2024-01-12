import React, { useState } from 'react'
import Logo from '../Photos/Logo.png'
import CAN from '../Photos/CAN.png'
import WelcomeScreen from '../Photos/WelcomeScreen.png'
import Video from '../Photos/Video.png'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineMail } from 'react-icons/ai'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { SlCalender } from 'react-icons/sl'
import { NavLink } from 'react-router-dom'
import CarouselMain from '../Components/CarouselMain'
import { HiArrowLeft } from 'react-icons/hi'

const OldUserRegister = () => {

    //Email input box
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);

        // Regular expression to check if entered text is in email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(enteredEmail)) {
            setError('(invalid Email)');
        } else {

            setError('');
        }
    };

    return (

        <>
            <div>

                <div className='p-8  absolute flex items-center '>
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

                            <div className='text-center text-3xl font-semibold p-2  text-[#C31A7F]'>
                                <h1>Register</h1>
                            </div>

                            {/* <div className='border-2 h-14 mx-8 m-2 px-2 rounded-xl flex items-center gap-4'>
                                <h1 className='font-bold flex items-center w-max h-full px-2'><AiOutlineUser /></h1>
                                <h1 className='font-bold'>|</h1>
                                <input placeholder='Enter name' className='border-none w-full bg-transparent placeholder:p-2' />
                            </div> */}


                            <div className='border-2 h-14 mx-8 m-2 px-2 rounded-xl flex items-center gap-4'>
                                <h1 className='font-bold flex items-center w-max h-full px-2'><VscAccount /></h1>
                                <h1 className='font-bold'>|</h1>
                                <input placeholder='Enter Username' className='border-none w-full bg-transparent placeholder:p-2 outline-none' />
                            </div>

                            <div className='border-2 h-14 mx-8 m-2 px-2 rounded-xl flex items-center gap-4'>
                                <h1 className='font-bold flex items-center w-max h-full px-2'><AiOutlineMail /></h1>
                                <h1 className='font-bold'>|</h1>
                                <input placeholder='Enter Email' className='border-none w-full bg-transparent placeholder:p-2 outline-none' value={email}
                                    onChange={handleEmailChange} />
                                <div className='text-red-400 text-xs w-[50%]'>{error && <p>{error}</p>}</div>
                            </div>

                            <div className='border-2 h-14 mx-8 m-2 px-2 rounded-xl flex items-center gap-4'>
                                <h1 className='font-bold flex items-center w-max h-full px-2'><BsGenderAmbiguous /></h1>
                                <h1 className='font-bold'>|</h1>
                                <input placeholder='Enter Gender' className='border-none w-full bg-transparent placeholder:p-2 outline-none' />
                            </div>

                            <div className='border-2 h-14 mx-8 m-2 px-2 rounded-xl flex items-center gap-4'>
                                <h1 className='font-bold flex items-center w-max h-full px-2'><SlCalender /></h1>
                                <h1 className='font-bold'>|</h1>
                                <input placeholder='Enter Date of birth' className='border-none w-full bg-transparent placeholder:p-2 outline-none' />
                            </div>

                            <div className='flex justify-center py-2'>
                                <NavLink to='/OldUserOTP' className='w-[86%]'>
                                    <h2 className='bg-[#C31A7F]  text-center p-3 rounded-lg text-white'>Continue</h2>
                                </NavLink>
                            </div>

                        </div>

                        {/* this will be dummy data , real data will come from backend */}
                        <div className=''></div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default OldUserRegister
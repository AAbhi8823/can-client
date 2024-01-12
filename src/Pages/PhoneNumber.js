import React, { useState } from 'react'
import Logo from '../Photos/Logo.png'
import CAN from '../Photos/CAN.png'
import WelcomeScreen from '../Photos/WelcomeScreen.png'
import Video from '../Photos/Video.png'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import CarouselMain from '../Components/CarouselMain'

const PhoneNumber = () => {

    const [check, setCheck] = useState(false)

    function checkBox() {
        setCheck(!check)
    }

    //after text
    const [data, setData] = useState('')

    function afterText (text) {
        setData(text.target.value)
    }

    afterText = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setData(inputValue);
        }
    };

    return (
        <>
            <div>
                <div className='p-8 absolute flex items-center '>
                    <img src={Logo} alt='not found' />
                    <img src={CAN} alt='not found' className='w-[50%] shadow-xl' />
                </div>

                <div className='flex'>

                    <div className='p-[4%] w-[55%] relative '>
                        <div className='absolute top-[15%] left-[20%]'>
                            {/* <img src={WelcomeScreen} className='' /> */}
                            <div className=''>
                                <CarouselMain />
                            </div>

                            <div className='absolute top-[100%] left-[10%] '>
                                <h1 className='text-center text-2xl font-bold'>WELCOME TO CAN!</h1>
                                <p className='text-center'>CAN is a safe place to share strength hope and ask for help.</p>
                                <p className='text-center'>Lets fight against cancer , together</p>
                            </div>
                        </div>
                    </div>


                    {/* right side */}
                    <div className='h-[100vh] flex items-center'>
                        <div className='h-[90%] w-[60vh] shadow-xl mx-24 bg-[#D9D9D9] bg-opacity-10 z-10 backdrop-blur-lg rounded-md'>

                            <div>
                                <img src={Video} />
                            </div>

                            <div className='text-center text-3xl font-semibold p-2  text-[#C31A7F]'>
                                <h1>Welcome to CAN</h1>
                            </div>

                            <div className='flex justify-center gap-2'>
                                <p>Don't have an account?</p><p className='text-[#EC899E]'>Register here</p>
                            </div>

                            <div className='border-2 h-14 mx-8 my-8 rounded-xl flex flex-col items-center'>
                                <div className='flex items-center gap-4 w-full'>
                                    <h1 className='font-semibold flex  w-max h-full p-4'>
                                        +91
                                    </h1>
                                    <h1 className=''>
                                        |
                                    </h1>
                                    <input 
                                    type='text'
                                    placeholder='Enter phone number' 
                                    className='border-none outline-none' 
                                    onChange={afterText} 
                                    value={data}
                                    maxLength='10'
                                    />
                                    
                                </div>

                                <div className='mx-10 flex text-center relative w-full'>

                                    <input className='absolute top-[15%] left-[2%] ' type='checkbox' onClick={checkBox} />
                                    <p className='px-4'>By Continuing, you would agree our terms of service and privacy policy.</p>

                                </div>


                            </div>


                            <div className='flex justify-center pt-12'>

                                {data && check ?
                                    (<NavLink to='/loginotp' className='w-[80%] text-center'>
                                        <h2 className='bg-[#C31A7F] p-3 my-3 rounded-xl text-white'>Continue</h2>
                                    </NavLink>)
                                    :
                                    (
                                        <div className='w-[80%] text-center'>
                                            <h2 className='bg-[#C31A7F] p-3 my-3 rounded-xl text-white opacity-50'>Continue</h2>
                                        </div>
                                    )
                                }

                            </div>

                            {/* <h2 className='text-center py-3'>
                                OR
                            </h2>

                            <div className='flex gap-4 justify-center py-6'>

                                <div className='shadow-lg shadow-gray-300 bg-transparent rounded-lg p-1'>
                                    <FcGoogle size={30} />
                                </div>

                                <div className='shadow-lg shadow-gray-300 bg-transparent rounded-lg p-1'>
                                    <BsFacebook color='blue' size={30} />
                                </div>

                                <div className='shadow-lg shadow-gray-300 bg-transparent rounded-lg p-1'>
                                    <AiFillTwitterCircle color='#1da1f2' size={30} />
                                </div>

                            </div> */}
                        </div>

                        {/* <div className='h-[100px] w-[100px] rounded-full bg-[#E7B2FF99] absolute top-[30%] left-[58%] '></div>
                        <div className='h-[100px] w-[100px] rounded-full bg-[#FF9A55] absolute top-[85%] right-[6%] '></div> */}
                    </div>

                </div>

            </div>
        </>
    )
}



export default PhoneNumber